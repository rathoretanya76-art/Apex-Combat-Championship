import { fightersRepository } from './repositories/fighters.repository';
import { eventsRepository } from './repositories/events.repository';
import { applicationsRepository } from './repositories/applications.repository';
import { ticketsRepository } from './repositories/tickets.repository';
import { contactsRepository } from './repositories/contacts.repository';
import { indexedDbAdapter, STORE_NAMES } from './indexeddb-adapter';
import { AuditLogEntity } from './types';

/**
 * Apex Mock Database Client
 * Singleton ORM-style interface wrapping IndexedDB repositories with transactional operations.
 */
export const db = {
  fighters: fightersRepository,
  events: eventsRepository,
  applications: applicationsRepository,
  tickets: ticketsRepository,
  contacts: contactsRepository,
  
  admin: {
    /**
     * Aggregates live system-wide statistics computed directly from stored records
     */
    async getDatabaseStats() {
      const [fighters, events, applications, tickets, contacts] = await Promise.all([
        fightersRepository.getAll(),
        eventsRepository.getAll(),
        applicationsRepository.getAll(),
        ticketsRepository.getAll(),
        contactsRepository.getAll(),
      ]);

      const championsCount = fighters.filter((f) => f.isChampion).length;
      const upcomingEventsCount = events.filter((e) => e.status === 'Upcoming').length;
      const pendingAppsCount = applications.filter((a) => a.status === 'PENDING').length;
      const approvedAppsCount = applications.filter((a) => a.status === 'APPROVED').length;
      const totalTicketsSold = tickets.reduce((sum, t) => sum + t.quantity, 0);
      const newMessagesCount = contacts.filter((c) => c.status === 'NEW').length;

      return {
        totalFighters: fighters.length,
        championsCount,
        totalEvents: events.length,
        upcomingEventsCount,
        totalApplications: applications.length,
        pendingAppsCount,
        approvedAppsCount,
        totalReservations: tickets.length,
        totalTicketsSold,
        totalMessages: contacts.length,
        newMessagesCount,
        engine: 'IndexedDB (APEX_MOCK_DATABASE v1)',
      };
    },

    /**
     * Retrieves recent audit logs
     */
    async getAuditLogs(): Promise<AuditLogEntity[]> {
      const logs = await indexedDbAdapter.getAll<AuditLogEntity>(STORE_NAMES.AUDIT_LOGS);
      return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    },

    /**
     * Resets database to default synthetic demonstration seed
     */
    async resetDatabase(): Promise<void> {
      return indexedDbAdapter.resetDatabase();
    },

    /**
     * Exports full database state as a formatted JSON string
     */
    async exportSnapshot(): Promise<string> {
      return indexedDbAdapter.exportSnapshot();
    },
  },
};

export default db;
