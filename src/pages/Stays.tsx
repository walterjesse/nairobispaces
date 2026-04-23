import { useEffect, useMemo, useState } from "react";
import { Link } from "../router";
import { LISTINGS } from "../data/listings";
import { fmtKES, fmtUSD } from "../data/site";
import { normalizeListings } from "../lib/supabase";

function ListingCard({ listing }: { listing: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(false);
  const images = [listing.cover, ...(listing.gallery || [])].filter(Boolean);

  useEffect(() => {
    if (!active || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [active, images.length]);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-2"
         onMouseEnter={() => setActive(true)}
         onMouseLeave={() => { setActive(false); setCurrentIndex(0); }}>
      <img
        src={images[currentIndex] || listing.cover}
        alt={`${listing.title} — ${listing.shortPitch}`}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
      />
      {listing.verified && (
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-cream/90 text-ink px-2 py-1 rounded-full transition-opacity duration-300">
          ✓ Verified
        </span>
      )}
      <span className="absolute top-3 right-3 text-[11px] bg-ink/70 text-cream px-2 py-1 rounded-full transition-opacity duration-300">
        ★ {listing.rating}
      </span>
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-cream scale-125' : 'bg-cream/50 scale-100'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function StaysPage() {
  const [nbhd, setNbhd] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [beds, setBeds] = useState<number>(0); // 0 = any
  const [tag, setTag] = useState<string>("All");
  const [amenity, setAmenity] = useState<string>("All");
  const [open, setOpen] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>(["All"]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allAmenities, setAllAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState<"single" | "double" | "horizontal">("double");

  useEffect(() => {
    // Always use local mock data for now
    const loaded = normalizeListings(LISTINGS as any);
    setListings(loaded);
    setLoading(false);

    // Extract unique neighborhoods
    const uniqueNeighborhoods = [...new Set(loaded.map((l: any) => l.neighborhood).filter(Boolean))];
    setNeighborhoods(["All", ...uniqueNeighborhoods]);

    // Extract unique tags
    const uniqueTags = [...new Set(loaded.flatMap((l: any) => l.perfectFor || []))];
    setAllTags(["All", ...uniqueTags]);

    // Extract unique amenities
    const uniqueAmenities = [...new Set(loaded.flatMap((l: any) => l.amenities || []))];
    setAllAmenities(["All", ...uniqueAmenities]);
  }, []);

  const results = useMemo(() => {
    return listings.filter((l) => {
      if (nbhd !== "All" && l.neighborhood !== nbhd) return false;
      if (beds > 0 && (l.bedrooms || 0) < beds) return false;
      if (tag !== "All" && !(l.perfectFor || []).includes(tag)) return false;
      if (amenity !== "All" && !(l.amenities || []).includes(amenity)) return false;
      const price = l.pricePerNight ?? l.price_per_night ?? 0;
      if (price > maxPrice) return false;
      return true;
    });
  }, [listings, nbhd, beds, tag, amenity, maxPrice]);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-10 pb-16">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
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
              <Select label="Neighborhood" value={nbhd} onChange={setNbhd} options={neighborhoods} />
              <Select label="Bedrooms" value={String(beds)} onChange={(v) => setBeds(+v)} options={["0","1","2","3"]} display={{ "0": "Any", "1": "1+", "2": "2+", "3": "3+" }} />
              <Select label="Vibe" value={tag} onChange={setTag} options={allTags} />
              <Select label="Amenity" value={amenity} onChange={setAmenity} options={allAmenities} />
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs uppercase tracking-widest text-mute mb-2">Max / night</label>
                <input
                  type="range"
                  min={4000}
                  max={100000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                  className="w-full accent-[var(--color-ink)]"
                />
                <div className="text-sm text-ink-2 mt-1">{fmtKES(maxPrice)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-sm text-mute">
              <div>{results.length} stays</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => { setNbhd("All"); setMaxPrice(100000); setBeds(0); setTag("All"); setAmenity("All"); }}
                  className="underline underline-offset-4"
                >
                  Reset
                </button>
                <div className="flex items-center gap-1 border-l border-line pl-4">
                  <button
                    onClick={() => setGridView("single")}
                    className={`p-1.5 rounded ${gridView === "single" ? "bg-ink text-cream" : "hover:bg-cream-2"}`}
                    title="Single column"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z"/></svg>
                  </button>
                  <button
                    onClick={() => setGridView("double")}
                    className={`p-1.5 rounded ${gridView === "double" ? "bg-ink text-cream" : "hover:bg-cream-2"}`}
                    title="Double column"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2H5zM12 3a2 2 0 00-2 2v10a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2h-3z"/></svg>
                  </button>
                  <button
                    onClick={() => setGridView("horizontal")}
                    className={`p-1.5 rounded ${gridView === "horizontal" ? "bg-ink text-cream" : "hover:bg-cream-2"}`}
                    title="Horizontal cards"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h10a2 2 0 002-2v-2a2 2 0 00-2-2H5z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className={`mt-8 gap-6 ${gridView === "single" ? "grid grid-cols-1" : gridView === "double" ? "grid grid-cols-2" : "flex flex-col"}`}>
            {results.map((l) => (
              <Link key={l.slug} to={`/stays/${l.slug}`} className={`group block ${gridView === "horizontal" ? "flex gap-4" : ""}`}>
                {gridView === "horizontal" ? (
                  <>
                    <div className="w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
                      <img src={l.cover} alt={l.title} className="w-full h-full object-cover transition group-hover:scale-105 duration-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-widest text-mute">{l.neighborhood}</div>
                        <div className="text-xs text-mute">{l.bedrooms === 0 ? "Studio" : `${l.bedrooms} bed`}</div>
                      </div>
                      <div className="font-serif text-xl mt-0.5">{l.title}</div>
                      <div className="text-sm text-ink-2 line-clamp-1">{l.shortPitch}</div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">{fmtKES(l.pricePerNight ?? l.price_per_night ?? 0)}</span>
                        <span className="text-mute"> / night · ~{fmtUSD(l.pricePerNight ?? l.price_per_night ?? 0)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ListingCard listing={l} />
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-widest text-mute">{l.neighborhood}</div>
                        <div className="text-xs text-mute">{l.bedrooms === 0 ? "Studio" : `${l.bedrooms} bed`}</div>
                      </div>
                      <div className="font-serif text-xl mt-0.5">{l.title}</div>
                      <div className="text-sm text-ink-2 line-clamp-1">{l.shortPitch}</div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">{fmtKES(l.pricePerNight ?? l.price_per_night ?? 0)}</span>
                        <span className="text-mute"> / night · ~{fmtUSD(l.pricePerNight ?? l.price_per_night ?? 0)}</span>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
            {results.length === 0 && (
              <div className="col-span-full text-center py-16 text-ink-2">
                No stays match those filters yet. Reset, or DM us — we may have something off‑menu.
              </div>
            )}
          </div>
        </>
      )}
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
