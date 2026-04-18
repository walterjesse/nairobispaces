import { Link } from "../router";
import { GUIDES } from "../data/neighborhoods";
import { LISTINGS } from "../data/listings";
import { fmtKES, waLink, BRAND } from "../data/site";
import { WaIcon } from "../components/Layout";

export function NeighborhoodsIndex() {
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
        {GUIDES.map((g) => (
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
  const g = GUIDES.find((x) => x.slug === slug.toLowerCase());
  if (!g) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">Guide not found.</h1>
        <Link to="/neighborhoods" className="mt-4 inline-block underline">All guides</Link>
      </main>
    );
  }
  const inHere = LISTINGS.filter((l) => l.neighborhood.toLowerCase() === g.name.toLowerCase());
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={g.cover} alt={`${g.name} skyline`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink/80" />
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-24 text-cream">
          <div className="text-[11px] uppercase tracking-[0.18em] text-cream/80">Neighborhood guide</div>
          <h1 className="mt-2 font-serif text-5xl sm:text-6xl leading-[1.05]">{g.name}</h1>
          <p className="mt-3 max-w-xl text-cream/85">{g.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-2xl">The vibe</h2>
            <p className="mt-2 text-ink-2 leading-relaxed">{g.vibe}</p>
            <p className="mt-3 text-ink-2 leading-relaxed">{g.seoIntro}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">Best for</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.bestFor.map((b) => (
                <span key={b} className="px-3 py-1 rounded-full bg-cream-2 border border-line text-sm">{b}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-serif text-2xl">Know before you go</h2>
            <ul className="mt-3 space-y-2 text-ink-2">
              {g.knowBefore.map((k) => (
                <li key={k} className="flex items-start gap-2"><span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" />{k}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="rounded-3xl border border-line p-6 bg-cream-2/40 h-fit">
          <div className="font-serif text-xl">Not sure yet?</div>
          <p className="mt-2 text-sm text-ink-2">Send us your dates and budget — we'll narrow it down to 2–3 picks in {g.name}.</p>
          <a
            href={waLink(`Hi ${BRAND}! I'm looking at staying in ${g.name}. Can you suggest something?`)}
            target="_blank" rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-whatsapp)] text-white text-sm font-medium"
          >
            <WaIcon className="size-4" /> Ask on WhatsApp
          </a>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 mt-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl">Stays in {g.name}</h2>
          <Link to="/stays" className="text-sm underline underline-offset-4">All stays →</Link>
        </div>
        {inHere.length === 0 ? (
          <p className="mt-4 text-ink-2">Nothing live in {g.name} this week — DM us for off‑menu options.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inHere.map((l) => (
              <Link key={l.slug} to={`/stays/${l.slug}`} className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={l.cover} alt={l.title} className="w-full h-full object-cover transition group-hover:scale-105 duration-700" />
                </div>
                <div className="mt-3 font-serif text-xl">{l.title}</div>
                <div className="text-sm text-mute">{fmtKES(l.pricePerNight)} / night</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
