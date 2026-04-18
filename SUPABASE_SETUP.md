# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Set project name: `nairobi-spaces`
5. Choose region (pick closest to your users - `us-east-1` for US, `eu-west-1` for Europe)
6. Click "Create new project"

## 2. Get API Keys

1. Go to Project Settings → API
2. Copy the following:
   - `Project URL` → Save as `VITE_SUPABASE_URL`
   - `anon public` key → Save as `VITE_SUPABASE_ANON_KEY`

## 3. Set Environment Variables Locally

Update `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Create Database Tables

Go to SQL Editor → New query, paste and run:

```sql
-- Listings table
CREATE TABLE listings (
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

-- Admin users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on listings
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read for everyone
CREATE POLICY "Listings are viewable by everyone"
  ON listings FOR SELECT USING (TRUE);

-- Policy: Allow write only for authenticated admins
CREATE POLICY "Only admins can modify listings"
  ON listings FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can read admin_users
CREATE POLICY "Admins can view admin_users"
  ON admin_users FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );
```

## 5. Create Admin User

1. Go to Authentication → Users
2. Click "Add user" → "Create new user"
3. Enter email and password for admin
4. Click "Create user"
5. Copy the user's UUID

6. Go to SQL Editor, run:
```sql
INSERT INTO admin_users (email, user_id)
VALUES ('admin@example.com', 'paste-uuid-here');
```

## 6. GitHub Secrets Setup

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key

## 7. Deploy

Push to main branch and GitHub Actions will deploy automatically:

```bash
git add .
git commit -m "Add admin functionality"
git push origin main
```

## Admin Access

After deployment:
1. Go to `https://yourusername.github.io/nairobi-spaces/#/admin-login`
2. Login with the admin email/password you created
3. Start managing listings!

## API Notes

The app uses hash-based routing (`/#/admin`) which works perfectly with static GitHub Pages hosting.
