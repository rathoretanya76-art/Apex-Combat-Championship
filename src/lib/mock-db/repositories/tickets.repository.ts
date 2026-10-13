import { TicketReservationEntity, TicketStatus, TicketTier, QueryOptions } from '../types';
import { indexedDbAdapter, STORE_NAMES } from '../indexeddb-adapter';
import { executeQuery } from '../query-engine';

export class TicketsRepository {
  public async getAll(): Promise<TicketReservationEntity[]> {
    const list = await indexedDbAdapter.getAll<TicketReservationEntity>(STORE_NAMES.TICKETS);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public async getById(id: string): Promise<TicketReservationEntity | null> {
    return indexedDbAdapter.getById<TicketReservationEntity>(STORE_NAMES.TICKETS, id);
  }

  public async getByCode(ticketCode: string): Promise<TicketReservationEntity | null> {
    const all = await this.getAll();
    return all.find((t) => t.ticketCode.toLowerCase() === ticketCode.toLowerCase()) || null;
  }

  public async findMany(options?: QueryOptions<TicketReservationEntity>): Promise<TicketReservationEntity[]> {
    const all = await this.getAll();
    return executeQuery(all, options);
  }

  public async create(data: {
    eventId: number;
    eventName: string;
    customerName: string;
    customerEmail: string;
    tier: TicketTier;
    quantity: number;
    totalPrice?: string;
  }): Promise<TicketReservationEntity> {
    const id = `tkt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const ticketCode = `APEX-TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const tierPriceMap: Record<TicketTier, number> = {
      Standard: 95,
      Ringside: 245,
      'VIP Cage-Side': 750,
    };

    const calculatedPrice = data.totalPrice || `$${tierPriceMap[data.tier] * data.quantity}`;

    const newTicket: TicketReservationEntity = {
      id,
      ticketCode,
      eventId: data.eventId,
      eventName: data.eventName,
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim().toLowerCase(),
      tier: data.tier,
      quantity: data.quantity,
      totalPrice: calculatedPrice,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    return indexedDbAdapter.put<TicketReservationEntity>(STORE_NAMES.TICKETS, newTicket);
  }

  public async updateStatus(id: string, status: TicketStatus): Promise<TicketReservationEntity | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated: TicketReservationEntity = {
      ...existing,
      status,
    };

    return indexedDbAdapter.put<TicketReservationEntity>(STORE_NAMES.TICKETS, updated);
  }

  public async delete(id: string): Promise<boolean> {
    return indexedDbAdapter.delete(STORE_NAMES.TICKETS, id);
  }

  public async count(): Promise<number> {
    const all = await this.getAll();
    return all.length;
  }
}

export const ticketsRepository = new TicketsRepository();
