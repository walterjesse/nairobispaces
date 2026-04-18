import { useState } from "react";
import { Link } from "../router";
import { LISTINGS, NEIGHBORHOODS } from "../data/listings";
import { GUIDES } from "../data/neighborhoods";
import {
  BRAND,
  FOUNDER,
  fmtKES,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  waLink,
} from "../data/site";
import { WaIcon, IgIcon } from "../components/Layout";

export function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <TrustMarquee />
      <FeaturedStays />
      <ParallaxQuote
        image="/images/entrance-villa.jpg"
        eyebrow="The doorway"
        line={<>Every key opens onto <span className="italic gold-text">somewhere considered.</span></>}
        sub="Stone paths, soft lighting, plants that have been watered. Small things, done right."
      />
      <FounderBlock />
      <HowItWorks />
      <NeighborhoodsStrip />
      <Testimonials />
      <ParallaxQuote
        image="/images/nairobi-dusk.jpg"
        eyebrow="The city"
        line={<>Nairobi from the <span className="italic gold-text">right window.</span></>}
        sub="Skylines, gardens, quiet courtyards. We pick the address — you pick the view."
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

function Hero() {
  const stack = LISTINGS.slice(0, 3);
  return (
    <section className="relative isolate bg-ink text-cream overflow-hidden grain">
      {/* Background image with rich layered gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/images/hero-building.jpg"
          alt="A curated Nairobi apartment building lit warmly at twilight"
          className="w-full h-full object-cover drift opacity-[0.62]"
          loading="eager"
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
        <div className="lg:col-span-7 rise">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-cream/80 border border-cream/15 bg-cream/[0.04] backdrop-blur px-3 py-1.5 rounded-full">
            <span className="size-1.5 rounded-full bg-gold inline-block" />
            Curated short stays · Nairobi
          </div>

          <h1 className="mt-6 font-serif font-light text-[40px] leading-[1.02] sm:text-[64px] lg:text-[78px] tracking-[-0.02em]">
            An address
            <br className="hidden sm:block" />{" "}
            <span className="italic font-normal">worth</span>{" "}
            <span className="gold-text not-italic">arriving at.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-cream/75 max-w-xl leading-relaxed">
            Handpicked apartments and BnBs from {FOUNDER}'s personal network.
            Real video tours, verified hosts, booked the way Nairobi already
            chats — over WhatsApp.
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
              Browse the collection
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
            {[
              { k: "4.9★", v: "Guest rating" },
              { k: "400+", v: "Stays this year" },
              { k: "24h", v: "WhatsApp reply" },
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
        <div className="lg:col-span-5 relative h-[460px] hidden lg:block">
          {stack.map((l, i) => {
            const positions = [
              "top-0 right-0 w-[78%] rotate-[2.5deg] z-30",
              "top-[42%] left-0 w-[62%] -rotate-[3deg] z-20",
              "bottom-0 right-[8%] w-[58%] rotate-[1deg] z-10",
            ];
            const delay = ["", "rise-delay-1", "rise-delay-2"][i];
            return (
              <Link
                key={l.slug}
                to={`/stays/${l.slug}`}
                className={`absolute ${positions[i]} rise ${delay} card-hover`}
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

      {/* Floating glass quick-search */}
      <div className="mx-auto max-w-6xl px-5 pb-10 sm:pb-16 -mt-4 sm:-mt-6 relative">
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
          className="bg-transparent w-full text-cream text-sm focus:outline-none [&>option]:text-ink"
        >
          <option>Any neighborhood</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n}>{n}</option>
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

function FeaturedStays() {
  const [hero, ...rest] = LISTINGS.slice(0, 5);
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <SectionHead
        eyebrow="The collection"
        title={
          <>
            Featured stays, <span className="italic text-gold-dark">this season.</span>
          </>
        }
        sub="Fresh from the camera roll. Tap any one for the full video tour."
        link={{ to: "/stays", label: "View all stays" }}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Hero card */}
        <Link
          to={`/stays/${hero.slug}`}
          className="lg:col-span-7 group block reveal reveal-d1"
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden rounded-3xl bg-cream-2">
            <img
              src={hero.cover}
              alt={hero.title}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <Badge>Editor's pick</Badge>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-cream">
              <div className="text-[11px] uppercase tracking-widest text-cream/75">
                {hero.neighborhood}
              </div>
              <div className="mt-1 font-serif text-3xl sm:text-4xl leading-tight">
                {hero.title}
              </div>
              <div className="mt-1.5 text-cream/85 max-w-md">{hero.shortPitch}</div>
              <div className="mt-4 flex items-end justify-between">
                <div className="text-sm">
                  <span className="font-medium">{fmtKES(hero.pricePerNight)}</span>
                  <span className="text-cream/65"> / night</span>
                </div>
                <span className="text-xs uppercase tracking-widest underline-offset-4 group-hover:underline">
                  Watch tour →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Side stack */}
        <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {rest.slice(0, 2).map((l, idx) => (
            <Link
              key={l.slug}
              to={`/stays/${l.slug}`}
              className={`group block reveal ${idx === 0 ? "reveal-d2" : "reveal-d3"}`}
            >
              <div className="relative aspect-[4/5] lg:aspect-[16/11] overflow-hidden rounded-3xl bg-cream-2">
                <img
                  src={l.cover}
                  alt={l.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent" />
                <Badge>Verified</Badge>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
                  <div className="text-[10px] uppercase tracking-widest text-cream/75">
                    {l.neighborhood}
                  </div>
                  <div className="mt-1 font-serif text-xl leading-tight">{l.title}</div>
                  <div className="mt-2 flex items-end justify-between text-sm">
                    <span>
                      <span className="font-medium">{fmtKES(l.pricePerNight)}</span>
                      <span className="text-cream/60"> / night</span>
                    </span>
                    <span className="text-xs">★ {l.rating}</span>
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
      <div className="rounded-3xl bg-ink text-cream overflow-hidden grid lg:grid-cols-12 relative reveal reveal-scale">
        <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto min-h-[360px] overflow-hidden">
          <img
            src="/images/interior-warm.jpg"
            alt={`Inside one of ${FOUNDER}'s curated Nairobi stays`}
            className="w-full h-full object-cover drift"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/10 to-ink/70 lg:to-ink/0" />
          {/* Floating gold caption chip */}
          <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/90 bg-ink/55 backdrop-blur px-3 py-1.5 rounded-full border border-cream/15">
            <span className="size-1 rounded-full bg-gold inline-block" />
            Inside a recent stay · Kilimani
          </div>
        </div>
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="text-[10px] uppercase tracking-[0.24em] text-gold/90">
            The curator
          </div>
          <h3 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.05]">
            "I only list places I'd put my own family in."
          </h3>
          <p className="mt-5 text-cream/70 max-w-lg leading-relaxed">
            Hi, I'm {FOUNDER}. For the last few years I've been quietly building
            a network of Nairobi's best apartment owners and BnB hosts — the
            ones who answer their phone, keep their Wi‑Fi fast, and don't cut
            corners. Every stay on this site, I've walked through myself.
          </p>
          <div className="mt-7 hr-gold text-cream/30">
            <span className="text-[10px] uppercase tracking-[0.22em] text-cream/55 whitespace-nowrap">
              Reach me directly
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={waLink(`Hi ${FOUNDER}! Found you via the website.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-gold text-sm font-medium"
            >
              <WaIcon className="size-4" /> WhatsApp {FOUNDER}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-cream/25 hover:bg-cream/[0.06] text-sm"
            >
              <IgIcon className="size-4" /> {INSTAGRAM_HANDLE}
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
    { n: "01", t: "Tell us what you want", d: "Dates, guests, vibe. WhatsApp or the form below — whichever's easier." },
    { n: "02", t: "We send 2–3 picks", d: "Real photos, real video tours, real prices. No noise, no upsell." },
    { n: "03", t: "Pay, check in, relax", d: "Pay via M‑Pesa or card where available. We're on call your whole stay." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <SectionHead
        eyebrow="How it works"
        title={<>From DM to keys, <span className="italic text-gold-dark">in three steps.</span></>}
      />
      <div className="mt-10 grid gap-px bg-line rounded-3xl overflow-hidden border border-line sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className={`bg-cream p-7 sm:p-8 reveal reveal-d${i + 1}`}>
            <div className="flex items-center gap-3">
              <span className="num-eyebrow text-gold-dark text-3xl">{s.n}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="mt-5 font-serif text-xl">{s.t}</div>
            <div className="mt-2 text-sm text-ink-2 leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ————————————————————— NEIGHBORHOODS ————————————————————— */

function NeighborhoodsStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <SectionHead
        eyebrow="Where to stay"
        title={<>Pick a neighborhood, <span className="italic text-gold-dark">not a hotel.</span></>}
        link={{ to: "/neighborhoods", label: "All guides" }}
      />
      <div className="mt-10 -mx-5 px-5 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {GUIDES.map((g, i) => (
          <Link
            key={g.slug}
            to={`/neighborhoods/${g.slug}`}
            className={`snap-start shrink-0 w-[78%] sm:w-[42%] lg:w-[28%] group reveal reveal-d${(i % 4) + 1}`}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src={g.cover}
                alt={`${g.name} guide cover`}
                className="w-full h-full object-cover transition group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-cream/85">
                <span className="size-1 rounded-full bg-gold inline-block" />
                Nairobi
              </div>
              <div className="absolute bottom-0 p-5 text-cream">
                <div className="font-serif text-2xl leading-tight">{g.name}</div>
                <div className="mt-1 text-sm text-cream/80">{g.tagline}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold">
                  Read guide →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ————————————————————— TESTIMONIALS ————————————————————— */

function Testimonials() {
  const t = [
    { q: "Felt like a friend with great taste planned my whole trip. The Westlands loft was even better than the reel.", a: "Achieng'", tag: "London · Diaspora" },
    { q: "We booked the Karen cottage for our anniversary. Firewood, breakfast, zero stress. We'll be back.", a: "Daniel & Mercy", tag: "Nairobi · Couples" },
    { q: "I shoot brand content in Nairobi twice a year. This is the only person I message now.", a: "Liam", tag: "Cape Town · Creators" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 mt-20 sm:mt-28">
      <SectionHead
        eyebrow="Guests"
        title={<>What people <span className="italic text-gold-dark">DM us after.</span></>}
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
        eyebrow="The feed"
        title={<>See it before <span className="italic text-gold-dark">you book.</span></>}
        sub={`Every stay starts as a reel on ${INSTAGRAM_HANDLE}.`}
        link={{ to: INSTAGRAM_URL, label: "Follow on Instagram", external: true }}
      />
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
            For owners
          </div>
          <h3 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.05]">
            Have a place worth showing? <span className="gold-text">Let's put it on camera.</span>
          </h3>
          <p className="mt-4 text-cream/80 max-w-md leading-relaxed">
            We promote a small, curated set of Nairobi properties. If yours
            fits, you'll get real photography, a reel, and a steady pipeline of
            well‑screened guests.
          </p>
        </div>
        <div className="relative flex flex-wrap gap-3 md:justify-end">
          <Link
            to="/owners"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gold text-sm font-medium"
          >
            List your property →
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
                className="ip"
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
