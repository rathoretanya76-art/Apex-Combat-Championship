import { 
  FighterEntity, 
  EventEntity, 
  ApplicationEntity, 
  TicketReservationEntity, 
  ContactMessageEntity, 
  AuditLogEntity 
} from './types';

export const SEED_FIGHTERS: FighterEntity[] = [
  {
    id: 'fighter-1',
    name: 'Alexandre "The Titan" Silva',
    nickname: 'The Titan',
    division: 'MMA',
    weightClass: 'Heavyweight (265 lbs)',
    record: { wins: 22, losses: 1, draws: 0, kos: 17, submissions: 3 },
    country: 'Brazil',
    flag: '🇧🇷',
    height: '6\'4" (193 cm)',
    reach: '80" (203 cm)',
    stance: 'Orthodox',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    isChampion: true,
    bio: 'Reigning Undisputed Apex Heavyweight World Champion. Notorious for earth-shattering first-round knockouts and ruthless Brazilian Jiu-Jitsu pedigree.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z'
  },
  {
    id: 'fighter-2',
    name: 'Marcus "Ironclad" Vance',
    nickname: 'Ironclad',
    division: 'MMA',
    weightClass: 'Heavyweight (265 lbs)',
    record: { wins: 19, losses: 2, draws: 0, kos: 15, submissions: 1 },
    country: 'United States',
    flag: '🇺🇸',
    height: '6\'3" (190 cm)',
    reach: '78" (198 cm)',
    stance: 'Orthodox',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    isChampion: false,
    ranking: 1,
    bio: 'Former collegiate NCAA Division I wrestler with thunderous striking power. The relentless #1 contender in the Heavyweight division.',
    createdAt: '2026-02-15T11:00:00Z',
    updatedAt: '2026-10-02T15:00:00Z'
  },
  {
    id: 'fighter-3',
    name: 'Viktor "The Viper" Petrov',
    nickname: 'The Viper',
    division: 'MMA',
    weightClass: 'Lightweight (155 lbs)',
    record: { wins: 26, losses: 0, draws: 0, kos: 12, submissions: 11 },
    country: 'Kazakhstan',
    flag: '🇰🇿',
    height: '5\'10" (178 cm)',
    reach: '72" (183 cm)',
    stance: 'Southpaw',
    imageUrl: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=800&auto=format&fit=crop',
    isChampion: true,
    bio: 'Pound-for-pound king. Undefeated Combat Sambo World Champion known for suffocating top control and pinpoint southpaw combinations.',
    createdAt: '2026-01-12T09:00:00Z',
    updatedAt: '2026-09-20T14:00:00Z'
  },
  {
    id: 'fighter-4',
    name: 'Liam "Ghost" Gallagher',
    nickname: 'The Ghost',
    division: 'MMA',
    weightClass: 'Lightweight (155 lbs)',
    record: { wins: 21, losses: 3, draws: 0, kos: 14, submissions: 4 },
    country: 'Ireland',
    flag: '🇮🇪',
    height: '5\'11" (180 cm)',
    reach: '74" (188 cm)',
    stance: 'Switch',
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop',
    isChampion: false,
    ranking: 1,
    bio: 'Elusive footwork and lightning-quick counterpunching. A lethal finisher with 8 Performance of the Night bonuses.',
    createdAt: '2026-03-01T14:30:00Z',
    updatedAt: '2026-09-28T18:00:00Z'
  },
  {
    id: 'fighter-5',
    name: 'Tyson "Thunder" Drake',
    nickname: 'Thunder',
    division: 'Boxing',
    weightClass: 'Middleweight (185 lbs)',
    record: { wins: 28, losses: 1, draws: 0, kos: 24, submissions: 0 },
    country: 'United Kingdom',
    flag: '🇬🇧',
    height: '6\'1" (185 cm)',
    reach: '76" (193 cm)',
    stance: 'Orthodox',
    imageUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=800&auto=format&fit=crop',
    isChampion: true,
    bio: 'Apex Boxing Division Champion. Feared for a pulverizing left hook and surgical rhythm disruption that has dismantled 24 opponents.',
    createdAt: '2026-01-05T12:00:00Z',
    updatedAt: '2026-08-30T10:00:00Z'
  },
  {
    id: 'fighter-6',
    name: 'Kenji "Ronin" Sato',
    nickname: 'The Ronin',
    division: 'Kickboxing',
    weightClass: 'Welterweight (170 lbs)',
    record: { wins: 34, losses: 4, draws: 1, kos: 22, submissions: 0 },
    country: 'Japan',
    flag: '🇯🇵',
    height: '5\'11" (180 cm)',
    reach: '73" (185 cm)',
    stance: 'Southpaw',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop',
    isChampion: true,
    bio: 'Kyokushin Karate black belt and K-1 tournament veteran. Master of devastating low kicks and spinning wheel knockouts.',
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-09-15T16:00:00Z'
  },
  {
    id: 'fighter-7',
    name: 'Diego "El Matador" Morales',
    nickname: 'El Matador',
    division: 'Grappling',
    weightClass: 'Welterweight (170 lbs)',
    record: { wins: 19, losses: 1, draws: 0, kos: 0, submissions: 17 },
    country: 'Mexico',
    flag: '🇲🇽',
    height: '5\'9" (175 cm)',
    reach: '71" (180 cm)',
    stance: 'Orthodox',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    isChampion: true,
    bio: 'ADCC gold medalist and 3rd degree BJJ Black Belt. Regarded as the most dangerous submission specialist on the planet.',
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-07-12T11:00:00Z'
  },
  {
    id: 'fighter-8',
    name: 'Carl "The Juggernaut" Becker',
    nickname: 'The Juggernaut',
    division: 'MMA',
    weightClass: 'Middleweight (185 lbs)',
    record: { wins: 18, losses: 4, draws: 0, kos: 13, submissions: 2 },
    country: 'Germany',
    flag: '🇩🇪',
    height: '6\'2" (188 cm)',
    reach: '76" (193 cm)',
    stance: 'Orthodox',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    isChampion: false,
    ranking: 2,
    bio: 'Heavy pressure fighter with an iron chin and relentless forward pace that breaks the will of top contenders.',
    createdAt: '2026-03-14T15:00:00Z',
    updatedAt: '2026-08-20T17:00:00Z'
  }
];

export const SEED_EVENTS: EventEntity[] = [
  {
    id: 28,
    name: "Apex 28: War of Champions",
    subtitle: "Heavyweight World Championship",
    date: "Saturday, November 28, 2026",
    isoDate: "2026-11-28T20:00:00",
    time: "8:00 PM EST / 5:00 PM PST",
    location: "Las Vegas, Nevada, USA",
    venue: "T-Mobile Arena",
    posterUrl: "/assets/images/event-poster.jpg",
    description: "The biggest heavyweight showdown in combat history. Alexandre Silva defends against knockout juggernaut Marcus Vance.",
    status: 'Upcoming',
    ticketsAvailable: true,
    ticketPrice: "$95 - $750",
    fights: [
      {
        weightClass: "World Heavyweight Championship (265 lbs)",
        isMainEvent: true,
        isTitleFight: true,
        fighterA: { name: 'Alexandre "The Titan" Silva (C)', record: "22-1-0", country: "Brazil", flag: "🇧🇷" },
        fighterB: { name: 'Marcus "Ironclad" Vance (#1)', record: "19-2-0", country: "USA", flag: "🇺🇸" }
      },
      {
        weightClass: "Lightweight Title Contender (155 lbs)",
        fighterA: { name: 'Liam "Ghost" Gallagher', record: "21-3-0", country: "Ireland", flag: "🇮🇪" },
        fighterB: { name: 'Diego Morales', record: "19-1-0", country: "Mexico", flag: "🇲🇽" }
      }
    ],
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 29,
    name: "Apex 29: Blood & Honor",
    subtitle: "Lightweight Unification Battle",
    date: "Saturday, December 19, 2026",
    isoDate: "2026-12-19T21:00:00",
    time: "9:00 PM EST",
    location: "Riyadh, Saudi Arabia",
    venue: "Kingdom Arena",
    posterUrl: "/assets/images/hero-bg.jpg",
    description: "Pound-for-pound sovereign Viktor Petrov puts his 26-0 undefeated record on the line in a blockbuster superfight.",
    status: 'Upcoming',
    ticketsAvailable: true,
    ticketPrice: "$120 - $900",
    createdAt: '2026-08-15T10:00:00Z',
    updatedAt: '2026-10-05T12:00:00Z'
  },
  {
    id: 27,
    name: "Apex 27: Reckoning Las Vegas",
    subtitle: "Heavyweight Title Eliminator",
    date: "Saturday, October 10, 2026",
    isoDate: "2026-10-10T20:00:00",
    time: "8:00 PM EST",
    location: "Las Vegas, Nevada, USA",
    venue: "MGM Grand Garden Arena",
    posterUrl: "/assets/images/event-poster.jpg",
    description: "A sold-out arena witnessed the fastest knockout in Apex championship tournament history.",
    status: 'Completed',
    ticketsAvailable: false,
    ticketPrice: "Sold Out",
    result: {
      winner: "Alexandre Silva",
      method: "KO (Right Uppercut)",
      round: 2,
      time: "1:47"
    },
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-10-11T02:00:00Z'
  }
];

export const SEED_APPLICATIONS: ApplicationEntity[] = [
  {
    id: 'app-seed-1',
    dossierId: 'APEX-ATH-902148',
    name: 'Mateo "El Fuego" Cruz',
    email: 'mateo.cruz@attilamma.com',
    weightClass: 'Welterweight (170 lbs)',
    discipline: 'MMA',
    message: 'Pro Record 15-2-0 (11 KOs). Former regional belt holder in Latin America. Available on 3 weeks notice.',
    status: 'APPROVED',
    medicalStatus: 'CLEARED',
    reviewNotes: 'Verified Tapology record. Medical brain MRI cleared by Dr. Ramirez.',
    createdAt: '2026-10-08T14:22:00Z',
    updatedAt: '2026-10-10T09:15:00Z'
  },
  {
    id: 'app-seed-2',
    dossierId: 'APEX-ATH-482019',
    name: 'Sergei "The Cossack" Ivanov',
    email: 's.ivanov@combatcamp.ru',
    weightClass: 'Light Heavyweight (205 lbs)',
    discipline: 'Boxing',
    message: 'National Golden Gloves Champion. 18-0 Pro record with 15 KOs.',
    status: 'PENDING',
    medicalStatus: 'PENDING_DOCS',
    reviewNotes: 'Awaiting bloodwork and updated eye clearance from British Boxing Board.',
    createdAt: '2026-10-11T16:40:00Z',
    updatedAt: '2026-10-11T16:40:00Z'
  },
  {
    id: 'app-seed-3',
    dossierId: 'APEX-ATH-391054',
    name: 'Declan O\'Connor',
    email: 'declan.oc@dublinfight.ie',
    weightClass: 'Featherweight (145 lbs)',
    discipline: 'Kickboxing',
    message: 'Amateur record 22-1, Pro record 9-1. High pace volume striker seeking Apex contract.',
    status: 'PENDING',
    medicalStatus: 'CLEARED',
    createdAt: '2026-10-12T11:05:00Z',
    updatedAt: '2026-10-12T11:05:00Z'
  }
];

export const SEED_TICKETS: TicketReservationEntity[] = [
  {
    id: 'tkt-seed-1',
    ticketCode: 'APEX-TKT-782194',
    eventId: 28,
    eventName: 'Apex 28: War of Champions',
    customerName: 'Marcus Reynolds',
    customerEmail: 'm.reynolds@vegasvip.com',
    tier: 'VIP Cage-Side',
    quantity: 2,
    totalPrice: '$1,500',
    status: 'CONFIRMED',
    createdAt: '2026-10-09T18:30:00Z'
  },
  {
    id: 'tkt-seed-2',
    ticketCode: 'APEX-TKT-319042',
    eventId: 28,
    eventName: 'Apex 28: War of Champions',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@gmail.com',
    tier: 'Ringside',
    quantity: 4,
    totalPrice: '$980',
    status: 'CONFIRMED',
    createdAt: '2026-10-10T12:15:00Z'
  }
];

export const SEED_CONTACTS: ContactMessageEntity[] = [
  {
    id: 'msg-seed-1',
    name: 'David Stern',
    email: 'david.stern@combatmedia.tv',
    subject: 'Press & Broadcast Credentials',
    message: 'Requesting 3 ringside press credentials for Combat Media TV crew to cover Apex 28 fight week and press conference.',
    status: 'NEW',
    createdAt: '2026-10-12T08:45:00Z'
  },
  {
    id: 'msg-seed-2',
    name: 'Sarah Jenkins',
    email: 'sjenkins@hayabusacombat.com',
    subject: 'Sponsorship & Brand Partnership',
    message: 'Inquiring about expanding the official glove and fight shorts sponsorship package for the upcoming 2027 season.',
    status: 'REVIEWED',
    createdAt: '2026-10-11T14:10:00Z'
  }
];

export const SEED_AUDIT_LOGS: AuditLogEntity[] = [
  {
    id: 'log-1',
    action: 'DATABASE_INITIALIZATION',
    entity: 'SYSTEM',
    entityId: 'ROOT',
    metadata: { version: 1, seededAt: new Date().toISOString() },
    timestamp: '2026-10-13T00:00:00Z'
  }
];
