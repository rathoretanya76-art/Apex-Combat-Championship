import { 
  MockDatabaseSnapshot, 
  AuditLogEntity, 
  FighterEntity, 
  EventEntity, 
  ApplicationEntity, 
  TicketReservationEntity, 
  ContactMessageEntity 
} from './types';
import { 
  SEED_FIGHTERS, 
  SEED_EVENTS, 
  SEED_APPLICATIONS, 
  SEED_TICKETS, 
  SEED_CONTACTS, 
  SEED_AUDIT_LOGS 
} from './seed';

const STORAGE_KEY = 'apex_mock_database_v2';
const CURRENT_VERSION = 2;

class StorageAdapter {
  private inMemoryData: MockDatabaseSnapshot;
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
    this.inMemoryData = this.getInitialSeedSnapshot();

    if (this.isBrowser) {
      this.rehydrate();
    }
  }

  private getInitialSeedSnapshot(): MockDatabaseSnapshot {
    return {
      fighters: [...SEED_FIGHTERS],
      events: [...SEED_EVENTS],
      applications: [...SEED_APPLICATIONS],
      tickets: [...SEED_TICKETS],
      contacts: [...SEED_CONTACTS],
      auditLogs: [...SEED_AUDIT_LOGS],
      version: CURRENT_VERSION,
      lastPersisted: new Date().toISOString(),
    };
  }

  /**
   * Rehydrates stored state from localStorage if available
   */
  private rehydrate(): void {
    if (!this.isBrowser) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as MockDatabaseSnapshot;
        if (parsed && parsed.version === CURRENT_VERSION) {
          this.inMemoryData = parsed;
          return;
        }
      }
      // If no valid stored snapshot found, persist initial seed
      this.persist();
    } catch (err) {
      console.warn('[MockDB StorageAdapter] Rehydrate error, falling back to seed:', err);
      this.inMemoryData = this.getInitialSeedSnapshot();
    }
  }

  /**
   * Persists current in-memory snapshot to browser storage
   */
  public persist(): void {
    if (!this.isBrowser) return;

    try {
      this.inMemoryData.lastPersisted = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.inMemoryData));
    } catch (err) {
      console.error('[MockDB StorageAdapter] Failed to persist data to localStorage:', err);
    }
  }

  /**
   * Retrieves current full snapshot
   */
  public getSnapshot(): MockDatabaseSnapshot {
    return this.inMemoryData;
  }

  /**
   * Updates a specific table/collection in memory and triggers persist
   */
  public updateCollection<K extends keyof MockDatabaseSnapshot>(
    collectionKey: K,
    updater: (current: MockDatabaseSnapshot[K]) => MockDatabaseSnapshot[K]
  ): void {
    this.inMemoryData[collectionKey] = updater(this.inMemoryData[collectionKey]);
    this.persist();
  }

  /**
   * Records an audit log entry
   */
  public logAudit(action: string, entity: string, entityId: string, metadata?: Record<string, any>): void {
    const log: AuditLogEntity = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      entity,
      entityId,
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.inMemoryData.auditLogs.unshift(log);
    // Keep max 100 logs
    if (this.inMemoryData.auditLogs.length > 100) {
      this.inMemoryData.auditLogs = this.inMemoryData.auditLogs.slice(0, 100);
    }
    this.persist();
  }

  /**
   * Reset the entire database to default seed data
   */
  public resetToSeed(): MockDatabaseSnapshot {
    this.inMemoryData = this.getInitialSeedSnapshot();
    this.logAudit('DATABASE_RESET', 'SYSTEM', 'ALL', { reason: 'User initiated reset' });
    this.persist();
    return this.inMemoryData;
  }

  /**
   * Export the entire database state as JSON string
   */
  public exportJSON(): string {
    return JSON.stringify(this.inMemoryData, null, 2);
  }

  /**
   * Import database state from JSON string
   */
  public importJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as MockDatabaseSnapshot;
      if (parsed && Array.isArray(parsed.fighters) && Array.isArray(parsed.events)) {
        parsed.version = CURRENT_VERSION;
        parsed.lastPersisted = new Date().toISOString();
        this.inMemoryData = parsed;
        this.logAudit('DATABASE_IMPORTED', 'SYSTEM', 'ALL');
        this.persist();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}

// Singleton storage adapter instance
export const storageAdapter = new StorageAdapter();
