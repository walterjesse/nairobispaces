-- =====================================================================
-- Nairobi Spaces — Seed Data
-- Run AFTER 001_schema.sql.
-- Idempotent: re-running updates existing rows (keyed by slug).
-- Mirrors src/data/listings.ts + src/data/neighborhoods.ts
-- =====================================================================

-- ---------- NEIGHBORHOODS ----------
INSERT INTO neighborhoods (slug, name, tagline, vibe, best_for, know_before, cover, seo_intro)
VALUES
(
  'westlands',
  'Westlands',
  'Nightlife, restaurants, tech.',
  'High-rise, fast-paced, social. Where Nairobi''s nights happen.',
  ARRAY['Business travelers','Couples','Content creators'],
  ARRAY[
    'Friday and Saturday nights are loud near Westlands Square — book higher floors.',
    '20–35 minutes from JKIA depending on traffic.',
    'Sarit Centre and The Alchemist are 5–10 minutes away.'
  ],
  'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1400&q=70',
  'Looking for a short stay in Westlands, Nairobi? Westlands is the city''s most popular neighborhood for business and social travelers — a dense, high-rise district full of restaurants, rooftop bars, and modern apartments. Most of our verified Westlands stays are within walking distance of Sarit Centre and Westlands Square.'
),
(
  'kilimani',
  'Kilimani',
  'Central, leafy, easy to live in.',
  'Residential and walkable, with cafés on every corner.',
  ARRAY['Families','Long stays','Diaspora visits'],
  ARRAY[
    'Yaya Centre and Junction Mall are nearby.',
    'Quieter than Westlands but still very central.',
    'Best value for 2–3 bedroom apartments.'
  ],
  'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1400&q=70',
  'Kilimani short stays are perfect for travelers who want to live like a local in Nairobi. The neighborhood is residential, leafy, and walkable, with great cafés, supermarkets, and easy access to both Westlands and the CBD.'
),
(
  'lavington',
  'Lavington',
  'Quiet, gated, family-friendly.',
  'Slow-paced, secure, and green. Big trees and bigger gardens.',
  ARRAY['Families','Executives','Long stays'],
  ARRAY[
    'Most properties are inside gated compounds with 24/7 security.',
    'Best paired with a car or rideshare for evenings out.',
    'Lavington Mall covers most daily needs.'
  ],
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=70',
  'Lavington is one of Nairobi''s most established residential neighborhoods — leafy, secure, and ideal for families or executives looking for a quieter stay within 15 minutes of the city''s commercial centers.'
),
(
  'karen',
  'Karen',
  'Forest, horses, slow weekends.',
  'Low-rise, suburban, romantic. Nairobi''s countryside escape.',
  ARRAY['Couples','Nature lovers','Honeymoons'],
  ARRAY[
    'About 25–40 minutes from the CBD.',
    'Close to Karen Blixen Museum, Giraffe Centre, and Nairobi National Park.',
    'Best with a car or arranged transport.'
  ],
  'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1400&q=70',
  'Karen is the leafy, low-rise edge of Nairobi — wide streets, big gardens, and easy access to the Nairobi National Park. Stays here feel like a countryside weekend without leaving the city.'
),
(
  'cbd',
  'CBD',
  'In the middle of everything.',
  'Busy, central, transactional. Best for short midweek trips.',
  ARRAY['Solo','Business','Budget'],
  ARRAY[
    'Best for daytime business stays.',
    'Walk to KICC, government offices, and major banks.',
    'Pick buildings with backup power and a working lift.'
  ],
  'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=1400&q=70',
  'Short stays in Nairobi CBD work well for solo business travelers who want to walk to meetings. We only list buildings with reliable backup power, security, and a working lift.'
),
(
  'riverside',
  'Riverside',
  'Diplomatic, quiet, premium.',
  'Embassies, executives, and clean modern towers.',
  ARRAY['Executives','Special occasions','Couples'],
  ARRAY[
    'Excellent 24/7 security across most buildings.',
    '5 minutes to Westlands by car.',
    'Premium pricing, premium experience.'
  ],
  'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1400&q=70',
  'Riverside Drive is one of Nairobi''s most premium short-stay corridors — quiet, secure, and home to embassies and executive towers. Most of our Riverside stays come with concierge and rooftop amenities.'
)
ON CONFLICT (slug) DO UPDATE SET
  name        = EXCLUDED.name,
  tagline     = EXCLUDED.tagline,
  vibe        = EXCLUDED.vibe,
  best_for    = EXCLUDED.best_for,
  know_before = EXCLUDED.know_before,
  cover       = EXCLUDED.cover,
  seo_intro   = EXCLUDED.seo_intro,
  updated_at  = NOW();

-- ---------- LISTINGS ----------
INSERT INTO listings (
  slug, title, neighborhood, price_per_night,
  bedrooms, beds, baths, max_guests,
  perfect_for, amenities, cover, gallery,
  short_pitch, description, area_notes, rules, check_in,
  rating, reviews, verified
) VALUES
(
  'westlands-skyline-loft',
  'Skyline Loft, Westlands',
  'Westlands',
  9500,
  1, 1, 1, 2,
  ARRAY['Couples','Business','Content creators'],
  ARRAY['Fast Wi-Fi','Backup power','Workspace','Gym','Pool','Secure parking'],
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70',
  ARRAY[
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=70'
  ],
  'Floor-to-ceiling windows, espresso machine, sunset views over Westlands.',
  'A calm, high-floor loft minutes from Sarit and The Alchemist. Designed for solo travelers and couples who want quiet, fast Wi-Fi, and a real workspace — not a hotel desk.',
  'Westlands is Nairobi''s nightlife and tech hub. 20 min to JKIA off-peak, 5 min to Sarit Centre, walking distance to top restaurants.',
  ARRAY['No parties or events','No smoking indoors','Quiet hours after 10pm','Visitors registered at gate'],
  'Self check-in from 2pm with a unique code. Host on WhatsApp 24/7.',
  4.94, 128, TRUE
),
(
  'kilimani-garden-two-bed',
  'Garden Two-Bed, Kilimani',
  'Kilimani',
  13500,
  2, 3, 2, 4,
  ARRAY['Families','Friends','Long stays'],
  ARRAY['Fast Wi-Fi','Backup water + power','Full kitchen','Washer','Pool','Kids friendly'],
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=70',
  ARRAY[
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=1200&q=70'
  ],
  'Wood, glass, and forest. A slow weekend 25 minutes from town.',
  'A two-bedroom cottage tucked into the trees in Karen. Big windows, a fireplace, and birdsong instead of traffic. Ideal for honeymooners and writers.',
  'Karen is leafy, low-rise, and close to Karen Blixen Museum, Giraffe Centre, and the Nairobi National Park gate.',
  ARRAY['No parties','Pets on request','Quiet hours after 9pm'],
  'Personal welcome. Firewood and breakfast basket included on first night.',
  4.96, 52, TRUE
),
(
  'riverside-penthouse',
  'Riverside Penthouse',
  'Riverside',
  28000,
  3, 4, 3, 6,
  ARRAY['Executives','Special occasions','Content creators'],
  ARRAY['Rooftop','Pool','Gym','Backup power','Fast Wi-Fi','Concierge'],
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=70',
  ARRAY[
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=70'
  ],
  'Top-floor views, private rooftop, concierge on call. Built for impressions.',
  'A three-bedroom penthouse with a wraparound terrace and skyline views. Designed for execs hosting clients and creators shooting in-apartment content.',
  'Riverside Drive — diplomatic, quiet, and 5 minutes to Westlands. Excellent security and dining.',
  ARRAY['No events without approval','ID required','Quiet hours after 10pm'],
  'Concierge welcome. Airport pickup available on request.',
  4.92, 33, TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  title           = EXCLUDED.title,
  neighborhood    = EXCLUDED.neighborhood,
  price_per_night = EXCLUDED.price_per_night,
  bedrooms        = EXCLUDED.bedrooms,
  beds            = EXCLUDED.beds,
  baths           = EXCLUDED.baths,
  max_guests      = EXCLUDED.max_guests,
  perfect_for     = EXCLUDED.perfect_for,
  amenities       = EXCLUDED.amenities,
  cover           = EXCLUDED.cover,
  gallery         = EXCLUDED.gallery,
  short_pitch     = EXCLUDED.short_pitch,
  description     = EXCLUDED.description,
  area_notes      = EXCLUDED.area_notes,
  rules           = EXCLUDED.rules,
  check_in        = EXCLUDED.check_in,
  rating          = EXCLUDED.rating,
  reviews         = EXCLUDED.reviews,
  verified        = EXCLUDED.verified,
  updated_at      = NOW();

-- ---------- Sanity checks ----------
-- SELECT COUNT(*) AS listing_count FROM listings;       -- expect 3
-- SELECT COUNT(*) AS neighborhood_count FROM neighborhoods; -- expect 6
