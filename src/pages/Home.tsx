import { useState, useEffect } from "react";
import { Link } from "../router";
import {
  BRAND,
  FOUNDER,
  fmtKES,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TIKTOK_URL,
  TIKTOK_HANDLE,
  PHONE_DISPLAY,
  PHONE_TEL,
  waLink,
} from "../data/site";
import { GUIDES } from "../data/neighborhoods";
import { LISTINGS, NEIGHBORHOODS } from "../data/listings";
import { WaIcon, IgIcon, TikTokIcon } from "../components/Layout";

function FeaturedListingCard({ listing, isHero = false }: { listing: any; isHero?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(false);
  const images = [listing?.cover, ...(listing?.gallery || [])].filter(Boolean);

  useEffect(() => {
    if (!active || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [active, images.length]);

  return (
    <div
      className={`relative ${isHero ? 'aspect-[4/5] sm:aspect-[16/10]' : 'aspect-[4/5] lg:aspect-[16/10]'} overflow-hidden rounded-3xl bg-cream-2`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => { setActive(false); setCurrentIndex(0); }}
    >
      <img
        src={images[currentIndex] || listing?.cover}
        alt={listing?.title}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.04]"
      />
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
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

export function HomePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]);

  useEffect(() => {
    setListings([...LISTINGS]);
    setNeighborhoods([...NEIGHBORHOODS]);
  }, []);

  return (
    <main className="overflow-x-clip">
      <Hero listings={listings} />
      <TrustMarquee />
      <FeaturedStays listings={listings} />
      <ParallaxQuote
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=75"
        eyebrow="Experience Nairobi"
        line={<>Every stay creates <span className="italic gold-text">unforgettable memories.</span></>}
        sub="From luxury apartments to cozy BnBs, discover the perfect Nairobi accommodation tailored to your needs."
      />
      <FounderBlock />
      <HowItWorks />
      <NeighborhoodsStrip neighborhoods={neighborhoods} />
      <Testimonials />
      <ParallaxQuote
        image="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=75"
        eyebrow="Discover Kenya's Capital"
        line={<>Nairobi from the <span className="italic gold-text">perfect perspective.</span></>}
        sub="Explore vibrant neighborhoods, stunning landscapes, and world-class hospitality. We find the ideal location for your journey."
        align="right"
      />
      <InstagramStrip />
      <OwnersBanner />
      <section id="inquire" className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
        <InquiryForm />
      </section>
    </main>
  );
}

/* ————————————————————— HERO ————————————————————— */

function Hero({ listings }: { listings: any[] }) {
  const stack = listings.slice(0, 2);
  if (stack.length === 0) return null;
  return (
    <section className="relative isolate bg-ink text-cream overflow-hidden grain">
      {/* Background image with rich layered gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=75"
          alt="A curated Nairobi apartment building lit warmly at twilight"
          className="w-full h-full object-cover drift opacity-[0.62]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Warm spotlight + deep vignette + bottom fade to ink */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,rgba(229,207,160,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(14,14,17,.55)_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink" />
      </div>

      {/* Top thin gold rule */}
      <div className="mx-auto max-w-6xl px-5 pt-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:pt-16 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7 rise reveal reveal-d1">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-cream/80 border border-cream/15 bg-cream/[0.04] backdrop-blur px-3 py-1.5 rounded-full">
            <span className="size-1.5 rounded-full bg-gold inline-block" />
            Premium Short-Stay Apartments in Nairobi
          </div>

          <h1 className="mt-6 font-serif font-light text-[40px] leading-[1.02] sm:text-[64px] lg:text-[78px] tracking-[-0.02em]">
            Your Perfect
            <br className="hidden sm:block" />{" "}
            <span className="italic font-normal">Nairobi</span>{" "}
            <span className="gold-text not-italic">Stay Awaits.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-cream/75 max-w-xl leading-relaxed">
            Discover handpicked vacation rentals, serviced apartments, and boutique BnBs in Nairobi's finest neighborhoods. Verified hosts, real video tours, and instant WhatsApp booking for your perfect stay.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={waLink(`Hi ${BRAND}! I saw the website and I'd like to book a stay.`)}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-gold font-medium text-[15px]"
            >
              <WaIcon className="size-4" />
              Book on WhatsApp
              <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
            </a>
            <Link
              to="/stays"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-cream/25 text-cream hover:bg-cream/[0.06] transition text-[15px]"
            >
              View All Properties
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
            {[
              { k: "4.9★", v: "Average Rating" },
              { k: "500+", v: "Happy Guests" },
              { k: "24/7", v: "Support" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-serif text-2xl text-cream">{s.k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-cream/55">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: editorial card stack (hidden on small) */}
        <div className="lg:col-span-5 relative h-[360px] hidden lg:block reveal reveal-scale">
          {stack.map((l, i) => {
            const positions = [
              "top-0 right-0 w-[65%] rotate-[2deg] z-20",
              "top-[35%] left-0 w-[65%] -rotate-[2deg] z-30",
            ];
            const delay = ["", "rise-delay-1"][i];
            return (
              <Link
                key={l.slug}
                to={`/stays/${l.slug}`}
                className={`absolute ${positions[i]} rise ${delay} card-hover float-slow`}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-cream/10">
                  <div className="relative aspect-[4/5]">
                    <img
                      src={l.cover}
                      alt={l.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest bg-cream/90 text-ink px-2 py-1 rounded-full">
                      <span className="size-1 rounded-full bg-emerald inline-block" />
                      Verified
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-cream">
                      <div className="text-[10px] uppercase tracking-widest text-cream/70">
                        {l.neighborhood}
                      </div>
                      <div className="font-serif text-lg leading-tight mt-0.5">
                        {l.title}
                      </div>
                      <div className="mt-1 text-xs text-cream/85">
                        {fmtKES(l.pricePerNight)} <span className="text-cream/60">/ night</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {/* floating gold accent */}
          <div className="absolute -bottom-6 -left-4 size-20 rounded-full bg-gold/20 blur-2xl" />
          <div className="absolute -top-4 right-10 size-24 rounded-full bg-gold/10 blur-3xl" />
        </div>
      </div>

      {/* Mobile card stack - visible only on small screens */}
      <div className="lg:hidden px-5 pb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
          {stack.map((l, i) => (
            <Link
              key={l.slug}
              to={`/stays/${l.slug}`}
              className="flex-shrink-0 w-[72%] snap-center reveal reveal-scale"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="rounded-xl overflow-hidden shadow-xl shadow-black/30 ring-1 ring-cream/10">
                <div className="relative aspect-[4/5]">
                  <img
                    src={l.cover}
                    alt={l.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
                  <div className="absolute top-2 left-2 inline-flex items-center gap-1 text-[9px] uppercase tracking-widest bg-cream/90 text-ink px-2 py-0.5 rounded-full">
                    <span className="size-1 rounded-full bg-emerald inline-block" />
                    Verified
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-cream">
                    <div className="text-[9px] uppercase tracking-widest text-cream/70">
                      {l.neighborhood}
                    </div>
                    <div className="font-serif text-sm leading-tight mt-0.5">
                      {l.title}
                    </div>
                    <div className="mt-0.5 text-xs text-cream/85">
                      {fmtKES(l.pricePerNight)} <span className="text-cream/60">/ night</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating glass quick-search */}
      <div className="mx-auto max-w-6xl px-5 pb-10 sm:pb-16 -mt-4 sm:-mt-6 relative reveal reveal-d2">
        <QuickSearch />
      </div>
    </section>
  );
}

function QuickSearch() {
  const [where, setWhere] = useState("Any neighborhood");
  const [when, setWhen] = useState("");
  const [guests, setGuests] = useState(2);
  const open = () => {
    const msg =
      `Hi ${BRAND}! Quick request:%0A` +
      `Where: ${where}%0A` +
      `When: ${when || "flexible"}%0A` +
      `Guests: ${guests}`;
    window.open(`https://wa.me/254741987770?text=${msg}`, "_blank");
  };
  return (
    <div className="glass rounded-2xl p-3 sm:p-2 sm:pl-5 grid sm:grid-cols-[1fr_1fr_auto_auto] gap-2 sm:gap-0 sm:items-center text-cream rise rise-delay-3">
      <Slot label="Where">
        <select
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          className="bg-transparent w-full text-cream text-sm focus:outline-none [&>option]:text-ink appearance-none cursor-pointer pr-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFB347'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1rem'
          }}
        >
          <option>Any neighborhood</option>
          {GUIDES.map((g) => (
            <option key={g.slug}>{g.name}</option>
          ))}
        </select>
      </Slot>
      <Slot label="When" border>
        <input
          type="date"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="bg-transparent w-full text-cream text-sm focus:outline-none [color-scheme:dark]"
        />
      </Slot>
      <Slot label="Guests" border compact>
        <input
          type="number"
          min={1}
          max={12}
          value={guests}
          onChange={(e) => setGuests(+e.target.value)}
          className="bg-transparent w-16 text-cream text-sm focus:outline-none"
        />
      </Slot>
      <button
        onClick={open}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn-gold text-sm font-medium"
      >
        <WaIcon className="size-4" /> Request
      </button>
    </div>
  );
}

function Slot({
  label,
  children,
  border,
  compact,
}: {
  label: string;
  children: React.ReactNode;
  border?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2.5 ${border ? "sm:border-l sm:border-cream/15" : ""} ${
        compact ? "sm:w-32" : ""
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.18em] text-cream/55">
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

/* ————————————————————— PARALLAX QUOTE DIVIDER ————————————————————— */

function ParallaxQuote({
  image,
  eyebrow,
  line,
  sub,
  align = "left",
}: {
  image: string;
  eyebrow: string;
  line: React.ReactNode;
  sub: string;
  align?: "left" | "right";
}) {
  return (
    <section
      className="relative mt-20 sm:mt-28 isolate overflow-hidden parallax vignette min-h-[460px] sm:min-h-[560px] flex items-center"
      style={{ backgroundImage: `url(${image})` }}
      aria-label={eyebrow}
    >
      {/* Mobile fallback image (since fixed bg disabled <md) — gives drift motion */}
      <div className="absolute inset-0 -z-10 md:hidden overflow-hidden">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover drift"
          loading="lazy"
        />
      </div>
      {/* Tint layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink/70" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(229,207,160,0.10),transparent_70%)]" />

      <div
        className={`relative mx-auto max-w-6xl px-5 py-20 sm:py-28 w-full ${
          align === "right" ? "text-right ml-auto" : ""
        }`}
      >
        <div className={`max-w-2xl ${align === "right" ? "ml-auto" : ""} reveal reveal-scale`}>
          <div
            className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-cream/80 ${
              align === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <span className="h-px w-6 bg-gold" />
            {eyebrow}
          </div>
          <h3 className="mt-5 font-serif font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-cream">
            {line}
          </h3>
          <p
            className={`mt-5 text-cream/75 max-w-lg leading-relaxed ${
              align === "right" ? "ml-auto" : ""
            }`}
          >
            {sub}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— TRUST MARQUEE ————————————————————— */

function TrustMarquee() {
  const items = [
    "Verified hosts",
    "Real video tours",
    "WhatsApp support",
    "Backup power & water",
    "Secure buildings",
    "M‑Pesa friendly",
    `Curated by ${FOUNDER}`,
    "Flexible check‑in",
  ];
  return (
    <section className="border-y border-line bg-cream-2/60 overflow-hidden">
      <div className="flex whitespace-nowrap py-4 text-[11px] uppercase tracking-[0.22em] text-ink-2">
        <div className="marquee flex gap-10 pr-10">
          {[...items, ...items, ...items].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="size-1 rounded-full bg-gold inline-block" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— FEATURED STAYS ————————————————————— */

function FeaturedStays({ listings }: { listings: any[] }) {
  const stays = listings.slice(0, 6);
  if (stays.length === 0 || !stays[0]?.slug) return null;
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <SectionHead
        eyebrow="Premium Collection"
        title={
          <>
            Featured Nairobi <span className="italic text-gold-dark">Stays</span>
          </>
        }
        sub="Explore our handpicked selection of luxury apartments and vacation rentals in Nairobi's most sought-after neighborhoods."
        link={{ to: "/stays", label: "View All Properties" }}
      />

      {/* Mobile: Horizontal scroll carousel */}
      <div className="mt-10 sm:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-hide">
          {stays.map((l, idx) => (
            <Link
              key={l.slug}
              to={`/stays/${l.slug}`}
              className="flex-shrink-0 w-[85vw] snap-start group block relative"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <FeaturedListingCard listing={l} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent pointer-events-none rounded-2xl transition-opacity duration-300 group-hover:from-ink/85" />
              {idx === 0 && <Badge>Editor's pick</Badge>}
              {idx > 0 && l.verified && <Badge>Verified</Badge>}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-cream pointer-events-none">
                <div className="text-[10px] uppercase tracking-widest text-cream/75">
                  {l.neighborhood}
                </div>
                <div className="mt-1 font-serif text-lg leading-tight">{l.title}</div>
                {idx === 0 && (
                  <div className="mt-1 text-cream/85 text-sm">{l.shortPitch || ''}</div>
                )}
                <div className="mt-2 flex items-end justify-between text-xs">
                  <span>
                    <span className="font-medium">{fmtKES(l.pricePerNight)}</span>
                    <span className="text-cream/60"> / night</span>
                  </span>
                  <span className="text-xs">★ {l.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {stays.map((_, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full bg-cream/30"
            />
          ))}
        </div>
      </div>

      {/* Tablet: 2-column grid with hero */}
      <div className="mt-10 hidden sm:grid lg:hidden gap-5 sm:grid-cols-2">
        {stays.map((l, idx) => (
          <Link
            key={l.slug}
            to={`/stays/${l.slug}`}
            className={`group block relative ${idx === 0 ? 'sm:col-span-2' : ''}`}
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <FeaturedListingCard listing={l} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent pointer-events-none rounded-2xl transition-opacity duration-300 group-hover:from-ink/85" />
            {idx === 0 && <Badge>Editor's pick</Badge>}
            {idx > 0 && l.verified && <Badge>Verified</Badge>}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-cream pointer-events-none">
              <div className="text-[10px] uppercase tracking-widest text-cream/75">
                {l.neighborhood}
              </div>
              <div className="mt-1 font-serif text-lg sm:text-xl leading-tight">{l.title}</div>
              {idx === 0 && (
                <div className="mt-1 text-cream/85 text-sm max-w-md">{l.shortPitch || ''}</div>
              )}
              <div className="mt-2 flex items-end justify-between text-xs">
                <span>
                  <span className="font-medium">{fmtKES(l.pricePerNight)}</span>
                  <span className="text-cream/60"> / night</span>
                </span>
                <span className="text-xs">★ {l.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: Masonry grid */}
      <div className="mt-10 hidden lg:grid gap-5 lg:grid-cols-3 auto-rows-[300px]">
        {stays.map((l, idx) => (
          <Link
            key={l.slug}
            to={`/stays/${l.slug}`}
            className={`group block relative ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
          >
            <div className="relative w-full h-full overflow-hidden rounded-3xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <FeaturedListingCard listing={l} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent pointer-events-none rounded-3xl transition-opacity duration-300 group-hover:from-ink/85" />
            {idx === 0 && <Badge>Editor's pick</Badge>}
            {idx > 0 && l.verified && <Badge>Verified</Badge>}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-cream pointer-events-none transition-transform duration-300 group-hover:translate-y-[-2px]">
              <div className="text-[10px] uppercase tracking-widest text-cream/75">
                {l.neighborhood}
              </div>
              <div className="mt-1 font-serif text-lg sm:text-xl leading-tight">{l.title}</div>
              {idx === 0 && (
                <div className="mt-1 text-cream/85 text-sm max-w-md">{l.shortPitch || ''}</div>
              )}
              <div className="mt-2 flex items-end justify-between text-xs">
                <span>
                  <span className="font-medium">{fmtKES(l.pricePerNight)}</span>
                  <span className="text-cream/60"> / night</span>
                </span>
                <span className="text-xs">★ {l.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] bg-cream/90 backdrop-blur px-2.5 py-1 rounded-full text-ink">
      <span className="size-1 rounded-full bg-emerald inline-block" />
      {children}
    </div>
  );
}

/* ————————————————————— FOUNDER ————————————————————— */

function FounderBlock() {
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <div className="rounded-3xl bg-ink text-cream overflow-hidden grid lg:grid-cols-12 relative">
        <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto min-h-[360px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=75"
            alt="Ivy, founder of Nairobi Spaces"
            className="w-full h-full object-cover drift"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/10 to-ink/70 lg:to-ink/0" />
          {/* Floating gold caption chip */}
          <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/90 bg-ink/55 backdrop-blur px-3 py-1.5 rounded-full border border-cream/15">
            <span className="size-1 rounded-full bg-gold inline-block" />
            Founder & Curator
          </div>
        </div>
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="text-[10px] uppercase tracking-[0.24em] text-gold/90">
            Meet the Founder
          </div>
          <h3 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.05]">
            "Curated with care. Verified with pride."
          </h3>
          <p className="mt-5 text-cream/70 max-w-lg leading-relaxed">
            Welcome to Nairobi Spaces. I personally inspect every property to ensure it meets our standards of quality, comfort, and hospitality. Working directly with homeowners who share our commitment to exceptional guest experiences, I remain personally available to assist with any questions about your Nairobi stay.
          </p>
          <div className="mt-7 hr-gold text-cream/30">
            <span className="text-[10px] uppercase tracking-[0.22em] text-cream/55 whitespace-nowrap">
              Contact Directly
            </span>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href={waLink(`Hi ${FOUNDER}! Found you via the website.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-cream/25 hover:border-gold hover:text-gold text-sm transition duration-300 whitespace-nowrap"
            >
              <WaIcon className="size-4" /> WhatsApp {FOUNDER}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-cream/25 hover:border-gold hover:text-gold text-sm transition duration-300 whitespace-nowrap"
            >
              <IgIcon className="size-4" /> {INSTAGRAM_HANDLE}
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-cream/25 hover:border-gold hover:text-gold text-sm transition duration-300 whitespace-nowrap"
            >
              <TikTokIcon className="size-4" /> {TIKTOK_HANDLE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— HOW IT WORKS ————————————————————— */

function HowItWorks() {
  const steps = [
    { n: "01", t: "Share Your Requirements", d: "Tell us your dates, guest count, and preferred neighborhood via WhatsApp or our inquiry form." },
    { n: "02", t: "Receive Curated Options", d: "We'll send 2-3 personalized property recommendations with real photos, video tours, and transparent pricing." },
    { n: "03", t: "Book & Check In", d: "Secure your booking via M-Pesa or card. We provide 24/7 support throughout your entire stay." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28 mb-20 sm:mb-28">
      <SectionHead
        eyebrow="Booking Process"
        title={<>Book Your Nairobi Stay in <span className="italic text-gold-dark">Three Easy Steps</span></>}
      />
      <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className={`group relative bg-cream rounded-2xl p-6 sm:p-8 border border-line hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 reveal reveal-d${i + 1}`}>
            <div className="absolute top-6 right-6 text-6xl font-serif text-gold/10 group-hover:text-gold/20 transition-colors duration-300">
              {s.n}
            </div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-4 group-hover:bg-gold group-hover:text-ink transition-colors duration-300">
                <span className="font-serif text-lg font-medium">{i + 1}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl leading-tight">{s.t}</h3>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ————————————————————— NEIGHBORHOODS ————————————————————— */

function NeighborhoodsStrip({ neighborhoods }: { neighborhoods: any[] }) {
  return (
    <section className="py-12 sm:py-16 bg-[var(--color-cream-2)]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl">Explore Nairobi Neighborhoods</h2>
          <Link
            to="/neighborhoods"
            className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors"
          >
            View all {neighborhoods.length} →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {neighborhoods.map((n) => (
            <Link
              key={n.slug}
              to={`/neighborhoods/${n.slug}`}
              className="snap-start shrink-0 w-[78%] sm:w-[42%] lg:w-[28%] group reveal reveal-d1"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={n.cover}
                  alt={`${n.name} guide cover`}
                  className="w-full h-full object-cover transition group-hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-cream/85">
                  <span className="size-1 rounded-full bg-gold inline-block" />
                  Nairobi
                </div>
                <div className="absolute bottom-0 p-5 text-cream">
                  <div className="font-serif text-2xl leading-tight">{n.name}</div>
                  <div className="mt-1 text-sm text-cream/80">{n.tagline}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold">
                    Read guide →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— TESTIMONIALS ————————————————————— */

function Testimonials() {
  const t = [
    { q: "The Westlands apartment exceeded all expectations. Perfect location, beautifully furnished, and the WhatsApp booking process was seamless. Highly recommend for anyone visiting Nairobi.", a: "Achieng'", tag: "London · Business Traveler" },
    { q: "We booked the Karen cottage for our anniversary and it was magical. The property was immaculate, the host was responsive, and every detail was thoughtfully arranged.", a: "Daniel & Mercy", tag: "Nairobi · Couples" },
    { q: "As a frequent visitor to Nairobi for work, I've tried many accommodations. Nairobi Spaces consistently delivers the best quality and service. My go-to for every trip.", a: "Liam", tag: "Cape Town · Regular Guest" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <SectionHead
        eyebrow="Guest Reviews"
        title={<>What Our Guests <span className="italic text-gold-dark">Say About Us</span></>}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.map((x, i) => (
          <figure
            key={i}
            className={`rounded-3xl border border-line p-7 bg-cream relative card-hover reveal reveal-d${i + 1}`}
          >
            <div className="absolute -top-3 left-7 px-2 py-0.5 rounded-full bg-gold text-ink text-[10px] uppercase tracking-widest">
              5.0 ★
            </div>
            <blockquote className="mt-3 font-serif text-lg leading-snug text-ink">
              "{x.q}"
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-line text-sm text-ink-2">
              <div className="font-medium text-ink">{x.a}</div>
              <div className="text-mute text-xs uppercase tracking-widest mt-0.5">
                {x.tag}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ————————————————————— INSTAGRAM ————————————————————— */

function InstagramStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <SectionHead
        eyebrow="Social Media"
        title={<>See Our Properties <span className="italic text-gold-dark">On Video</span></>}
        sub={`Follow ${INSTAGRAM_HANDLE} and ${TIKTOK_HANDLE} for exclusive video tours of our Nairobi apartments and vacation rentals.`}
        link={{ to: INSTAGRAM_URL, label: "Follow on Instagram", external: true }}
      />
      <div className="mt-6 flex gap-3">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-line text-ink hover:bg-cream-2 transition">
          <IgIcon className="size-4" /> Instagram
        </a>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-line text-ink hover:bg-cream-2 transition">
          <TikTokIcon className="size-4" /> TikTok
        </a>
      </div>
      <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {[...LISTINGS, ...LISTINGS].slice(0, 6).map((l, i) => (
          <a
            key={i}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-square rounded-xl overflow-hidden group"
          >
            <img
              src={l.gallery[i % l.gallery.length]}
              alt={`Reel preview ${i + 1}`}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/55 transition flex items-center justify-center">
              <IgIcon className="size-6 text-cream opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="absolute top-1.5 right-1.5 size-5 rounded-full bg-cream/95 text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <svg viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ————————————————————— OWNERS BANNER ————————————————————— */

function OwnersBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <div className="relative rounded-3xl bg-emerald text-cream p-8 sm:p-12 lg:p-16 grid gap-8 md:grid-cols-2 md:items-center overflow-hidden reveal reveal-scale">
        {/* Decorative gold orb */}
        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 size-48 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.24em] text-gold">
            Property Owners
          </div>
          <h3 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.05]">
            List Your Nairobi Property <span className="gold-text">With Us</span>
          </h3>
          <p className="mt-4 text-cream/80 max-w-md leading-relaxed">
            We showcase a curated selection of premium Nairobi properties. Join our platform to receive professional photography, video content, and access to quality guests seeking exceptional stays.
          </p>
        </div>
        <div className="relative flex flex-wrap gap-3 md:justify-end">
          <Link
            to="/owners"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gold text-sm font-medium"
          >
            List Your Property →
          </Link>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-cream/25 hover:bg-cream/[0.06] text-sm"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— SECTION HEAD ————————————————————— */

function SectionHead({
  eyebrow,
  title,
  sub,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  link?: { to: string; label: string; external?: boolean };
}) {
  return (
    <div className="flex items-end justify-between gap-6 reveal">
      <div>
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-mute">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </div>
        <h2 className="mt-3 font-serif text-3xl sm:text-[44px] leading-[1.05] max-w-2xl tracking-[-0.02em]">
          {title}
        </h2>
        {sub && <p className="mt-3 text-ink-2 max-w-xl">{sub}</p>}
      </div>
      {link &&
        (link.external ? (
          <a
            href={link.to}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink shrink-0 border-b border-ink/30 pb-0.5 hover:border-ink"
          >
            {link.label} →
          </a>
        ) : (
          <Link
            to={link.to}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink shrink-0 border-b border-ink/30 pb-0.5 hover:border-ink"
          >
            {link.label} →
          </Link>
        ))}
    </div>
  );
}

/* ————————————————————— INQUIRY FORM ————————————————————— */

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    budget: "10–15k / night",
    neighborhood: "Any",
    purpose: "Leisure",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Hi ${BRAND}! I'd like to inquire about a stay.%0A%0A` +
      `Name: ${form.name}%0A` +
      `Check‑in: ${form.checkIn}%0A` +
      `Check‑out: ${form.checkOut}%0A` +
      `Guests: ${form.guests}%0A` +
      `Budget: ${form.budget}%0A` +
      `Neighborhood: ${form.neighborhood}%0A` +
      `Purpose: ${form.purpose}%0A` +
      `Notes: ${form.notes}`;
    window.open(`https://wa.me/254741987770?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <div
      className={`rounded-3xl border border-line bg-cream p-6 sm:p-10 ${
        compact ? "" : ""
      }`}
    >
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-mute">
            <span className="h-px w-6 bg-gold" />
            Inquiry
          </div>
          <h3 className="mt-3 font-serif text-3xl sm:text-4xl leading-tight">
            Tell us what you <span className="italic text-gold-dark">want.</span>
          </h3>
          <p className="mt-4 text-ink-2 leading-relaxed">
            We'll reply on WhatsApp within a few hours with 2–3 stays that match
            — or honestly tell you we don't have the right one.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-ink-2">
            <li className="flex gap-2"><span className="text-gold">✓</span> Replies within hours, not days</li>
            <li className="flex gap-2"><span className="text-gold">✓</span> No spam, ever</li>
            <li className="flex gap-2"><span className="text-gold">✓</span> Cancel any time before payment</li>
          </ul>
        </div>
        <form onSubmit={submit} className="md:col-span-3 grid gap-4">
          <Field label="Your name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="ip"
              placeholder="Amani W."
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Check‑in">
              <input
                required
                type="date"
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                className="ip"
              />
            </Field>
            <Field label="Check‑out">
              <input
                required
                type="date"
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                className="ip"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Guests">
              <input
                type="number"
                min={1}
                max={12}
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: +e.target.value })}
                className="ip"
              />
            </Field>
            <Field label="Budget / night">
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="ip"
              >
                <option>Under 6k</option>
                <option>6–10k</option>
                <option>10–15k / night</option>
                <option>15–25k</option>
                <option>25k+</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Neighborhood">
              <select
                value={form.neighborhood}
                onChange={(e) =>
                  setForm({ ...form, neighborhood: e.target.value })
                }
                className="ip appearance-none cursor-pointer pr-8"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFB347'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1rem'
                }}
              >
                <option>Any</option>
                {NEIGHBORHOODS.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </Field>
            <Field label="Purpose">
              <select
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="ip"
              >
                <option>Leisure</option>
                <option>Business</option>
                <option>Family visit</option>
                <option>Honeymoon</option>
                <option>Content shoot</option>
                <option>Long stay</option>
              </select>
            </Field>
          </div>
          <Field label="Anything else?">
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="ip"
              placeholder="Pool, quiet floor, near Sarit, etc."
            />
          </Field>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full btn-gold font-medium"
          >
            <WaIcon className="size-4" /> Send via WhatsApp
          </button>
          {sent && (
            <div className="text-sm text-emerald">
              Opening WhatsApp… we'll reply shortly.
            </div>
          )}
        </form>
      </div>
      <style>{`
        .ip {
          width: 100%;
          background: var(--color-cream-2);
          border: 1px solid var(--color-line);
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 15px;
          color: var(--color-ink);
          outline: none;
          transition: border-color .15s, background .15s, box-shadow .15s;
        }
        .ip:focus {
          border-color: var(--color-gold);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(201,169,106,.18);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.22em] text-mute mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
