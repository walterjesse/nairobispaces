import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

/**
 * Singleton Supabase client.
 * Stored on globalThis so that HMR reloads (and any stray duplicate imports)
 * don't spin up multiple GoTrueClient instances on the same storage key.
 */
const globalForSupabase = globalThis as unknown as {
  __nairobiSpacesSupabase?: SupabaseClient | null;
};

export const supabase: SupabaseClient | null =
  globalForSupabase.__nairobiSpacesSupabase ??
  (globalForSupabase.__nairobiSpacesSupabase =
    supabaseUrl && supabaseKey
      ? createClient(supabaseUrl, supabaseKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            storageKey: 'sb-nairobi-spaces-auth',
          },
        })
      : null);

export type DatabaseListing = {
  id: string;
  slug: string;
  title: string;
  neighborhood: string;
  price_per_night: number;
  bedrooms: number;
  beds: number;
  baths: number;
  max_guests: number;
  perfect_for: string[];
  amenities: string[];
  cover: string;
  gallery: string[];
  video_poster?: string;
  short_pitch: string;
  description: string;
  area_notes: string;
  rules: string[];
  check_in: string;
  rating: number;
  reviews: number;
  verified: boolean;
  created_at?: string;
  updated_at?: string;
};

export type AdminUser = {
  id: string;
  email: string;
  user_id: string;
  created_at: string;
};

/**
 * Normalize a listing record from Supabase (snake_case) into the camelCase
 * shape the UI expects. If the input is already in camelCase (e.g. from the
 * local fallback data), it is returned as-is (with both casings available).
 */
export function normalizeListing(l: any) {
  if (!l || typeof l !== 'object') return l;
  return {
    ...l,
    slug: l.slug,
    title: l.title,
    neighborhood: l.neighborhood,
    pricePerNight: l.pricePerNight ?? l.price_per_night ?? 0,
    price_per_night: l.price_per_night ?? l.pricePerNight ?? 0,
    bedrooms: l.bedrooms ?? 0,
    beds: l.beds ?? 0,
    baths: l.baths ?? 0,
    maxGuests: l.maxGuests ?? l.max_guests ?? 0,
    max_guests: l.max_guests ?? l.maxGuests ?? 0,
    perfectFor: l.perfectFor ?? l.perfect_for ?? [],
    perfect_for: l.perfect_for ?? l.perfectFor ?? [],
    amenities: l.amenities ?? [],
    cover: l.cover ?? '',
    gallery: l.gallery ?? [],
    videoPoster: l.videoPoster ?? l.video_poster,
    video_poster: l.video_poster ?? l.videoPoster,
    shortPitch: l.shortPitch ?? l.short_pitch ?? '',
    short_pitch: l.short_pitch ?? l.shortPitch ?? '',
    description: l.description ?? '',
    areaNotes: l.areaNotes ?? l.area_notes ?? '',
    area_notes: l.area_notes ?? l.areaNotes ?? '',
    rules: l.rules ?? [],
    checkIn: l.checkIn ?? l.check_in ?? '',
    check_in: l.check_in ?? l.checkIn ?? '',
    rating: typeof l.rating === 'number' ? l.rating : 0,
    reviews: typeof l.reviews === 'number' ? l.reviews : 0,
    verified: !!l.verified,
  };
}

export function normalizeListings(arr: any[] | null | undefined) {
  if (!Array.isArray(arr)) return [];
  return arr.map(normalizeListing);
}

/**
 * Normalize a neighborhood record. Matches the shape used by the local
 * GUIDES fallback (slug, name, tagline, vibe, bestFor, knowBefore, cover,
 * seoIntro) while tolerating snake_case coming from Supabase.
 */
export function normalizeNeighborhood(n: any) {
  if (!n || typeof n !== 'object') return n;
  return {
    ...n,
    slug: n.slug,
    name: n.name,
    tagline: n.tagline ?? '',
    vibe: n.vibe ?? '',
    bestFor: n.bestFor ?? n.best_for ?? [],
    knowBefore: n.knowBefore ?? n.know_before ?? [],
    cover: n.cover ?? '',
    seoIntro: n.seoIntro ?? n.seo_intro ?? '',
  };
}
