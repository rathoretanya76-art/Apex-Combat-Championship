/**
 * Apex Mock Database - Native IndexedDB Engine
 * Zero external dependencies. Fully typed, transactional, with SSR fallback.
 * Implements schema versioning, idempotent seeding, indexes, and audit logs.
 */

import { 
  FighterEntity, 
  EventEntity, 
  ApplicationEntity, 
  TicketReservationEntity, 
  ContactMessageEntity, 
  AuditLogEntity,
  MockDatabaseSnapshot,
  QueryOptions
} from './types';
import { 
  SEED_FIGHTERS, 
  SEED_EVENTS, 
  SEED_APPLICATIONS, 
  SEED_TICKETS, 
  SEED_CONTACTS, 
  SEED_AUDIT_LOGS 
} from './seed';

const DB_NAME = 'APEX_MOCK_DATABASE';
const DB_VERSION = 1;

export const STORE_NAMES = {
  FIGHTERS: 'fighters',
  EVENTS: 'events',
  APPLICATIONS: 'fighter_applications',
  TICKETS: 'ticket_reservations',
  CONTACTS: 'contact_messages',
  AUDIT_LOGS: 'audit_logs',
  METADATA: 'metadata',
} as const;

export type StoreName = typeof STORE_NAMES[keyof typeof STORE_NAMES];

class IndexedDbAdapter {
  private dbPromise: Promise<IDBDatabase> | null = null;
  private isBrowser: boolean;
  private memoryFallback: MockDatabaseSnapshot;

  constructor() {
    this.isBrowser = typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
    this.memoryFallback = {
      fighters: [...SEED_FIGHTERS],
      events: [...SEED_EVENTS],
      applications: [...SEED_APPLICATIONS],
      tickets: [...SEED_TICKETS],
      contacts: [...SEED_CONTACTS],
      auditLogs: [...SEED_AUDIT_LOGS],
      version: DB_VERSION,
      lastPersisted: new Date().toISOString(),
    };
  }

  /**
   * Initializes and opens the IndexedDB instance with schema migration and idempotent seed
   */
  public async getDb(): Promise<IDBDatabase | null> {
    if (!this.isBrowser) {
      return null;
    }

    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 1. Fighters Store
        if (!db.objectStoreNames.contains(STORE_NAMES.FIGHTERS)) {
          const fightersStore = db.createObjectStore(STORE_NAMES.FIGHTERS, { keyPath: 'id' });
          fightersStore.createIndex('division', 'division', { unique: false });
          fightersStore.createIndex('weightClass', 'weightClass', { unique: false });
          fightersStore.createIndex('isChampion', 'isChampion', { unique: false });
          fightersStore.createIndex('name', 'name', { unique: false });
        }

        // 2. Events Store
        if (!db.objectStoreNames.contains(STORE_NAMES.EVENTS)) {
          const eventsStore = db.createObjectStore(STORE_NAMES.EVENTS, { keyPath: 'id' });
          eventsStore.createIndex('status', 'status', { unique: false });
          eventsStore.createIndex('isoDate', 'isoDate', { unique: false });
          eventsStore.createIndex('name', 'name', { unique: false });
        }

        // 3. Applications Store
        if (!db.objectStoreNames.contains(STORE_NAMES.APPLICATIONS)) {
          const appsStore = db.createObjectStore(STORE_NAMES.APPLICATIONS, { keyPath: 'id' });
          appsStore.createIndex('dossierId', 'dossierId', { unique: true });
          appsStore.createIndex('status', 'status', { unique: false });
          appsStore.createIndex('discipline', 'discipline', { unique: false });
          appsStore.createIndex('email', 'email', { unique: false });
          appsStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // 4. Ticket Reservations Store
        if (!db.objectStoreNames.contains(STORE_NAMES.TICKETS)) {
          const ticketsStore = db.createObjectStore(STORE_NAMES.TICKETS, { keyPath: 'id' });
          ticketsStore.createIndex('ticketCode', 'ticketCode', { unique: true });
          ticketsStore.createIndex('eventId', 'eventId', { unique: false });
          ticketsStore.createIndex('tier', 'tier', { unique: false });
          ticketsStore.createIndex('status', 'status', { unique: false });
        }

        // 5. Contact Messages Store
        if (!db.objectStoreNames.contains(STORE_NAMES.CONTACTS)) {
          const contactsStore = db.createObjectStore(STORE_NAMES.CONTACTS, { keyPath: 'id' });
          contactsStore.createIndex('status', 'status', { unique: false });
          contactsStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // 6. Audit Logs Store
        if (!db.objectStoreNames.contains(STORE_NAMES.AUDIT_LOGS)) {
          const auditStore = db.createObjectStore(STORE_NAMES.AUDIT_LOGS, { keyPath: 'id' });
          auditStore.createIndex('action', 'action', { unique: false });
          auditStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // 7. Metadata Store
        if (!db.objectStoreNames.contains(STORE_NAMES.METADATA)) {
          db.createObjectStore(STORE_NAMES.METADATA, { keyPath: 'key' });
        }
      };

      request.onsuccess = async () => {
        const db = request.result;
        try {
          await this.ensureSeedData(db);
          resolve(db);
        } catch (err) {
          console.error('[IndexedDB] Seed initialization error:', err);
          resolve(db);
        }
      };

      request.onerror = () => {
        console.error('[IndexedDB] Open error:', request.error);
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Idempotent seed check: Verifies if seed is installed.
   * If already installed, NEVER overwrites or duplicates existing records.
   */
  private async ensureSeedData(db: IDBDatabase): Promise<void> {
    const isInstalled = await this.getMetadata(db, 'seed_installed_v1');
    if (isInstalled) {
      return; // Already initialized; preserve existing records
    }

    const tx = db.transaction(
      [
        STORE_NAMES.FIGHTERS,
        STORE_NAMES.EVENTS,
        STORE_NAMES.APPLICATIONS,
        STORE_NAMES.TICKETS,
        STORE_NAMES.CONTACTS,
        STORE_NAMES.AUDIT_LOGS,
        STORE_NAMES.METADATA,
      ],
      'readwrite'
    );

    const fightersStore = tx.objectStore(STORE_NAMES.FIGHTERS);
    SEED_FIGHTERS.forEach((f) => fightersStore.put(f));

    const eventsStore = tx.objectStore(STORE_NAMES.EVENTS);
    SEED_EVENTS.forEach((e) => eventsStore.put(e));

    const appsStore = tx.objectStore(STORE_NAMES.APPLICATIONS);
    SEED_APPLICATIONS.forEach((a) => appsStore.put(a));

    const ticketsStore = tx.objectStore(STORE_NAMES.TICKETS);
    SEED_TICKETS.forEach((t) => ticketsStore.put(t));

    const contactsStore = tx.objectStore(STORE_NAMES.CONTACTS);
    SEED_CONTACTS.forEach((c) => contactsStore.put(c));

    const auditStore = tx.objectStore(STORE_NAMES.AUDIT_LOGS);
    SEED_AUDIT_LOGS.forEach((l) => auditStore.put(l));

    const metaStore = tx.objectStore(STORE_NAMES.METADATA);
    metaStore.put({ key: 'seed_installed_v1', value: true, installedAt: new Date().toISOString() });
    metaStore.put({ key: 'schema_version', value: DB_VERSION });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        console.info('[IndexedDB] Seed data successfully installed into IndexedDB.');
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  }

  private getMetadata(db: IDBDatabase, key: string): Promise<any> {
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAMES.METADATA, 'readonly');
        const store = tx.objectStore(STORE_NAMES.METADATA);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? req.result.value : null);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }

  /**
   * Generic GetAll with SSR Memory Fallback
   */
  public async getAll<T>(storeName: StoreName): Promise<T[]> {
    const db = await this.getDb();
    if (!db) {
      // Memory fallback for SSR
      if (storeName === STORE_NAMES.FIGHTERS) return this.memoryFallback.fighters as unknown as T[];
      if (storeName === STORE_NAMES.EVENTS) return this.memoryFallback.events as unknown as T[];
      if (storeName === STORE_NAMES.APPLICATIONS) return this.memoryFallback.applications as unknown as T[];
      if (storeName === STORE_NAMES.TICKETS) return this.memoryFallback.tickets as unknown as T[];
      if (storeName === STORE_NAMES.CONTACTS) return this.memoryFallback.contacts as unknown as T[];
      if (storeName === STORE_NAMES.AUDIT_LOGS) return this.memoryFallback.auditLogs as unknown as T[];
      return [];
    }

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Generic GetById with SSR Memory Fallback
   */
  public async getById<T>(storeName: StoreName, id: string | number): Promise<T | null> {
    const db = await this.getDb();
    if (!db) {
      const all = await this.getAll<any>(storeName);
      return all.find((item) => item.id === id) || null;
    }

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Generic Put / Create / Update
   */
  public async put<T extends { id: any }>(storeName: StoreName, record: T): Promise<T> {
    const db = await this.getDb();
    if (!db) {
      // Update memory fallback
      const list = (await this.getAll<any>(storeName)) as any[];
      const idx = list.findIndex((i) => i.id === record.id);
      if (idx >= 0) list[idx] = record;
      else list.push(record);
      return record;
    }

    return new Promise((resolve, reject) => {
      const tx = db.transaction([storeName, STORE_NAMES.AUDIT_LOGS], 'readwrite');
      const store = tx.objectStore(storeName);
      const auditStore = tx.objectStore(STORE_NAMES.AUDIT_LOGS);

      store.put(record);

      const auditEntry: AuditLogEntity = {
        id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        action: 'UPSERT',
        entity: storeName,
        entityId: String(record.id),
        timestamp: new Date().toISOString(),
      };
      auditStore.put(auditEntry);

      tx.oncomplete = () => resolve(record);
      tx.onerror = () => reject(tx.error);
    });
  }

  /**
   * Generic Delete
   */
  public async delete(storeName: StoreName, id: string | number): Promise<boolean> {
    const db = await this.getDb();
    if (!db) {
      const list = (await this.getAll<any>(storeName)) as any[];
      const idx = list.findIndex((i) => i.id === id);
      if (idx >= 0) {
        list.splice(idx, 1);
        return true;
      }
      return false;
    }

    return new Promise((resolve, reject) => {
      const tx = db.transaction([storeName, STORE_NAMES.AUDIT_LOGS], 'readwrite');
      const store = tx.objectStore(storeName);
      const auditStore = tx.objectStore(STORE_NAMES.AUDIT_LOGS);

      store.delete(id);

      const auditEntry: AuditLogEntity = {
        id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        action: 'DELETE',
        entity: storeName,
        entityId: String(id),
        timestamp: new Date().toISOString(),
      };
      auditStore.put(auditEntry);

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  /**
   * Resets the entire IndexedDB database to initial synthetic seed data
   */
  public async resetDatabase(): Promise<void> {
    const db = await this.getDb();
    if (!db) {
      this.memoryFallback = {
        fighters: [...SEED_FIGHTERS],
        events: [...SEED_EVENTS],
        applications: [...SEED_APPLICATIONS],
        tickets: [...SEED_TICKETS],
        contacts: [...SEED_CONTACTS],
        auditLogs: [...SEED_AUDIT_LOGS],
        version: DB_VERSION,
        lastPersisted: new Date().toISOString(),
      };
      return;
    }

    const tx = db.transaction(
      [
        STORE_NAMES.FIGHTERS,
        STORE_NAMES.EVENTS,
        STORE_NAMES.APPLICATIONS,
        STORE_NAMES.TICKETS,
        STORE_NAMES.CONTACTS,
        STORE_NAMES.AUDIT_LOGS,
        STORE_NAMES.METADATA,
      ],
      'readwrite'
    );

    // Clear stores
    tx.objectStore(STORE_NAMES.FIGHTERS).clear();
    tx.objectStore(STORE_NAMES.EVENTS).clear();
    tx.objectStore(STORE_NAMES.APPLICATIONS).clear();
    tx.objectStore(STORE_NAMES.TICKETS).clear();
    tx.objectStore(STORE_NAMES.CONTACTS).clear();
    tx.objectStore(STORE_NAMES.AUDIT_LOGS).clear();
    tx.objectStore(STORE_NAMES.METADATA).clear();

    // Re-seed
    const fightersStore = tx.objectStore(STORE_NAMES.FIGHTERS);
    SEED_FIGHTERS.forEach((f) => fightersStore.put(f));

    const eventsStore = tx.objectStore(STORE_NAMES.EVENTS);
    SEED_EVENTS.forEach((e) => eventsStore.put(e));

    const appsStore = tx.objectStore(STORE_NAMES.APPLICATIONS);
    SEED_APPLICATIONS.forEach((a) => appsStore.put(a));

    const ticketsStore = tx.objectStore(STORE_NAMES.TICKETS);
    SEED_TICKETS.forEach((t) => ticketsStore.put(t));

    const contactsStore = tx.objectStore(STORE_NAMES.CONTACTS);
    SEED_CONTACTS.forEach((c) => contactsStore.put(c));

    const auditStore = tx.objectStore(STORE_NAMES.AUDIT_LOGS);
    auditStore.put({
      id: `audit-${Date.now()}`,
      action: 'DATABASE_RESET_EXECUTED',
      entity: 'SYSTEM',
      entityId: 'ALL',
      timestamp: new Date().toISOString(),
    });

    const metaStore = tx.objectStore(STORE_NAMES.METADATA);
    metaStore.put({ key: 'seed_installed_v1', value: true, resetAt: new Date().toISOString() });
    metaStore.put({ key: 'schema_version', value: DB_VERSION });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        console.info('[IndexedDB] Successfully reset database to clean seed data.');
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  }

  /**
   * Export database state as JSON string
   */
  public async exportSnapshot(): Promise<string> {
    const fighters = await this.getAll<FighterEntity>(STORE_NAMES.FIGHTERS);
    const events = await this.getAll<EventEntity>(STORE_NAMES.EVENTS);
    const applications = await this.getAll<ApplicationEntity>(STORE_NAMES.APPLICATIONS);
    const tickets = await this.getAll<TicketReservationEntity>(STORE_NAMES.TICKETS);
    const contacts = await this.getAll<ContactMessageEntity>(STORE_NAMES.CONTACTS);
    const auditLogs = await this.getAll<AuditLogEntity>(STORE_NAMES.AUDIT_LOGS);

    const snapshot: MockDatabaseSnapshot = {
      fighters,
      events,
      applications,
      tickets,
      contacts,
      auditLogs,
      version: DB_VERSION,
      lastPersisted: new Date().toISOString(),
    };

    return JSON.stringify(snapshot, null, 2);
  }
}

export const indexedDbAdapter = new IndexedDbAdapter();
