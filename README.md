# ⚔️ Apex Combat Championship (ACC) - Official Web Portal

> **Forged in Combat. Proven in Blood. Crowned in Glory.**  
> The official digital platform for **Apex Combat Championship (ACC)** — an elite combat sports promotion sanctioned across Professional Mixed Martial Arts (MMA), Boxing, Kickboxing, and Submission Grappling. Presented by **Apex Global Sports & Entertainment**.

---

## 🌟 Executive Highlights & Product Features

* **⚡ Ultra-Polished Combat Sports UI:** Bespoke dark theme aesthetic (`#000000`, crimson red, championship gold) featuring SVG cage wire patterns, motion typography, and combat text shadows.
* **⏱️ Live Championship Countdown Engine:** Dynamic ticking countdown clock synchronizing with upcoming headline title cards.
* **🥊 Comprehensive Fighter Roster & Tale of the Tape (`/fighters`):**
  * Multi-division filtering (MMA, Boxing, Kickboxing, Grappling).
  * Weight class and real-time keyword search (athlete name, nickname, country).
  * Interactive **Tale of the Tape Modal** showcasing verified reach, height, fighting stance, record, and combat accolades.
* **🎟️ Fight Nights & Interactive Box Office (`/events`):**
  * Headline title fight banner with bout-by-bout undercard lineups.
  * Interactive **Seat Reservation Modal** (Standard, Ringside, VIP Cage-Side) issuing instant confirmation passes.
  * **Past Fight Results Archive** documenting stoppage methods (KOs, submissions, decisions), round numbers, and official times.
* **⚔️ Athlete Registration & Commission Portal (`/#register`):**
  * Rigorous client-side validation using **Zod** and **React Hook Form**.
  * Generates official application reference IDs (e.g. `APEX-ATH-XXXXXX`) and issues a digital applicant dossier with local persistence.
* **🏛️ Organization Heritage & Executive Leadership (`/about`):**
  * Detailed brand story, mission, and the Four Pillars of Apex (Athlete Safety, Judging Integrity, Global Scouting, Production).
  * Profiles of the executive leadership committee (Founder & Chairman, Executive Operations Manager, Head of IT & Digital Infrastructure).
  * Interactive FAQ accordion addressing athlete screening, rulesets, and ticketing.
* **📸 High-Definition Combat Gallery (`/gallery-contact`):**
  * Dynamic category filters (Octagon Action, Striking & KOs, Camp Training, Staredowns).
  * Full-screen lightbox modal for photo inspection.
* **🏢 Operations & Headquarters Hub (`/contact`):**
  * Las Vegas HQ coordinates, operating hours, and dedicated media/ticketing inquiry form.
* **📊 Client-Side Mock Database & Administrative Console (`/admin`):**
  * Full browser-local IndexedDB mock database engine (`APEX_MOCK_DATABASE`).
  * 12 automated unit & integration diagnostics with a single-click test runner.
  * Real-time metrics computed directly from stored records.
  * Complete CRUD, filtering, backup export, and demonstration reset capabilities.
* **📜 Legal & Commission Compliance (`/privacy` & `/terms`):**
  * Full privacy disclosures, anti-doping regulations (WADA/USADA alignment), and spectator terms.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Library** | [React 19](https://react.dev/) |
| **Database** | Native IndexedDB (`APEX_MOCK_DATABASE`) + SSR In-Memory Fallback |
| **Styling & Design System** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Combat Theme |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) (Primitives) + [Lucide Icons](https://lucide.dev/) |
| **Animations & FX** | [Framer Motion](https://www.framer.com/motion/) + [@studio-freight/lenis](https://lenis.darkroom.engineering/) (Smooth Scroll) |
| **Form Handling & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod 3](https://zod.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) / Radix Toaster |

---

## 📂 Site Map & Route Architecture

```
src/
├── app/
│   ├── layout.tsx             # Root layout with fonts, smooth scroll, header & footer
│   ├── page.tsx               # Homepage (Hero parallax, stats, divisions, countdown, tryouts)
│   ├── about/
│   │   └── page.tsx           # About Apex, mission, 4 pillars, executive leadership & FAQ
│   ├── admin/
│   │   └── page.tsx           # Administrative console & database management portal
│   ├── events/
│   │   └── page.tsx           # Upcoming fight nights, ticket reservation, past results archive
│   ├── fighters/
│   │   └── page.tsx           # Fighter roster, tale of the tape modal, division filters & search
│   ├── gallery-contact/
│   │   └── page.tsx           # HD media gallery with category pills & lightbox modal
│   ├── contact/
│   │   └── page.tsx           # Global operations, inquiry form, HQ coordinates & socials
│   ├── privacy/
│   │   └── page.tsx           # Official athletic privacy policy
│   ├── terms/
│   │   └── page.tsx           # Combat sports terms, anti-doping & ticketing rules
│   ├── not-found.tsx          # Custom 404 with combat video background
│   └── error.tsx              # Error boundary with recovery action
├── components/
│   ├── header.tsx             # Sticky navigation with limelight indicator & mobile drawer
│   ├── footer.tsx             # Comprehensive footer with links, copyright & socials
│   ├── demo-db-controls.tsx   # Floating demo database quick-action toolbar
│   ├── fighter-registration-form.tsx # Interactive athletic application portal
│   ├── countdown-timer.tsx    # Live ticking countdown component
│   ├── stats-section.tsx      # Count-up key organizational statistics
│   ├── logo.tsx               # Official Apex vector emblem badge
│   ├── cage-pattern.tsx       # SVG cage fence background effects
│   └── ui/                    # Accessible UI primitives (modals, accordions, cards, etc.)
└── lib/
    ├── data.ts                # Centralized domain data (fighters, events, team, sponsors)
    ├── video-config.ts        # Central video asset management
    ├── placeholder-images.json# Verified photography catalogue
    └── mock-db/               # Native IndexedDB mock database architecture
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.x or 20.x
* npm, yarn, or pnpm

### Installation

1. **Navigate to the repository:**
   ```bash
   cd apex-combat-championship
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` is configured in `.npmrc` for seamless React 19 compatibility)*

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:9002](http://localhost:9002) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🛡️ License & Acknowledgements

* **Promoting Entity:** Apex Combat Championship (ACC)
* **Parent Corporation:** Apex Global Sports & Entertainment
* Developed for portfolio & internship demonstration purposes. All rights reserved.
