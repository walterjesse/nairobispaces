export type NbhdGuide = {
  slug: string;
  name: string;
  tagline: string;
  vibe: string;
  bestFor: string[];
  knowBefore: string[];
  cover: string;
  seoIntro: string;
};

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const GUIDES: NbhdGuide[] = [
  {
    slug: "westlands",
    name: "Westlands",
    tagline: "Nightlife, restaurants, tech.",
    vibe: "High‑rise, fast‑paced, social. Where Nairobi's nights happen.",
    bestFor: ["Business travelers", "Couples", "Content creators"],
    knowBefore: [
      "Friday and Saturday nights are loud near Westlands Square — book higher floors.",
      "20–35 minutes from JKIA depending on traffic.",
      "Sarit Centre and The Alchemist are 5–10 minutes away.",
    ],
    cover: u("photo-1523805009345-7448845a9e53"),
    seoIntro:
      "Looking for a short stay in Westlands, Nairobi? Westlands is the city's most popular neighborhood for business and social travelers — a dense, high‑rise district full of restaurants, rooftop bars, and modern apartments. Most of our verified Westlands stays are within walking distance of Sarit Centre and Westlands Square.",
  },
  {
    slug: "kilimani",
    name: "Kilimani",
    tagline: "Central, leafy, easy to live in.",
    vibe: "Residential and walkable, with cafés on every corner.",
    bestFor: ["Families", "Long stays", "Diaspora visits"],
    knowBefore: [
      "Yaya Centre and Junction Mall are nearby.",
      "Quieter than Westlands but still very central.",
      "Best value for 2–3 bedroom apartments.",
    ],
    cover: u("photo-1572252009286-268acec5ca0a"),
    seoIntro:
      "Kilimani short stays are perfect for travelers who want to live like a local in Nairobi. The neighborhood is residential, leafy, and walkable, with great cafés, supermarkets, and easy access to both Westlands and the CBD.",
  },
  {
    slug: "lavington",
    name: "Lavington",
    tagline: "Quiet, gated, family‑friendly.",
    vibe: "Slow‑paced, secure, and green. Big trees and bigger gardens.",
    bestFor: ["Families", "Executives", "Long stays"],
    knowBefore: [
      "Most properties are inside gated compounds with 24/7 security.",
      "Best paired with a car or rideshare for evenings out.",
      "Lavington Mall covers most daily needs.",
    ],
    cover: u("photo-1600585154340-be6161a56a0c"),
    seoIntro:
      "Lavington is one of Nairobi's most established residential neighborhoods — leafy, secure, and ideal for families or executives looking for a quieter stay within 15 minutes of the city's commercial centers.",
  },
  {
    slug: "karen",
    name: "Karen",
    tagline: "Forest, horses, slow weekends.",
    vibe: "Low‑rise, suburban, romantic. Nairobi's countryside escape.",
    bestFor: ["Couples", "Nature lovers", "Honeymoons"],
    knowBefore: [
      "About 25–40 minutes from the CBD.",
      "Close to Karen Blixen Museum, Giraffe Centre, and Nairobi National Park.",
      "Best with a car or arranged transport.",
    ],
    cover: u("photo-1517824806704-9040b037703b"),
    seoIntro:
      "Karen is the leafy, low‑rise edge of Nairobi — wide streets, big gardens, and easy access to the Nairobi National Park. Stays here feel like a countryside weekend without leaving the city.",
  },
  {
    slug: "cbd",
    name: "CBD",
    tagline: "In the middle of everything.",
    vibe: "Busy, central, transactional. Best for short midweek trips.",
    bestFor: ["Solo", "Business", "Budget"],
    knowBefore: [
      "Best for daytime business stays.",
      "Walk to KICC, government offices, and major banks.",
      "Pick buildings with backup power and a working lift.",
    ],
    cover: u("photo-1517400508447-f8dd518b86db"),
    seoIntro:
      "Short stays in Nairobi CBD work well for solo business travelers who want to walk to meetings. We only list buildings with reliable backup power, security, and a working lift.",
  },
  {
    slug: "riverside",
    name: "Riverside",
    tagline: "Diplomatic, quiet, premium.",
    vibe: "Embassies, executives, and clean modern towers.",
    bestFor: ["Executives", "Special occasions", "Couples"],
    knowBefore: [
      "Excellent 24/7 security across most buildings.",
      "5 minutes to Westlands by car.",
      "Premium pricing, premium experience.",
    ],
    cover: u("photo-1600573472556-e636c2acda88"),
    seoIntro:
      "Riverside Drive is one of Nairobi's most premium short‑stay corridors — quiet, secure, and home to embassies and executive towers. Most of our Riverside stays come with concierge and rooftop amenities.",
  },
];
