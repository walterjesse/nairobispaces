/**
 * Seed Supabase with the mock data from src/data/*
 *
 * Usage:
 *   1. npm install --save-dev dotenv tsx
 *   2. Add to .env.local:
 *        VITE_SUPABASE_URL=https://xxx.supabase.co
 *        SUPABASE_SERVICE_ROLE_KEY=eyJ...   (NOT the anon key)
 *   3. npm run seed
 *
 * This is idempotent — re-running will UPDATE existing rows (matched by slug).
 *
 * ⚠️ The service role key bypasses Row-Level Security. Keep it server-side only.
 *    Never check it into source control or expose it to the browser.
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { LISTINGS } from '../src/data/listings';
import { GUIDES } from '../src/data/neighborhoods';

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    '❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local'
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function seedNeighborhoods() {
  console.log(`→ Upserting ${GUIDES.length} neighborhoods…`);
  const rows = GUIDES.map((g) => ({
    slug: g.slug,
    name: g.name,
    tagline: g.tagline,
    vibe: g.vibe,
    best_for: g.bestFor,
    know_before: g.knowBefore,
    cover: g.cover,
    seo_intro: g.seoIntro,
  }));

  const { error } = await supabase
    .from('neighborhoods')
    .upsert(rows, { onConflict: 'slug' });

  if (error) {
    console.error('  ✗ neighborhoods failed:', error.message);
    return false;
  }
  console.log(`  ✓ neighborhoods seeded (${rows.length})`);
  return true;
}

async function seedListings() {
  console.log(`→ Upserting ${LISTINGS.length} listings…`);
  const rows = LISTINGS.map((l) => ({
    slug: l.slug,
    title: l.title,
    neighborhood: l.neighborhood,
    price_per_night: l.pricePerNight,
    bedrooms: l.bedrooms,
    beds: l.beds,
    baths: l.baths,
    max_guests: l.maxGuests,
    perfect_for: l.perfectFor,
    amenities: l.amenities,
    cover: l.cover,
    gallery: l.gallery,
    video_poster: l.videoPoster ?? null,
    short_pitch: l.shortPitch,
    description: l.description,
    area_notes: l.areaNotes,
    rules: l.rules,
    check_in: l.checkIn,
    rating: l.rating,
    reviews: l.reviews,
    verified: l.verified,
  }));

  const { error } = await supabase
    .from('listings')
    .upsert(rows, { onConflict: 'slug' });

  if (error) {
    console.error('  ✗ listings failed:', error.message);
    return false;
  }
  console.log(`  ✓ listings seeded (${rows.length})`);
  return true;
}

async function main() {
  console.log(`🌱 Seeding Supabase at ${url}\n`);
  const okN = await seedNeighborhoods();
  const okL = await seedListings();

  if (okN && okL) {
    console.log('\n✅ Done. Verify in Supabase Table Editor.');
  } else {
    console.log(
      '\n⚠️  One or more tables failed. Make sure 001_schema.sql has been run first.'
    );
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
