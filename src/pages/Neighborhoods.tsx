import { Link } from "../router";
import { GUIDES } from "../data/neighborhoods";
import { LISTINGS } from "../data/listings";
import { fmtKES, waLink, BRAND } from "../data/site";
import { WaIcon } from "../components/Layout";
import { normalizeListings } from "../lib/supabase";
import { useState, useEffect } from "react";

export function NeighborhoodsIndex() {
  const [neighborhoods, setNeighborhoods] = useState<any[]>(GUIDES);

  useEffect(() => {
    // Always use local mock data for now
    setNeighborhoods(GUIDES);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-10 pb-16">
      <header className="max-w-2xl">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mute">Neighborhood guides</div>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl leading-[1.05]">
          Choose where, then where to sleep.
        </h1>
        <p className="mt-3 text-ink-2">
          Six honest guides to Nairobi's best short‑stay neighborhoods — written by locals, not bots.
        </p>
      </header>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((g) => (
          <Link key={g.slug} to={`/neighborhoods/${g.slug}`} className="group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={g.cover} alt={g.name} className="w-full h-full object-cover transition group-hover:scale-105 duration-700" />
            </div>
            <div className="mt-3 font-serif text-2xl">{g.name}</div>
            <div className="text-sm text-ink-2">{g.tagline}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export function NeighborhoodPage({ slug }: { slug: string }) {
  const [neighborhood, setNeighborhood] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    // Always use local mock data for now
    const normalizedSlug = slug.toLowerCase();
    const g = GUIDES.find((x) => x.slug === normalizedSlug) || null;
    setNeighborhood(g);

    if (!g) {
      setListings([]);
      return;
    }

    const list = normalizeListings(
      LISTINGS.filter((l) => l.neighborhood.toLowerCase() === g.name.toLowerCase())
    );
    setListings(list);
  }, [slug]);

  const g = neighborhood;
  const inHere = listings;

  if (!g) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">Guide not found.</h1>
        <Link to="/neighborhoods" className="mt-4 inline-block underline">All guides</Link>
      </main>
    );
  }

  const bestFor: string[] = Array.isArray(g.bestFor) ? (g.bestFor as string[]) : [];
  const knowBefore: string[] = Array.isArray(g.knowBefore) ? (g.knowBefore as string[]) : [];

  // Safe "from" price calculation — guards against undefined prices
  const prices = inHere
    .map((l: any) => l.pricePerNight ?? l.price_per_night)
    .filter((p: any) => typeof p === "number" && isFinite(p) && p > 0);
  const fromPrice = prices.length > 0 ? fmtKES(Math.min(...prices)) : "Contact";

  return (
    <main>
      {/* Breadcrumb Navigation */}
      <div className="bg-cream border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-ink-2">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="text-mute">/</span>
            <Link to="/neighborhoods" className="hover:text-gold transition-colors">Neighborhoods</Link>
            <span className="text-mute">/</span>
            <span className="text-ink font-medium">{g.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img src={g.cover} alt={`${g.name} skyline`} className="w-full h-full object-cover drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-32 text-cream relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 mb-6">
            <span className="size-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.18em] text-cream/90">Neighborhood guide</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
            {g.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl sm:text-2xl text-cream/90 leading-relaxed font-light">
            {g.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {bestFor.slice(0, 3).map((b) => (
              <span key={b} className="px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-sm font-medium text-gold">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mx-auto max-w-6xl px-5 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Stays available", value: inHere.length },
            { label: "Vibe", value: (g.vibe || "").split(',')[0] || "—" },
            { label: "Best for", value: bestFor[0] || "—" },
            { label: "From", value: fromPrice },
          ].map((stat, i) => (
            <div key={i} className="bg-cream rounded-2xl p-6 border border-line shadow-lg">
              <div className="text-xs uppercase tracking-widest text-mute mb-2">{stat.label}</div>
              <div className="font-serif text-2xl text-ink">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-5 mt-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Vibe Section */}
          <div className="bg-cream-2/30 rounded-3xl p-8 sm:p-10 border border-line">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✨</span>
              <h2 className="font-serif text-3xl">The vibe</h2>
            </div>
            <p className="text-lg text-ink-2 leading-relaxed">{g.vibe}</p>
            <p className="mt-4 text-ink-2 leading-relaxed">{g.seoIntro}</p>
          </div>

          {/* Best For Section */}
          <div>
            <h2 className="font-serif text-3xl mb-6">Perfect for</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {bestFor.map((b: string, i: number) => (
                <div key={b} className="flex items-center gap-4 p-4 rounded-2xl bg-cream border border-line hover:border-gold/50 transition-colors">
                  <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-serif text-lg">
                    {i + 1}
                  </div>
                  <span className="font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Know Before Section */}
          <div>
            <h2 className="font-serif text-3xl mb-6">Know before you go</h2>
            <div className="space-y-4">
              {knowBefore.map((k: string) => (
                <div key={k} className="flex items-start gap-4 p-5 rounded-2xl bg-cream-2/40 border border-line">
                  <div className="size-8 rounded-full bg-gold flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-cream text-sm font-medium">!</span>
                  </div>
                  <p className="text-ink-2 leading-relaxed">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-8 space-y-6">
            {/* CTA Card */}
            <div className="rounded-3xl bg-gradient-to-br from-gold to-gold-dark p-8 text-cream shadow-xl">
              <div className="font-serif text-2xl mb-3">Need help choosing?</div>
              <p className="text-cream/90 text-sm leading-relaxed mb-6">
                Send us your dates and budget — we'll narrow it down to 2–3 perfect picks in {g.name}.
              </p>
              <a
                href={waLink(`Hi ${BRAND}! I'm looking at staying in ${g.name}. Can you suggest something?`)}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream text-ink font-medium hover:bg-cream/90 transition-colors"
              >
                <WaIcon className="size-5" /> Chat on WhatsApp
              </a>
            </div>

            {/* Quick Links */}
            <div className="rounded-3xl border border-line p-6 bg-cream-2/40">
              <div className="font-serif text-lg mb-4">Quick links</div>
              <div className="space-y-3">
                <Link to="/stays" className="block text-sm text-ink-2 hover:text-gold transition-colors">
                  → Browse all stays
                </Link>
                <Link to="/quiz" className="block text-sm text-ink-2 hover:text-gold transition-colors">
                  → Find your perfect stay
                </Link>
                <Link to="/owners" className="block text-sm text-ink-2 hover:text-gold transition-colors">
                  → List your property
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Stays Section */}
      <section className="mx-auto max-w-6xl px-5 mt-24 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-4xl">Stays in {g.name}</h2>
            <p className="mt-2 text-ink-2">{inHere.length} verified properties available</p>
          </div>
          <Link to="/stays" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line hover:border-gold/50 transition-colors text-sm font-medium">
            View all stays →
          </Link>
        </div>
        {inHere.length === 0 ? (
          <div className="rounded-3xl border border-line p-12 text-center bg-cream-2/30">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="font-serif text-2xl mb-2">Nothing live this week</h3>
            <p className="text-ink-2 mb-6">DM us for off‑menu options in {g.name}.</p>
            <a
              href={waLink(`Hi ${BRAND}! I'm looking for a stay in ${g.name} but don't see any available.`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-cream text-sm font-medium"
            >
              <WaIcon className="size-4" /> Ask on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inHere.map((l: any) => (
              <Link key={l.slug} to={`/stays/${l.slug}`} className="group">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <img src={l.cover} alt={l.title} className="w-full h-full object-cover transition group-hover:scale-105 duration-700" />
                  {l.verified && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur-sm text-xs uppercase tracking-widest text-ink">
                      ✓ Verified
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent">
                    <div className="text-xs uppercase tracking-widest text-cream/80 mb-1">{l.neighborhood}</div>
                    <div className="font-serif text-xl text-cream">{l.title}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-gold font-medium">{fmtKES(l.pricePerNight ?? l.price_per_night ?? 0)}</span>
                      <span className="text-cream/70 text-sm">/ night</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
