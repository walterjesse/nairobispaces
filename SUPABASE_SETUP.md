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

## 4. Create Database Tables & Seed Mock Data

SQL migrations are committed to the repo under `supabase/migrations/`.

### 4a. Schema

1. Open the Supabase SQL Editor → New query.
2. Paste the **entire contents** of `supabase/migrations/001_schema.sql` and run.
   This creates the `listings`, `neighborhoods`, and `admin_users` tables plus
   Row-Level Security policies (public read, admin write).

### 4b. Seed with the mock data

1. New query → paste the contents of `supabase/migrations/002_seed.sql` and run.
2. This inserts the 6 neighborhood guides and 3 sample listings used by the UI
   fallback (Westlands, Kilimani, Riverside, etc.). The script uses
   `ON CONFLICT (slug) DO UPDATE`, so it is **idempotent** — safe to re-run to
   refresh records after tweaking the seed file.

Verify with:

```sql
SELECT COUNT(*) FROM listings;        -- expect 3
SELECT COUNT(*) FROM neighborhoods;   -- expect 6
```

### 4c. Alternative: seed from Node

If you prefer to keep data synced from the TypeScript source, run:

```bash
# one-off install (dev only)
npm install --save-dev dotenv tsx

# requires .env.local with VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
npx tsx scripts/seed-supabase.ts
```

> ⚠️ The Node seeder requires the **service role key** (not the anon key) since
> the tables are RLS-protected. Never commit the service role key.

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
