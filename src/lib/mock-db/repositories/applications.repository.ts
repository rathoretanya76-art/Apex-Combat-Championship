import { ApplicationEntity, ApplicationStatus, MedicalStatus, QueryOptions } from '../types';
import { indexedDbAdapter, STORE_NAMES } from '../indexeddb-adapter';
import { executeQuery } from '../query-engine';

export class ApplicationsRepository {
  public async getAll(): Promise<ApplicationEntity[]> {
    const list = await indexedDbAdapter.getAll<ApplicationEntity>(STORE_NAMES.APPLICATIONS);
    // Sort descending by creation date
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public async getById(id: string): Promise<ApplicationEntity | null> {
    return indexedDbAdapter.getById<ApplicationEntity>(STORE_NAMES.APPLICATIONS, id);
  }

  public async getByDossierId(dossierId: string): Promise<ApplicationEntity | null> {
    const all = await this.getAll();
    return all.find((a) => a.dossierId.toLowerCase() === dossierId.toLowerCase()) || null;
  }

  public async findMany(options?: QueryOptions<ApplicationEntity>): Promise<ApplicationEntity[]> {
    const all = await this.getAll();
    return executeQuery(all, options);
  }

  public async create(data: {
    name: string;
    email: string;
    weightClass: string;
    discipline: string;
    message?: string;
  }): Promise<ApplicationEntity> {
    const id = `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const dossierId = `APEX-ATH-${Math.floor(100000 + Math.random() * 900000)}`;

    const newApp: ApplicationEntity = {
      id,
      dossierId,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      weightClass: data.weightClass,
      discipline: data.discipline,
      message: data.message?.trim() || '',
      status: 'PENDING',
      medicalStatus: 'PENDING_DOCS',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return indexedDbAdapter.put<ApplicationEntity>(STORE_NAMES.APPLICATIONS, newApp);
  }

  public async updateStatus(
    id: string, 
    status: ApplicationStatus, 
    reviewNotes?: string,
    medicalStatus?: MedicalStatus
  ): Promise<ApplicationEntity | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated: ApplicationEntity = {
      ...existing,
      status,
      reviewNotes: reviewNotes !== undefined ? reviewNotes : existing.reviewNotes,
      medicalStatus: medicalStatus !== undefined ? medicalStatus : existing.medicalStatus,
      updatedAt: new Date().toISOString(),
    };

    return indexedDbAdapter.put<ApplicationEntity>(STORE_NAMES.APPLICATIONS, updated);
  }

  public async delete(id: string): Promise<boolean> {
    return indexedDbAdapter.delete(STORE_NAMES.APPLICATIONS, id);
  }

  public async count(): Promise<number> {
    const all = await this.getAll();
    return all.length;
  }
}

export const applicationsRepository = new ApplicationsRepository();
