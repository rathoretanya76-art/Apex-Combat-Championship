import { ContactMessageEntity, MessageStatus, QueryOptions } from '../types';
import { indexedDbAdapter, STORE_NAMES } from '../indexeddb-adapter';
import { executeQuery } from '../query-engine';

export class ContactsRepository {
  public async getAll(): Promise<ContactMessageEntity[]> {
    const list = await indexedDbAdapter.getAll<ContactMessageEntity>(STORE_NAMES.CONTACTS);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public async getById(id: string): Promise<ContactMessageEntity | null> {
    return indexedDbAdapter.getById<ContactMessageEntity>(STORE_NAMES.CONTACTS, id);
  }

  public async findMany(options?: QueryOptions<ContactMessageEntity>): Promise<ContactMessageEntity[]> {
    const all = await this.getAll();
    return executeQuery(all, options);
  }

  public async create(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ContactMessageEntity> {
    const id = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newContact: ContactMessageEntity = {
      id,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    return indexedDbAdapter.put<ContactMessageEntity>(STORE_NAMES.CONTACTS, newContact);
  }

  public async updateStatus(id: string, status: MessageStatus): Promise<ContactMessageEntity | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated: ContactMessageEntity = {
      ...existing,
      status,
    };

    return indexedDbAdapter.put<ContactMessageEntity>(STORE_NAMES.CONTACTS, updated);
  }

  public async delete(id: string): Promise<boolean> {
    return indexedDbAdapter.delete(STORE_NAMES.CONTACTS, id);
  }

  public async count(): Promise<number> {
    const all = await this.getAll();
    return all.length;
  }
}

export const contactsRepository = new ContactsRepository();
