# 🗄️ Apex Mock Database Architecture Specification

> **Architecture Report & Technical Documentation**  
> **Prepared by:** Principal Full-Stack Engineer, Database Architect, Senior QA Engineer, and Application Security Specialist  
> **Project:** Apex Combat Championship (ACC) Web Platform  
> **Storage Engine:** Native Browser-Local IndexedDB with SSR Memory Fallback

---

## 1. Executive Summary & Architectural Decisions

### Strategy Selected: Native IndexedDB (Object Stores & Repository Pattern)
The Apex Combat Championship website is a high-performance sports entertainment front-end built on **Next.js 15 (App Router)** and **React 19**. Because the application is designed for **internship presentation and demonstration**, client-side browser storage is the ideal fit:

* **Why IndexedDB over LocalStorage:**
  * IndexedDB provides true **structured cloning, non-blocking asynchronous I/O, object store indexing**, and support for binary/complex records.
  * LocalStorage is synchronous, blocking the main thread, and limited to ~5MB of UTF-16 strings.
* **Why Native API over External Dependencies (e.g. `idb`):**
  * Zero third-party dependency footprint ensures guaranteed compatibility with React 19 without peer dependency conflicts.
  * Native transactions, schema version upgrades (`onupgradeneeded`), and cursors give complete architectural control.
* **Hybrid Server-Side Rendering (SSR) Fallback:**
  * During Next.js SSR build and pre-rendering (where `window.indexedDB` is undefined), the database engine automatically falls back to an in-memory seed snapshot. This prevents `window is not defined` crashes while providing full client-side persistence in the browser.

> [!NOTE]
> **Data Scope Notice:** IndexedDB data is stored locally and securely within the user's specific browser instance. Records are **not** synchronized across multiple devices or different browsers unless exported and imported via the JSON database snapshot tool.

---

## 2. Database Schema & Object Store Models

The database is named **`APEX_MOCK_DATABASE`** (Schema Version `1`) and is divided into 7 normalized object stores:

```
APEX_MOCK_DATABASE (v1)
├── fighters               [keyPath: id]            (indexes: division, weightClass, isChampion, name)
├── events                 [keyPath: id]            (indexes: status, isoDate, name)
├── fighter_applications   [keyPath: id]            (indexes: dossierId, status, discipline, email, createdAt)
├── ticket_reservations    [keyPath: id]            (indexes: ticketCode, eventId, tier, status)
├── contact_messages       [keyPath: id]            (indexes: status, createdAt)
├── audit_logs             [keyPath: id]            (indexes: action, timestamp)
└── metadata               [keyPath: key]           (tracks schema_version, seed_installed_v1)
```

### Entity Specifications

#### 1. `fighters`
* **`id`** (`string`, PK): e.g. `'fighter-1'`
* **`name`** (`string`): Fighter legal/display name
* **`nickname`** (`string`): Ring moniker
* **`division`** (`'MMA' | 'Boxing' | 'Kickboxing' | 'Grappling'`): Target combat division
* **`weightClass`** (`string`): Sanctioned weight class (e.g. `'Heavyweight (265 lbs)'`)
* **`record`** (`object`): `{ wins, losses, draws, kos, submissions }`
* **`country`** & **`flag`** (`string`): Nationality and emoji flag
* **`height`** & **`reach`** (`string`): Tale-of-the-tape reach telemetry
* **`stance`** (`'Orthodox' | 'Southpaw' | 'Switch'`)
* **`imageUrl`** (`string`): Profile combat image URL
* **`isChampion`** (`boolean`): Titleholder flag
* **`ranking`** (`number`, optional): Contender ranking (e.g. `1`)
* **`bio`** (`string`): Athletic dossier narrative

#### 2. `events`
* **`id`** (`number`, PK): Event number (e.g. `28`)
* **`name`** (`string`): Event title (e.g. `'Apex 28: War of Champions'`)
* **`subtitle`** (`string`): Headliner description
* **`date`** & **`isoDate`** (`string`): Human-readable date and ISO timestamp
* **`venue`** & **`location`** (`string`): Arena name and host city
* **`posterUrl`** (`string`): Event banner asset path
* **`status`** (`'Upcoming' | 'Completed'`)
* **`ticketsAvailable`** (`boolean`) & **`ticketPrice`** (`string`)
* **`fights`** (`FightMatchup[]`): Bout lineup with fighter records and weight categories
* **`result`** (`object`, optional): Victory outcome, stoppage method, round, and time

#### 3. `fighter_applications`
* **`id`** (`string`, PK): UUID-style record identifier
* **`dossierId`** (`string`, Unique Index): Official commission format (e.g. `'APEX-ATH-902148'`)
* **`name`** (`string`) & **`email`** (`string`)
* **`discipline`** (`string`) & **`weightClass`** (`string`)
* **`message`** (`string`, optional): Athletic fight camp background
* **`status`** (`'PENDING' | 'APPROVED' | 'REJECTED'`)
* **`medicalStatus`** (`'CLEARED' | 'PENDING_DOCS' | 'EXPIRED'`)
* **`reviewNotes`** (`string`, optional): Commission reviewer timestamp and comments

#### 4. `ticket_reservations`
* **`id`** (`string`, PK)
* **`ticketCode`** (`string`, Unique Index): Pass credential code (e.g. `'APEX-TKT-782194'`)
* **`eventId`** (`number`, Foreign Key -> `events.id`)
* **`eventName`** (`string`)
* **`customerName`** & **`customerEmail`** (`string`)
* **`tier`** (`'Standard' | 'Ringside' | 'VIP Cage-Side'`)
* **`quantity`** (`number`): Allocated seats
* **`totalPrice`** (`string`)
* **`status`** (`'CONFIRMED' | 'CHECKED_IN' | 'CANCELLED'`)

#### 5. `contact_messages`
* **`id`** (`string`, PK)
* **`name`** & **`email`** (`string`)
* **`subject`** (`string`): Inquiry classification
* **`message`** (`string`)
* **`status`** (`'NEW' | 'REVIEWED' | 'ARCHIVED'`)

---

## 3. Initialization & Idempotency Engine

When the website loads:
1. `indexedDbAdapter.getDb()` opens `APEX_MOCK_DATABASE` at version `1`.
2. If the database does not exist, `onupgradeneeded` creates all 7 stores and indexes.
3. `ensureSeedData()` checks the `metadata` object store for key `seed_installed_v1`.
4. **Idempotency Guarantee:** If `seed_installed_v1` is present, initialization **does not overwrite** or duplicate records. Existing user-created athlete applications, ticket reservations, and modifications are preserved across browser refreshes and tab re-opens.
5. If absent, the initial seed data is loaded inside an atomic `readwrite` transaction.

---

## 4. Developer API Examples

The mock database exposes a clean repository client:

```typescript
import { db } from '@/lib/mock-db';

// 1. Query fighters by division and sort by wins
const champions = await db.fighters.findMany({
  where: { division: 'MMA', isChampion: true },
  orderBy: { field: 'record.wins', direction: 'desc' },
});

// 2. Submit a new fighter application
const newApplication = await db.applications.create({
  name: 'Marcus Vance',
  email: 'marcus@fightcamp.com',
  weightClass: 'Heavyweight (265 lbs)',
  discipline: 'MMA',
  message: '19-2 Pro Record.',
});
console.log(newApplication.dossierId); // "APEX-ATH-XXXXXX"

// 3. Book fight night tickets
const pass = await db.tickets.create({
  eventId: 28,
  eventName: 'Apex 28: War of Champions',
  customerName: 'Marcus Reynolds',
  customerEmail: 'm.reynolds@vegasvip.com',
  tier: 'VIP Cage-Side',
  quantity: 2,
});
console.log(pass.ticketCode); // "APEX-TKT-XXXXXX"

// 4. Retrieve live system statistics
const stats = await db.admin.getDatabaseStats();
console.log(stats.totalFighters, stats.pendingAppsCount);

// 5. Reset database to clean initial seed
await db.admin.resetDatabase();
```

---

## 5. Demonstration Controls & Commission Admin Portal

### Floating Demonstration Badge
A discreet indicator appears at the bottom-right corner of all pages (`⚡ IndexedDB Active`). Clicking it opens the **Demonstration Controls Modal**:
* Real-time entity record counters.
* **Reset Database Button:** Requires explicit user confirmation before purging modifications.
* **Export Snapshot Button:** Exports the entire IndexedDB state as a timestamped JSON file.
* Link to the **Commission Admin Portal (`/admin`)**.

### Commission Admin Portal (`/admin`)
Accessible at `/admin`:
* **Fighter Applications Ledger:** Review submitted fighter dossiers, approve or reject applications, and filter by discipline.
* **Ticket Reservations Ledger:** View seat allocations and check-in attendees.
* **Contact Transmissions Inbox:** Read and review incoming partner inquiries.
* **Roster CRUD:** Add new fighters directly to IndexedDB.
* **Transaction Audit Logs:** Review the immutable audit log stream.
* **Automated QA Test Runner:** Click **"Execute All 12 QA Tests"** to run the unit and integration verification harness in real time.

---

## 6. How to Run & Test

```bash
# Install dependencies with React 19 legacy peer flag
npm install --legacy-peer-deps

# Start development server
npm run dev

# Open in browser
http://localhost:9002

# Open Commission Admin & QA Test Harness
http://localhost:9002/admin
```

---

## 7. Security & QA Verification

* **Input Sanitization:** User names, emails, and text messages are trimmed and sanitized before being committed to IndexedDB.
* **XSS Prevention:** Output strings are escaped and rendered via React JSX bindings.
* **No Secret Exposure:** No real private keys, credentials, or actual personal customer records are ever accepted or stored.
