import { FighterEntity, QueryOptions, DivisionType } from '../types';
import { indexedDbAdapter, STORE_NAMES } from '../indexeddb-adapter';
import { executeQuery } from '../query-engine';

export class FightersRepository {
  /**
   * Retrieves all fighters
   */
  public async getAll(): Promise<FighterEntity[]> {
    return indexedDbAdapter.getAll<FighterEntity>(STORE_NAMES.FIGHTERS);
  }

  /**
   * Retrieves a single fighter by ID
   */
  public async getById(id: string): Promise<FighterEntity | null> {
    return indexedDbAdapter.getById<FighterEntity>(STORE_NAMES.FIGHTERS, id);
  }

  /**
   * Complex query with filtering, search, sorting, and pagination
   */
  public async findMany(options?: QueryOptions<FighterEntity>): Promise<FighterEntity[]> {
    const all = await this.getAll();
    return executeQuery(all, options);
  }

  /**
   * Find fighters by division
   */
  public async getByDivision(division: DivisionType): Promise<FighterEntity[]> {
    return this.findMany({ where: { division } });
  }

  /**
   * Find reigning champions
   */
  public async getChampions(): Promise<FighterEntity[]> {
    return this.findMany({ where: { isChampion: true } });
  }

  /**
   * Create a new fighter record
   */
  public async create(data: Omit<FighterEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<FighterEntity> {
    const id = `fighter-${Date.now()}`;
    const newFighter: FighterEntity = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return indexedDbAdapter.put<FighterEntity>(STORE_NAMES.FIGHTERS, newFighter);
  }

  /**
   * Update an existing fighter record
   */
  public async update(id: string, partial: Partial<FighterEntity>): Promise<FighterEntity | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated: FighterEntity = {
      ...existing,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    return indexedDbAdapter.put<FighterEntity>(STORE_NAMES.FIGHTERS, updated);
  }

  /**
   * Delete a fighter record
   */
  public async delete(id: string): Promise<boolean> {
    return indexedDbAdapter.delete(STORE_NAMES.FIGHTERS, id);
  }

  /**
   * Count total fighters
   */
  public async count(): Promise<number> {
    const all = await this.getAll();
    return all.length;
  }
}

export const fightersRepository = new FightersRepository();
