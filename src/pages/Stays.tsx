import { useMemo, useState } from "react";
import { Link } from "../router";
import { LISTINGS, NEIGHBORHOODS, PERFECT_FOR_TAGS, ALL_AMENITIES } from "../data/listings";
import { fmtKES, fmtUSD } from "../data/site";

export function StaysPage() {
  const [nbhd, setNbhd] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [beds, setBeds] = useState<number>(0); // 0 = any
  const [tag, setTag] = useState<string>("All");
  const [amenity, setAmenity] = useState<string>("All");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    return LISTINGS.filter((l) => {
      if (nbhd !== "All" && l.neighborhood !== nbhd) return false;
      if (l.pricePerNight > maxPrice) return false;
      if (beds > 0 && l.bedrooms < beds) return false;
      if (tag !== "All" && !l.perfectFor.includes(tag)) return false;
      if (amenity !== "All" && !l.amenities.includes(amenity)) return false;
      return true;
    });
  }, [nbhd, maxPrice, beds, tag, amenity]);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-10 pb-16">
      <header className="max-w-2xl">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mute">All stays</div>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl leading-[1.05]">
          Every stay, personally vetted.
        </h1>
        <p className="mt-3 text-ink-2">
          Filter by neighborhood, price, beds, or vibe. Tap any stay for the full video tour and to book on WhatsApp.
        </p>
      </header>

      {/* Filters */}
      <div className="mt-8">
        <div className="flex items-center justify-between md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-cream-2 text-sm"
          >
            Filters {open ? "▴" : "▾"}
          </button>
          <div className="text-sm text-mute">{results.length} stays</div>
        </div>

        <div className={`${open ? "grid" : "hidden"} md:grid mt-4 grid-cols-2 md:grid-cols-5 gap-3 rounded-2xl border border-line bg-cream-2/60 p-4`}>
          <Select label="Neighborhood" value={nbhd} onChange={setNbhd} options={["All", ...NEIGHBORHOODS]} />
          <Select label="Bedrooms" value={String(beds)} onChange={(v) => setBeds(+v)} options={["0","1","2","3"]} display={{ "0": "Any", "1": "1+", "2": "2+", "3": "3+" }} />
          <Select label="Perfect for" value={tag} onChange={setTag} options={["All", ...PERFECT_FOR_TAGS]} />
          <Select label="Amenity" value={amenity} onChange={setAmenity} options={["All", ...ALL_AMENITIES]} />
          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs uppercase tracking-widest text-mute mb-2">Max / night</label>
            <input
              type="range"
              min={4000}
              max={30000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full accent-[var(--color-ink)]"
            />
            <div className="text-sm text-ink-2 mt-1">{fmtKES(maxPrice)}</div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between mt-3 text-sm text-mute">
          <div>{results.length} stays</div>
          <button
            onClick={() => { setNbhd("All"); setMaxPrice(30000); setBeds(0); setTag("All"); setAmenity("All"); }}
            className="underline underline-offset-4"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((l) => (
          <Link key={l.slug} to={`/stays/${l.slug}`} className="group block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-2">
              <img src={l.cover} alt={`${l.title} — ${l.shortPitch}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
              {l.verified && (
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-cream/90 text-ink px-2 py-1 rounded-full">
                  ✓ Verified
                </span>
              )}
              <span className="absolute top-3 right-3 text-[11px] bg-ink/70 text-cream px-2 py-1 rounded-full">
                ★ {l.rating}
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-mute">{l.neighborhood}</div>
                <div className="text-xs text-mute">{l.bedrooms === 0 ? "Studio" : `${l.bedrooms} bed`}</div>
              </div>
              <div className="font-serif text-xl mt-0.5">{l.title}</div>
              <div className="text-sm text-ink-2 line-clamp-1">{l.shortPitch}</div>
              <div className="mt-2 text-sm">
                <span className="font-medium">{fmtKES(l.pricePerNight)}</span>
                <span className="text-mute"> / night · ~{fmtUSD(l.pricePerNight)}</span>
              </div>
            </div>
          </Link>
        ))}
        {results.length === 0 && (
          <div className="col-span-full text-center py-16 text-ink-2">
            No stays match those filters yet. Reset, or DM us — we may have something off‑menu.
          </div>
        )}
      </div>
    </main>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  display,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  display?: Record<string, string>;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-mute mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-cream border border-line rounded-xl px-3 py-2.5 text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>{display?.[o] ?? o}</option>
        ))}
      </select>
    </label>
  );
}
