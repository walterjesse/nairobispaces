export type Listing = {
  slug: string;
  title: string;
  neighborhood: string;
  pricePerNight: number; // KES
  bedrooms: number;
  beds: number;
  baths: number;
  maxGuests: number;
  perfectFor: string[]; // tags
  amenities: string[];
  cover: string;
  gallery: string[];
  videoPoster?: string;
  shortPitch: string;
  description: string;
  areaNotes: string;
  rules: string[];
  checkIn: string;
  rating: number;
  reviews: number;
  verified: boolean;
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const LISTINGS: Listing[] = [
  {
    slug: "westlands-skyline-loft",
    title: "Skyline Loft, Westlands",
    neighborhood: "Westlands",
    pricePerNight: 9500,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    maxGuests: 2,
    perfectFor: ["Couples", "Business", "Content creators"],
    amenities: ["Fast Wi‑Fi", "Backup power", "Workspace", "Gym", "Pool", "Secure parking"],
    cover: u("photo-1505693416388-ac5ce068fe85"),
    gallery: [
      u("photo-1505691938895-1758d7feb511"),
      u("photo-1522708323590-d24dbb6b0267"),
      u("photo-1560448204-e02f11c3d0e2"),
      u("photo-1493809842364-78817add7ffb"),
    ],
    shortPitch: "Floor‑to‑ceiling windows, espresso machine, sunset views over Westlands.",
    description:
      "A calm, high‑floor loft minutes from Sarit and The Alchemist. Designed for solo travelers and couples who want quiet, fast Wi‑Fi, and a real workspace — not a hotel desk.",
    areaNotes:
      "Westlands is Nairobi's nightlife and tech hub. 20 min to JKIA off‑peak, 5 min to Sarit Centre, walking distance to top restaurants.",
    rules: ["No parties or events", "No smoking indoors", "Quiet hours after 10pm", "Visitors registered at gate"],
    checkIn: "Self check‑in from 2pm with a unique code. Host on WhatsApp 24/7.",
    rating: 4.94,
    reviews: 128,
    verified: true,
  },
  {
    slug: "kilimani-garden-two-bed",
    title: "Garden Two‑Bed, Kilimani",
    neighborhood: "Kilimani",
    pricePerNight: 13500,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    maxGuests: 4,
    perfectFor: ["Families", "Friends", "Long stays"],
    amenities: ["Fast Wi‑Fi", "Backup water + power", "Full kitchen", "Washer", "Pool", "Kids friendly"],
    cover: u("photo-1502672260266-1c1ef2d93688"),
    gallery: [
      u("photo-1560185007-cde436f6a4d0"),
      u("photo-1556909114-f6e7ad7d3136"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600566753190-17f0baa2a6c3"),
    ],
    shortPitch: "Quiet leafy block, sunny balcony, full kitchen — feels like a home, not a hotel.",
    description:
      "Two bright bedrooms in a low‑rise block on a tree‑lined street. Ideal for diaspora families visiting for a week or longer. Stocked kitchen, washer, and a host who'll meet you at the gate.",
    areaNotes:
      "Kilimani is central, residential, and walkable. Yaya Centre, Junction Mall, and dozens of cafés are 5–10 minutes away.",
    rules: ["No parties or events", "Pets on request", "No smoking indoors"],
    checkIn: "Meet & greet at the gate. Flexible 1pm check‑in if available.",
    rating: 4.89,
    reviews: 87,
    verified: true,
  },
  {
    slug: "lavington-villa-suite",
    title: "Villa Suite, Lavington",
    neighborhood: "Lavington",
    pricePerNight: 22000,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    maxGuests: 6,
    perfectFor: ["Families", "Executives", "Special occasions"],
    amenities: ["Fast Wi‑Fi", "Backup power", "Chef on request", "Garden", "Pool", "24/7 security"],
    cover: u("photo-1613977257363-707ba9348227"),
    gallery: [
      u("photo-1582268611958-ebfd161ef9cf"),
      u("photo-1600210492486-724fe5c67fb0"),
      u("photo-1615874959474-d609969a20ed"),
      u("photo-1600607687939-ce8a6c25118c"),
    ],
    shortPitch: "Three bedrooms, private garden, optional chef. Quietly luxurious.",
    description:
      "A serene three‑bedroom suite in a gated Lavington compound. Wake up to birdsong, work from a real desk, and host friends in a garden lounge. Chef and airport pickup available.",
    areaNotes:
      "Lavington is leafy, secure, and 15 minutes from Westlands or Kilimani. Best for guests who value calm and space.",
    rules: ["No parties", "Children welcome", "No smoking indoors", "ID required at gate"],
    checkIn: "Personal welcome from the host. Tea on arrival.",
    rating: 4.97,
    reviews: 41,
    verified: true,
  },
  {
    slug: "cbd-design-studio",
    title: "Design Studio, CBD",
    neighborhood: "CBD",
    pricePerNight: 5800,
    bedrooms: 0,
    beds: 1,
    baths: 1,
    maxGuests: 2,
    perfectFor: ["Solo", "Budget", "Short trips"],
    amenities: ["Fast Wi‑Fi", "Backup power", "Workspace", "Lift", "24/7 security"],
    cover: u("photo-1554995207-c18c203602cb"),
    gallery: [
      u("photo-1522771739844-6a9f6d5f14af"),
      u("photo-1540518614846-7eded433c457"),
      u("photo-1505691723518-36a5ac3be353"),
      u("photo-1493809842364-78817add7ffb"),
    ],
    shortPitch: "Smart studio in the heart of town. Walk to meetings, KICC, and matatus.",
    description:
      "A compact, well‑designed studio for solo travelers and weekday business stays. Strong Wi‑Fi, blackout curtains, and a building with backup power and a lift.",
    areaNotes:
      "Right in Nairobi CBD — walking distance to government offices, banks, and Nation Centre. Best for short midweek trips.",
    rules: ["Solo or couple only", "No smoking", "No outside guests after 9pm"],
    checkIn: "Concierge check‑in from 3pm. Bags can be stored earlier.",
    rating: 4.81,
    reviews: 64,
    verified: true,
  },
  {
    slug: "karen-cottage",
    title: "Forest Cottage, Karen",
    neighborhood: "Karen",
    pricePerNight: 17500,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    maxGuests: 4,
    perfectFor: ["Couples", "Romantic", "Nature"],
    amenities: ["Fireplace", "Garden", "Fast Wi‑Fi", "Backup power", "Outdoor shower", "Secure parking"],
    cover: u("photo-1518780664697-55e3ad937233"),
    gallery: [
      u("photo-1505691938895-1758d7feb511"),
      u("photo-1600566752355-35792bedcfea"),
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1444065381814-865dc9da92c0"),
    ],
    shortPitch: "Wood, glass, and forest. A slow weekend 25 minutes from town.",
    description:
      "A two‑bedroom cottage tucked into the trees in Karen. Big windows, a fireplace, and birdsong instead of traffic. Ideal for honeymooners and writers.",
    areaNotes:
      "Karen is leafy, low‑rise, and close to Karen Blixen Museum, Giraffe Centre, and the Nairobi National Park gate.",
    rules: ["No parties", "Pets on request", "Quiet hours after 9pm"],
    checkIn: "Personal welcome. Firewood and breakfast basket included on first night.",
    rating: 4.96,
    reviews: 52,
    verified: true,
  },
  {
    slug: "riverside-penthouse",
    title: "Riverside Penthouse",
    neighborhood: "Riverside",
    pricePerNight: 28000,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    maxGuests: 6,
    perfectFor: ["Executives", "Special occasions", "Content creators"],
    amenities: ["Rooftop", "Pool", "Gym", "Backup power", "Fast Wi‑Fi", "Concierge"],
    cover: u("photo-1512917774080-9991f1c4c750"),
    gallery: [
      u("photo-1600596542815-ffad4c1539a9"),
      u("photo-1600573472556-e636c2acda88"),
      u("photo-1600210492493-0946911123ea"),
      u("photo-1582268611958-ebfd161ef9cf"),
    ],
    shortPitch: "Top‑floor views, private rooftop, concierge on call. Built for impressions.",
    description:
      "A three‑bedroom penthouse with a wraparound terrace and skyline views. Designed for execs hosting clients and creators shooting in‑apartment content.",
    areaNotes:
      "Riverside Drive — diplomatic, quiet, and 5 minutes to Westlands. Excellent security and dining.",
    rules: ["No events without approval", "ID required", "Quiet hours after 10pm"],
    checkIn: "Concierge welcome. Airport pickup available on request.",
    rating: 4.92,
    reviews: 33,
    verified: true,
  },
];

export const NEIGHBORHOODS = [
  "Westlands",
  "Kilimani",
  "Lavington",
  "Karen",
  "CBD",
  "Riverside",
] as const;

export const PERFECT_FOR_TAGS = [
  "Couples",
  "Families",
  "Business",
  "Solo",
  "Friends",
  "Long stays",
  "Content creators",
  "Romantic",
  "Special occasions",
  "Budget",
];

export const ALL_AMENITIES = [
  "Fast Wi‑Fi",
  "Backup power",
  "Pool",
  "Gym",
  "Workspace",
  "Full kitchen",
  "Secure parking",
  "Garden",
];
