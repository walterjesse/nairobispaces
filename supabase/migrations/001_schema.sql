-- =====================================================================
-- Nairobi Spaces — Database Schema
-- Run this file FIRST in the Supabase SQL Editor.
-- Then run 002_seed.sql to populate the mock data.
-- Safe to re-run: uses IF NOT EXISTS and DROP POLICY IF EXISTS.
-- =====================================================================

-- ---------- Listings ----------
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  price_per_night INTEGER NOT NULL DEFAULT 0,
  bedrooms INTEGER DEFAULT 1,
  beds INTEGER DEFAULT 1,
  baths INTEGER DEFAULT 1,
  max_guests INTEGER DEFAULT 2,
  perfect_for TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  cover TEXT,
  gallery TEXT[] DEFAULT '{}',
  video_poster TEXT,
  short_pitch TEXT,
  description TEXT,
  area_notes TEXT,
  rules TEXT[] DEFAULT '{}',
  check_in TEXT,
  rating NUMERIC DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------- Neighborhoods ----------
CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  vibe TEXT,
  best_for TEXT[] DEFAULT '{}',
  know_before TEXT[] DEFAULT '{}',
  cover TEXT,
  seo_intro TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------- Admin users ----------
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- Row Level Security
-- =====================================================================

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Listings: public read, admin write
DROP POLICY IF EXISTS "Listings are viewable by everyone" ON listings;
CREATE POLICY "Listings are viewable by everyone"
  ON listings FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Only admins can modify listings" ON listings;
CREATE POLICY "Only admins can modify listings"
  ON listings FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Neighborhoods: public read, admin write
DROP POLICY IF EXISTS "Neighborhoods are viewable by everyone" ON neighborhoods;
CREATE POLICY "Neighborhoods are viewable by everyone"
  ON neighborhoods FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Only admins can modify neighborhoods" ON neighborhoods;
CREATE POLICY "Only admins can modify neighborhoods"
  ON neighborhoods FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Admin users: only admins can read
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
CREATE POLICY "Admins can view admin_users"
  ON admin_users FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- =====================================================================
-- Helpful indexes
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_listings_neighborhood ON listings (neighborhood);
CREATE INDEX IF NOT EXISTS idx_listings_slug ON listings (slug);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_slug ON neighborhoods (slug);
