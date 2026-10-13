/**
 * Apex Mock Database - Schema Type Definitions
 * Enterprise-grade data models, relations, query options, and entity types.
 */

export type DivisionType = 'MMA' | 'Boxing' | 'Kickboxing' | 'Grappling';

export type StanceType = 'Orthodox' | 'Southpaw' | 'Switch';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type MedicalStatus = 'CLEARED' | 'PENDING_DOCS' | 'EXPIRED';

export type TicketTier = 'Standard' | 'Ringside' | 'VIP Cage-Side';

export type TicketStatus = 'CONFIRMED' | 'CHECKED_IN' | 'CANCELLED';

export type MessageStatus = 'NEW' | 'REVIEWED' | 'ARCHIVED';

export interface FighterEntity {
  id: string;
  name: string;
  nickname: string;
  division: DivisionType;
  weightClass: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
    kos: number;
    submissions: number;
  };
  country: string;
  flag: string;
  height: string;
  reach: string;
  stance: StanceType;
  imageUrl: string;
  isChampion: boolean;
  ranking?: number;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface FightMatchup {
  weightClass: string;
  isMainEvent?: boolean;
  isTitleFight?: boolean;
  fighterA: { name: string; record: string; country: string; flag: string };
  fighterB: { name: string; record: string; country: string; flag: string };
}

export interface EventEntity {
  id: number;
  name: string;
  subtitle: string;
  date: string;
  isoDate: string;
  time: string;
  location: string;
  venue: string;
  posterUrl: string;
  description: string;
  status: 'Upcoming' | 'Completed';
  ticketsAvailable: boolean;
  ticketPrice: string;
  fights?: FightMatchup[];
  result?: {
    winner: string;
    method: string;
    round: number;
    time: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationEntity {
  id: string;
  dossierId: string;
  name: string;
  email: string;
  weightClass: string;
  discipline: DivisionType | string;
  message?: string;
  status: ApplicationStatus;
  medicalStatus: MedicalStatus;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketReservationEntity {
  id: string;
  ticketCode: string;
  eventId: number;
  eventName: string;
  customerName: string;
  customerEmail: string;
  tier: TicketTier;
  quantity: number;
  totalPrice: string;
  status: TicketStatus;
  createdAt: string;
}

export interface ContactMessageEntity {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface AuditLogEntity {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface MockDatabaseSnapshot {
  fighters: FighterEntity[];
  events: EventEntity[];
  applications: ApplicationEntity[];
  tickets: TicketReservationEntity[];
  contacts: ContactMessageEntity[];
  auditLogs: AuditLogEntity[];
  version: number;
  lastPersisted: string;
}

/**
 * Query options mimicking modern ORMs (Prisma / Drizzle)
 */
export interface QueryOptions<T> {
  where?: Partial<Record<keyof T, any>> | ((item: T) => boolean);
  search?: {
    query: string;
    fields: (keyof T)[];
  };
  orderBy?: {
    field: keyof T | string;
    direction?: 'asc' | 'desc';
  };
  skip?: number;
  take?: number;
}
