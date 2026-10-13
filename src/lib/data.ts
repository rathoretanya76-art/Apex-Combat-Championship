import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  group?: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages as ImagePlaceholder[];

export const weightClasses = [
  "Flyweight (125 lbs)",
  "Bantamweight (135 lbs)",
  "Featherweight (145 lbs)",
  "Lightweight (155 lbs)",
  "Welterweight (170 lbs)",
  "Middleweight (185 lbs)",
  "Light Heavyweight (205 lbs)",
  "Heavyweight (265 lbs)",
];

export const divisions = ["MMA", "Boxing", "Kickboxing", "Grappling"] as const;
export type DivisionType = (typeof divisions)[number];

export interface Fighter {
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
  stance: 'Orthodox' | 'Southpaw' | 'Switch';
  imageUrl: string;
  isChampion?: boolean;
  ranking?: number;
  bio: string;
}

export const fighters: Fighter[] = [
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
    bio: 'Reigning Undisputed Apex Heavyweight World Champion. Notorious for earth-shattering first-round knockouts and ruthless Brazilian Jiu-Jitsu pedigree.'
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
    ranking: 1,
    bio: 'Former collegiate NCAA Division I wrestler with thunderous striking power. The relentless #1 contender in the Heavyweight division.'
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
    bio: 'Pound-for-pound king. Undefeated Combat Sambo World Champion known for suffocating top control and pinpoint southpaw combinations.'
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
    ranking: 1,
    bio: 'Elusive footwork and lightning-quick counterpunching. A lethal finisher with 8 Performance of the Night bonuses.'
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
    bio: 'Apex Boxing Division Champion. Feared for a pulverizing left hook and surgical rhythm disruption that has dismantled 24 opponents.'
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
    bio: 'Kyokushin Karate black belt and K-1 tournament veteran. Master of devastating low kicks and spinning wheel knockouts.'
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
    bio: 'ADCC gold medalist and 3rd degree BJJ Black Belt. Regarded as the most dangerous submission specialist on the planet.'
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
    ranking: 2,
    bio: 'Heavy pressure fighter with an iron chin and relentless forward pace that breaks the will of top contenders.'
  },
  {
    id: 'fighter-9',
    name: 'Tariq "The Sandstorm" Mansoor',
    nickname: 'The Sandstorm',
    division: 'Kickboxing',
    weightClass: 'Welterweight (170 lbs)',
    record: { wins: 27, losses: 3, draws: 0, kos: 19, submissions: 0 },
    country: 'Morocco',
    flag: '🇲🇦',
    height: '6\'0" (183 cm)',
    reach: '75" (190 cm)',
    stance: 'Switch',
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
    ranking: 1,
    bio: 'Dutch kickboxing style adapted with Moroccan tenacity. High-volume flurries and vicious flying knees.'
  },
  {
    id: 'fighter-10',
    name: 'Andrei "The Bear" Sokolov',
    nickname: 'The Bear',
    division: 'Grappling',
    weightClass: 'Light Heavyweight (205 lbs)',
    record: { wins: 17, losses: 2, draws: 0, kos: 0, submissions: 15 },
    country: 'Georgia',
    flag: '🇬🇪',
    height: '6\'2" (188 cm)',
    reach: '77" (196 cm)',
    stance: 'Orthodox',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    ranking: 1,
    bio: 'Greco-Roman Olympic medalist turned submission hunter. Tremendous upper-body clinch dominance.'
  },
  {
    id: 'fighter-11',
    name: 'Jin "Shadow" Wu',
    nickname: 'Shadow',
    division: 'Boxing',
    weightClass: 'Featherweight (145 lbs)',
    record: { wins: 20, losses: 1, draws: 0, kos: 15, submissions: 0 },
    country: 'South Korea',
    flag: '🇰🇷',
    height: '5\'8" (173 cm)',
    reach: '70" (178 cm)',
    stance: 'Southpaw',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    ranking: 1,
    bio: 'Unmatched hand speed and precision. Known for dazzling defensive maneuvers and explosive counter-punches.'
  },
  {
    id: 'fighter-12',
    name: 'Carlos "Pantera" Rivera',
    nickname: 'Pantera',
    division: 'MMA',
    weightClass: 'Bantamweight (135 lbs)',
    record: { wins: 23, losses: 2, draws: 0, kos: 14, submissions: 6 },
    country: 'Colombia',
    flag: '🇨🇴',
    height: '5\'7" (170 cm)',
    reach: '69" (175 cm)',
    stance: 'Switch',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    isChampion: true,
    bio: 'Dynamic bantamweight powerhouse with blistering hand speed, creative ground scrambles, and relentless cardio.'
  }
];

export interface EventFight {
  weightClass: string;
  isMainEvent?: boolean;
  isTitleFight?: boolean;
  fighterA: { name: string; record: string; country: string; flag: string };
  fighterB: { name: string; record: string; country: string; flag: string };
}

export interface ApexEvent {
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
  ticketsAvailable?: boolean;
  ticketPrice?: string;
  fights?: EventFight[];
  result?: {
    winner: string;
    method: string;
    round: number;
    time: string;
  };
}

export const upcomingEvents: ApexEvent[] = [
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
    description: "The biggest heavyweight showdown in combat history. Alexandre Silva defends the Undisputed World Championship against knockout juggernaut Marcus Vance in a war of wills.",
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
      },
      {
        weightClass: "Middleweight Bout (185 lbs)",
        fighterA: { name: 'Carl "The Juggernaut" Becker', record: "18-4-0", country: "Germany", flag: "🇩🇪" },
        fighterB: { name: 'Kenji Sato', record: "34-4-0", country: "Japan", flag: "🇯🇵" }
      }
    ]
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
    ticketPrice: "$120 - $900"
  },
  {
    id: 30,
    name: "Apex 30: Strike Force New York",
    subtitle: "Four Championship Belts on the Line",
    date: "Saturday, January 23, 2027",
    isoDate: "2027-01-23T19:30:00",
    time: "7:30 PM EST",
    location: "New York City, NY, USA",
    venue: "Madison Square Garden",
    posterUrl: "/assets/images/mma-octagon.png",
    description: "Apex marks its historic milestone 30th edition with four title fights under the bright lights of the World's Most Famous Arena.",
    status: 'Upcoming',
    ticketsAvailable: true,
    ticketPrice: "$150 - $1200"
  },
  {
    id: 31,
    name: "Apex Endurance & Athletic Showcase",
    subtitle: "Run For Fitness, Fight For Glory",
    date: "Sunday, February 14, 2027",
    isoDate: "2027-02-14T06:00:00",
    time: "6:00 AM IST",
    location: "New Delhi, India",
    venue: "Jawaharlal Nehru Stadium & City Circuit",
    posterUrl: "/assets/images/event_MARAthon.jpeg",
    description: "Transforming athletes into disciplined powerhouses. Peak conditioning, high-altitude endurance training, and athletic excellence.",
    status: 'Upcoming',
    ticketsAvailable: true,
    ticketPrice: "Free Registration"
  }
];

export const pastEvents: ApexEvent[] = [
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
    result: {
      winner: "Alexandre Silva",
      method: "KO (Right Uppercut)",
      round: 2,
      time: "1:47"
    }
  },
  {
    id: 26,
    name: "Apex 26: Clash of Titans",
    subtitle: "London Summer Showdown",
    date: "Saturday, August 22, 2026",
    isoDate: "2026-08-22T19:00:00",
    time: "7:00 PM GMT",
    location: "London, United Kingdom",
    venue: "O2 Arena",
    posterUrl: "/assets/images/kickboxing-match.png",
    description: "Tyson Drake thrilled 18,000 screaming fans with an undisputed boxing masterclass.",
    status: 'Completed',
    result: {
      winner: "Tyson Drake",
      method: "Unanimous Decision (50-45, 49-46, 50-45)",
      round: 5,
      time: "5:00"
    }
  },
  {
    id: 25,
    name: "Apex 25: Unforgiven Singapore",
    subtitle: "Asian Championship Grand Prix",
    date: "Saturday, June 13, 2026",
    isoDate: "2026-06-13T20:00:00",
    time: "8:00 PM SGT",
    location: "Singapore",
    venue: "Singapore Indoor Stadium",
    posterUrl: "/assets/images/mma-octagon.png",
    description: "Ground war brilliance as Diego Morales scored a rare mounted triangle choke in the fourth round.",
    status: 'Completed',
    result: {
      winner: "Diego Morales",
      method: "Submission (Mounted Triangle Choke)",
      round: 4,
      time: "3:22"
    }
  },
  {
    id: 24,
    name: "Apex 24: Vendetta Chicago",
    subtitle: "Midwest Combat Showcase",
    date: "Saturday, April 18, 2026",
    isoDate: "2026-04-18T19:00:00",
    time: "7:00 PM CST",
    location: "Chicago, Illinois, USA",
    venue: "United Center",
    posterUrl: "/assets/images/fighter-staredown.png",
    description: "Five unforgettable bouts, all ending by technical knockout or submission stoppage.",
    status: 'Completed',
    result: {
      winner: "Viktor Petrov",
      method: "TKO (Ground and Pound)",
      round: 1,
      time: "4:05"
    }
  }
];

export interface LeadershipMember {
  name: string;
  role: string;
  organization: string;
  bio: string;
  imageUrl: string;
  specialization: string;
}

export const leadershipTeam: LeadershipMember[] = [
  {
    name: "Devendra Pratap Singh",
    role: "Founder & Chairman",
    organization: "Apex Global Sports & Entertainment",
    bio: "Pioneering entrepreneur and sports visionary dedicated to elevating combat sports with premier athlete safety, disciplined athletic development, and international platforms for elite talent.",
    imageUrl: "/assets/images/team-founder.jpg",
    specialization: "Strategic Vision & Global Promotion"
  },
  {
    name: "Poorvi Khurana",
    role: "Executive Operations Manager",
    organization: "Apex Combat Championship",
    bio: "Driving international event logistics, athlete relations, venue partnerships, and broadcasting coordination across global Apex fight night spectacles.",
    imageUrl: "/assets/images/team-poorvi.jpg",
    specialization: "Operations, Athlete Relations & Production"
  },
  {
    name: "Aditya Sharma",
    role: "Head of IT & Digital Infrastructure",
    organization: "Apex Combat Championship",
    bio: "Leading digital transformation, streaming technology, fighter telemetry, interactive fan experiences, and enterprise IT infrastructure for Apex worldwide.",
    imageUrl: "/assets/images/team-aditya.jpg",
    specialization: "Digital Platforms & Technical Infrastructure"
  }
];

export interface Sponsor {
  name: string;
  category: string;
  badge: string;
  description: string;
  logoId: string;
}

export const sponsors: Sponsor[] = [
  {
    name: "Titan Athletic Labs",
    category: "Presenting Partner",
    badge: "Official Health & Performance",
    description: "Pioneering athletic longevity, recovery biotechnology, and performance health.",
    logoId: "sponsor-1"
  },
  {
    name: "Venum Combat Pro",
    category: "Official Apparel",
    badge: "Cage Gear & Fight Wear",
    description: "Engineered equipment and performance gear for elite professional combat athletes.",
    logoId: "sponsor-2"
  },
  {
    name: "Monster Energy",
    category: "Official Energy Partner",
    badge: "Fueling Champions",
    description: "Global energy drink fueling extreme athletic competition and adrenaline worldwide.",
    logoId: "sponsor-3"
  },
  {
    name: "Hayabusa Fight",
    category: "Official Glove Provider",
    badge: "4oz Pro MMA Gloves",
    description: "Scientifically tested hand protection and industry-standard competition gloves.",
    logoId: "sponsor-4"
  },
  {
    name: "Everlast Pro Boxing",
    category: "Official Striking Partner",
    badge: "Heavy Bags & Protective",
    description: "Over a century of legacy in boxing excellence, authentic championship caliber.",
    logoId: "sponsor-5"
  }
];

export const faqItems = [
  {
    question: "How can fighters apply to join Apex Combat Championship (ACC)?",
    answer: "Athletes with documented professional combat records can submit an application via our 'Join the Ranks' portal. Our matchmaking committee reviews footage, sanctioned fight history, medicals, and athletic background."
  },
  {
    question: "What ruleset governs Apex bouts?",
    answer: "Apex operates under Unified Rules of Mixed Martial Arts for MMA bouts and recognized international sanctioning bodies for Professional Boxing, Kickboxing, and Submission Grappling, with strict drug testing and medical screenings."
  },
  {
    question: "Where can fans purchase tickets for upcoming fight nights?",
    answer: "Tickets are available through our Events portal and partner venue box offices (AXS, Ticketmaster, T-Mobile Arena). VIP Cage-side hospitality packages include weigh-in access and fighter meet-and-greets."
  },
  {
    question: "How can international brands partner or sponsor Apex?",
    answer: "Brands can connect with our executive commercial team via our Contact page. We offer in-cage canvas branding, global broadcast graphics, digital sponsor activations, and athlete endorsement integration."
  }
];
