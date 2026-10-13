import { EventEntity, QueryOptions } from '../types';
import { indexedDbAdapter, STORE_NAMES } from '../indexeddb-adapter';
import { executeQuery } from '../query-engine';

export class EventsRepository {
  public async getAll(): Promise<EventEntity[]> {
    return indexedDbAdapter.getAll<EventEntity>(STORE_NAMES.EVENTS);
  }

  public async getById(id: number): Promise<EventEntity | null> {
    return indexedDbAdapter.getById<EventEntity>(STORE_NAMES.EVENTS, id);
  }

  public async findMany(options?: QueryOptions<EventEntity>): Promise<EventEntity[]> {
    const all = await this.getAll();
    return executeQuery(all, options);
  }

  public async getUpcoming(): Promise<EventEntity[]> {
    return this.findMany({
      where: { status: 'Upcoming' },
      orderBy: { field: 'isoDate', direction: 'asc' }
    });
  }

  public async getPast(): Promise<EventEntity[]> {
    return this.findMany({
      where: { status: 'Completed' },
      orderBy: { field: 'isoDate', direction: 'desc' }
    });
  }

  public async create(data: Omit<EventEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<EventEntity> {
    const all = await this.getAll();
    const maxId = all.reduce((max, e) => (e.id > max ? e.id : max), 0);
    const newId = maxId + 1;

    const newEvent: EventEntity = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return indexedDbAdapter.put<EventEntity>(STORE_NAMES.EVENTS, newEvent);
  }

  public async update(id: number, partial: Partial<EventEntity>): Promise<EventEntity | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated: EventEntity = {
      ...existing,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    return indexedDbAdapter.put<EventEntity>(STORE_NAMES.EVENTS, updated);
  }

  public async delete(id: number): Promise<boolean> {
    return indexedDbAdapter.delete(STORE_NAMES.EVENTS, id);
  }
}

export const eventsRepository = new EventsRepository();
