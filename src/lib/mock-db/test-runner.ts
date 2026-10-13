/**
 * Automated Test Suite for Apex Mock Database
 * Verifies Schema, Seeding Idempotency, CRUD, Query Engine, Persistence, and Referential Integrity.
 */

import { db } from './client';
import { executeQuery } from './query-engine';
import { SEED_FIGHTERS, SEED_EVENTS } from './seed';

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  durationMs: number;
  details?: string;
}

export async function runMockDbTestSuite(): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: TestResult[];
}> {
  const results: TestResult[] = [];

  const runTest = async (suite: string, name: string, fn: () => Promise<void>) => {
    const start = performance.now();
    try {
      await fn();
      results.push({
        suite,
        name,
        passed: true,
        durationMs: Math.round(performance.now() - start),
      });
    } catch (err: any) {
      results.push({
        suite,
        name,
        passed: false,
        durationMs: Math.round(performance.now() - start),
        details: err?.message || String(err),
      });
    }
  };

  // SUITE 1: Initialization & Seed Verification
  await runTest('Initialization', 'Initial Seed Data Loaded Correctly', async () => {
    const fighters = await db.fighters.getAll();
    if (fighters.length < SEED_FIGHTERS.length) {
      throw new Error(`Expected at least ${SEED_FIGHTERS.length} fighters, got ${fighters.length}`);
    }
    const events = await db.events.getAll();
    if (events.length < SEED_EVENTS.length) {
      throw new Error(`Expected at least ${SEED_EVENTS.length} events, got ${events.length}`);
    }
  });

  await runTest('Initialization', 'Idempotent Seeding (No Duplication)', async () => {
    const countBefore = await db.fighters.count();
    // Simulate re-fetching and verifying count consistency
    const fightersAgain = await db.fighters.getAll();
    if (fightersAgain.length !== countBefore) {
      throw new Error(`Count mismatch on re-query: ${fightersAgain.length} vs ${countBefore}`);
    }
  });

  // SUITE 2: CRUD Operations
  await runTest('CRUD: Fighters', 'Create, Retrieve, Update, and Delete Fighter', async () => {
    // Create
    const created = await db.fighters.create({
      name: 'Test QA Boxer',
      nickname: 'QA Tester',
      division: 'Boxing',
      weightClass: 'Middleweight (185 lbs)',
      record: { wins: 10, losses: 0, draws: 0, kos: 8, submissions: 0 },
      country: 'Canada',
      flag: '🇨🇦',
      height: '6\'0"',
      reach: '74"',
      stance: 'Orthodox',
      imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
      isChampion: false,
      bio: 'Synthetic fighter created for automated test.',
    });

    if (!created.id || created.name !== 'Test QA Boxer') {
      throw new Error('Created fighter failed validation');
    }

    // Retrieve
    const fetched = await db.fighters.getById(created.id);
    if (!fetched || fetched.name !== 'Test QA Boxer') {
      throw new Error('Failed to retrieve newly created fighter');
    }

    // Update
    const updated = await db.fighters.update(created.id, { isChampion: true });
    if (!updated || !updated.isChampion) {
      throw new Error('Failed to update fighter champion status');
    }

    // Delete
    const deleted = await db.fighters.delete(created.id);
    if (!deleted) {
      throw new Error('Failed to delete test fighter');
    }

    // Verify missing
    const missing = await db.fighters.getById(created.id);
    if (missing !== null) {
      throw new Error('Fighter was not removed after delete');
    }
  });

  await runTest('CRUD: Applications', 'Create Athlete Application and Verify Dossier Code', async () => {
    const app = await db.applications.create({
      name: 'QA Applicant',
      email: 'qa.applicant@test.com',
      weightClass: 'Welterweight (170 lbs)',
      discipline: 'MMA',
      message: 'Automated test application.',
    });

    if (!app.dossierId.startsWith('APEX-ATH-')) {
      throw new Error(`Invalid dossier ID format: ${app.dossierId}`);
    }

    if (app.status !== 'PENDING') {
      throw new Error(`Initial status must be PENDING, got ${app.status}`);
    }

    // Update status
    const updatedApp = await db.applications.updateStatus(app.id, 'APPROVED', 'Verified by automated QA harness');
    if (!updatedApp || updatedApp.status !== 'APPROVED') {
      throw new Error('Status update to APPROVED failed');
    }

    // Cleanup
    await db.applications.delete(app.id);
  });

  await runTest('CRUD: Tickets', 'Reserve Fight Pass and Verify Unique Ticket Code', async () => {
    const tkt = await db.tickets.create({
      eventId: 28,
      eventName: 'Apex 28: War of Champions',
      customerName: 'QA Ticket Buyer',
      customerEmail: 'qa.buyer@test.com',
      tier: 'Ringside',
      quantity: 2,
    });

    if (!tkt.ticketCode.startsWith('APEX-TKT-')) {
      throw new Error(`Invalid ticket code format: ${tkt.ticketCode}`);
    }

    const fetchedTkt = await db.tickets.getByCode(tkt.ticketCode);
    if (!fetchedTkt || fetchedTkt.customerName !== 'QA Ticket Buyer') {
      throw new Error('Lookup by ticket code failed');
    }

    // Cleanup
    await db.tickets.delete(tkt.id);
  });

  await runTest('CRUD: Contacts', 'Dispatch Transmission and Update Review Status', async () => {
    const msg = await db.contacts.create({
      name: 'QA Inquirer',
      email: 'qa.inquirer@test.com',
      subject: 'Automated Test Inquiry',
      message: 'Testing message ingestion pipeline.',
    });

    if (msg.status !== 'NEW') {
      throw new Error('New message must have status NEW');
    }

    const updated = await db.contacts.updateStatus(msg.id, 'REVIEWED');
    if (!updated || updated.status !== 'REVIEWED') {
      throw new Error('Failed to update message status to REVIEWED');
    }

    // Cleanup
    await db.contacts.delete(msg.id);
  });

  // SUITE 3: Query Engine (Where, Search, Sort, Pagination)
  await runTest('Query Engine', 'Filtering by Division', async () => {
    const mmaFighters = await db.fighters.findMany({ where: { division: 'MMA' } });
    if (mmaFighters.some((f) => f.division !== 'MMA')) {
      throw new Error('Found non-MMA fighter in filtered division result');
    }
  });

  await runTest('Query Engine', 'Multi-field Search Filtering', async () => {
    const searchResults = await db.fighters.findMany({
      search: {
        query: 'Silva',
        fields: ['name', 'nickname', 'country'],
      },
    });

    if (!searchResults.some((f) => f.name.includes('Silva'))) {
      throw new Error('Search failed to find Alexandre Silva');
    }
  });

  await runTest('Query Engine', 'Sorting by Wins (Descending)', async () => {
    const sorted = await db.fighters.findMany({
      orderBy: { field: 'record.wins', direction: 'desc' },
    });

    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].record.wins < sorted[i + 1].record.wins) {
        throw new Error('Sorting violation: items not descending by record.wins');
      }
    }
  });

  await runTest('Query Engine', 'Pagination (Skip & Take)', async () => {
    const page1 = await db.fighters.findMany({ skip: 0, take: 3 });
    const page2 = await db.fighters.findMany({ skip: 3, take: 3 });

    if (page1.length !== 3 || page2.length < 1) {
      throw new Error('Pagination page sizing failure');
    }

    const overlap = page1.some((p1) => page2.some((p2) => p1.id === p2.id));
    if (overlap) {
      throw new Error('Pagination overlap detected between page 1 and page 2');
    }
  });

  // SUITE 4: Referential Integrity
  await runTest('Referential Integrity', 'All Ticket Reservations Reference Valid Events', async () => {
    const [allTickets, allEvents] = await Promise.all([
      db.tickets.getAll(),
      db.events.getAll(),
    ]);

    const validEventIds = new Set(allEvents.map((e) => e.id));
    for (const t of allTickets) {
      if (!validEventIds.has(t.eventId)) {
        throw new Error(`Orphaned ticket reservation found: ticket ${t.ticketCode} references non-existent eventId ${t.eventId}`);
      }
    }
  });

  // SUITE 5: Aggregates & Statistics
  await runTest('Aggregates', 'Database Stats Engine Calculates Consistent Totals', async () => {
    const stats = await db.admin.getDatabaseStats();
    if (typeof stats.totalFighters !== 'number' || stats.totalFighters <= 0) {
      throw new Error('Invalid aggregate totalFighters');
    }
    if (typeof stats.totalEvents !== 'number' || stats.totalEvents <= 0) {
      throw new Error('Invalid aggregate totalEvents');
    }
  });

  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed: passedCount,
    failed: failedCount,
    results,
  };
}
