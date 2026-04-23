# Nairobi Spaces — Bug Fixes TODO

Root-cause summary of errors from browser console:
1. `fmtKES` crashed on `undefined` → `toLocaleString` TypeError inside `<Hero>`.
2. Supabase returned `price_per_night` (snake_case) but UI reads `pricePerNight`
   (camelCase) → always undefined → triggers #1.
3. `.single()` on a missing neighborhood row returns HTTP 406.
4. Multiple `GoTrueClient` instances warning from duplicate client creation.
5. Stale-closure bug in `Stays.tsx` — filter options built from empty `listings`
   state because the code referenced `listings` instead of the freshly-loaded data.

## Steps

- [x] 1. Harden `src/data/site.ts` — `fmtKES` / `fmtUSD` tolerate `null`/`undefined`/non-finite.
- [x] 2. Rewrite `src/lib/supabase.ts` — singleton client via `globalThis`, custom
      `storageKey`, plus `normalizeListing` / `normalizeListings` /
      `normalizeNeighborhood` helpers that map snake_case ↔ camelCase.
- [x] 3. `src/pages/Home.tsx` — normalize listings on load, guard empty data.
- [x] 4. `src/pages/Stays.tsx` — fix stale closure (use `loaded` local var),
      normalize data, support both `pricePerNight` and `price_per_night` in
      filters, make `maxPrice` always apply.
- [x] 5. `src/pages/Listing.tsx` — switch to `.maybeSingle()`, normalize,
      defensive field access with camel/snake fallbacks and array guards.
- [x] 6. `src/pages/Neighborhoods.tsx` — `.maybeSingle()`, normalize, graceful
      fallback when Supabase row missing, safe min-price calc.
- [x] 7. Smoke test: `npm run dev` — dev server is up on http://localhost:5175/nairobispaces/

## Database seeding (added per follow-up request)

- [x] 8. `supabase/migrations/001_schema.sql` — `CREATE TABLE IF NOT EXISTS` for
      `listings`, `neighborhoods` (new), `admin_users`; RLS policies (public
      read, admin write); indexes on `slug` + `neighborhood`.
- [x] 9. `supabase/migrations/002_seed.sql` — Idempotent
      `INSERT … ON CONFLICT (slug) DO UPDATE` for the 6 neighborhood guides
      and 3 sample listings used as the UI fallback.
- [x] 10. `scripts/seed-supabase.ts` + `npm run seed` — Optional Node seeder
       (uses service-role key) for keeping Supabase in sync with the TS source.
- [x] 11. `SUPABASE_SETUP.md` — Documented how to apply the migrations and run
       the Node seeder.

> ⚠️ Note for follow-up: the local mock listing `kilimani-garden-two-bed`
> carries `neighborhood: "Kilimani"` but its `description` / `area_notes`
> reference Karen. The seed faithfully copies the existing data — flag if it
> should be corrected.
