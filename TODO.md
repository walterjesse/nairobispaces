# Nairobi Spaces — Fix & Deploy Checklist

## ✅ Console Errors Fixed
- [x] `fmtKES`/`fmtUSD` accept `number | null | undefined` (src/data/site.ts)
- [x] Supabase singleton via `globalThis` to prevent duplicate GoTrueClient warnings (src/lib/supabase.ts)
- [x] Unique `storageKey: 'sb-nairobi-spaces-auth'` to scope the session store
- [x] `normalizeListing` / `normalizeListings` / `normalizeNeighborhood` helpers map snake_case ↔ camelCase
- [x] All pages fall back to local `LISTINGS` / `GUIDES` when Supabase not configured or returns empty
- [x] Switched `.single()` → `.maybeSingle()` on Neighborhood/Listing detail pages (removes 406 errors)
- [x] Fixed stale-closure bug in Stays.tsx filter extraction
- [x] Defensive fallbacks: `Array.isArray(...)`, `?? 0`, `?? []` everywhere a field could be missing

## ✅ Supabase Migration & Seed
- [x] `supabase/migrations/001_schema.sql` — listings, neighborhoods, admin_users + RLS policies
- [x] `supabase/migrations/002_seed.sql` — 6 neighborhoods + 3 listings, idempotent upserts
- [x] `scripts/seed-supabase.ts` + `npm run seed` (requires SUPABASE_SERVICE_ROLE_KEY)
- [x] SUPABASE_SETUP.md updated with run instructions
- [ ] Flagged: `kilimani-garden-two-bed` mock data has Karen-themed description/area_notes while neighborhood="Kilimani" — pre-existing inconsistency, not fixed

## ✅ GitHub Deployment
- [x] Pushed main branch to https://github.com/walterjesse/nairobispaces
- [x] `.github/workflows/deploy.yml` — GitHub Actions build + Pages deploy
- [x] `gh-pages` branch deployed cleanly (index.html, 404.html, assets/, images/)
- [x] `vite.config.ts` base correctly set to `/nairobispaces/`

## ⚠️ USER ACTIONS REQUIRED

### 1. Enable GitHub Pages
Go to: https://github.com/walterjesse/nairobispaces/settings/pages
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` → `/ (root)`
- Save. Live URL: https://walterjesse.github.io/nairobispaces/ (takes 1–2 min first time)

### 2. 🔐 ROTATE SUPABASE CREDENTIALS (IMPORTANT)
An earlier deploy attempt briefly pushed `.env.local` to the `gh-pages` branch on GitHub (now overwritten, but it may remain in git history). Rotate the anon key as a precaution:
- Supabase Dashboard → Project Settings → API → Reset anon key
- Update `.env.local` locally
- Add new key as GitHub Secret `VITE_SUPABASE_ANON_KEY` (Settings → Secrets → Actions) if using the Actions workflow

### 3. (Optional) Seed Database
```powershell
# Install seeder deps once
npm i -D tsx dotenv

# Add SUPABASE_SERVICE_ROLE_KEY to .env.local, then:
npm run seed
```

Or paste `supabase/migrations/001_schema.sql` then `002_seed.sql` into Supabase SQL Editor.
