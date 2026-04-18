import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

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
