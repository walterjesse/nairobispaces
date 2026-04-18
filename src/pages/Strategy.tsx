import { Link } from "../router";
import { BRAND, FOUNDER, INSTAGRAM_HANDLE } from "../data/site";

export function StrategyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-10 pb-20">
      <div className="text-[11px] uppercase tracking-[0.18em] text-mute">The brief</div>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl leading-[1.05]">
        {BRAND} — strategy & copy deck.
      </h1>
      <p className="mt-3 text-ink-2">
        Everything in one place — positioning, sitemap, wireframes, copy, content model, MVP plan, and design direction. Designed so {FOUNDER} can hand this to a developer (or just keep this site) and start booking.
      </p>

      <Section n="01" title="Positioning">
        <p>
          <b>{BRAND}</b> is a curated, Instagram‑native short‑stay brand for Nairobi. Where Airbnb is a marketplace and hotels are a transaction, {BRAND} is a personal concierge: {FOUNDER} hand‑picks every apartment, films a real video tour, and books guests directly over WhatsApp. The promise is simple — <i>"the Nairobi you saw on Instagram, now keys in hand."</i> Verified hosts, real footage, no surprises.
        </p>
      </Section>

      <Section n="02" title="Site map">
        <Map items={[
          ["Home (/)", "Hero, featured stays, how it works, neighborhoods, social proof, Instagram feed, owners CTA, inquiry form."],
          ["Stays (/stays)", "Filterable listing of all properties with cards. Mobile filter drawer."],
          ["Listing (/stays/:slug)", "Video tour, gallery, quick facts, amenities, area, rules, sticky booking card."],
          ["Neighborhoods (/neighborhoods)", "Index of guides — SEO entry points (e.g. Westlands BnB, Kilimani short stay)."],
          ["Neighborhood (/neighborhoods/:slug)", "Vibe, best‑for, know before you go, stays in that area."],
          ["Quiz (/quiz)", "4‑question 'Best for' quiz that recommends 3 stays and pushes to WhatsApp."],
          ["For Owners (/owners)", "Pitch + intake form to attract more partner properties."],
          ["Strategy (/strategy)", "This page. Internal reference for the team."],
        ]} />
      </Section>

      <Section n="03" title="Home page wireframe">
        <Wire items={[
          { t: "Sticky header", c: "Logo · Stays · Neighborhoods · Find my stay · For Owners · WhatsApp button." },
          { t: "Hero (video feel)", c: "Headline: 'The Nairobi you saw on Instagram. Now keys in hand.' Sub: handpicked, verified, booked over WhatsApp. CTAs: Book on WhatsApp · Browse stays. Social proof line: '4.9★ · 400+ guests this year.'" },
          { t: "Trust marquee", c: "Verified hosts · Real videos · WhatsApp support · Backup power · Secure buildings · M‑Pesa friendly · Curated by [Friend]." },
          { t: "Featured stays (4)", c: "Big cards, neighborhood + price, 'View tour →'." },
          { t: "How it works (3 steps)", c: "Tell us · We send 2–3 picks · Pay, check in, relax." },
          { t: "Neighborhood carousel", c: "Westlands, Kilimani, Lavington, Karen, CBD, Riverside." },
          { t: "Testimonials (3)", c: "Diaspora · Couples · Creators." },
          { t: "Instagram grid (6)", c: "Tap‑through to " + INSTAGRAM_HANDLE + "." },
          { t: "Owners CTA banner", c: "Have a place worth showing? Let's put it on camera." },
          { t: "Inquiry form", c: "Dates · guests · budget · neighborhood · purpose · notes → opens WhatsApp pre‑filled." },
          { t: "Footer", c: "Brand · explore · contact · payment note." },
        ]} />
      </Section>

      <Section n="04" title="Stays page wireframe">
        <p className="mb-3">Filters (mobile = collapsible drawer): Neighborhood · Bedrooms · Perfect for · Amenity · Max price (slider).</p>
        <p className="mb-3">Layout: 1 column on mobile, 2 on tablet, 3 on desktop. Each card is a 4:5 image with a verified badge, rating, neighborhood, title, one‑line pitch, and price.</p>
        <p className="font-medium mt-4">Sample listing card copy:</p>
        <Quote>
          <b>Skyline Loft · Westlands</b><br/>
          Floor‑to‑ceiling windows, espresso machine, sunset views.<br/>
          KES 9,500 / night · ~$74 · ★ 4.94
        </Quote>
      </Section>

      <Section n="05" title="Listing page template">
        <Wire items={[
          { t: "Breadcrumbs", c: "All stays / Neighborhood / Listing." },
          { t: "Gallery + 'Watch the tour'", c: "Hero photo with play button (Reel/YouTube embed) + 5 thumbnails." },
          { t: "Sticky booking card", c: "Price · CTAs: Book on WhatsApp · Request availability · Call. Guests/beds/baths stats." },
          { t: "About this stay", c: "2–3 short, honest paragraphs in brand voice." },
          { t: "Quick facts grid", c: "Bedrooms · beds · baths · max guests." },
          { t: "What's inside", c: "Amenity chips with gold dots." },
          { t: "The area", c: "Area description, no exact address. Note: 'Exact address shared after booking.'" },
          { t: "House rules + check‑in", c: "Plain‑English bullets. WhatsApp support 24/7 line." },
          { t: "Trust rail", c: "Verified · Backup essentials · Real support." },
          { t: "You might also like", c: "3 related stays." },
        ]} />
        <p className="font-medium mt-4">Primary CTA stack (in order):</p>
        <ol className="list-decimal pl-5 space-y-1 text-ink-2">
          <li><b>Book on WhatsApp</b> (green, top)</li>
          <li>Request availability (dark, secondary)</li>
          <li>Call (outline, tertiary)</li>
        </ol>
      </Section>

      <Section n="06" title="For Owners page">
        <p className="mb-3"><b>Pitch:</b> "We promote a small list of Nairobi properties. Yours might be next." We're a curated reel‑driven channel — not a directory. Owners get real photography, a styled video tour, and pre‑screened guests through one WhatsApp line.</p>
        <p className="font-medium">Intake form fields:</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-2">
          <li>Owner name · phone/WhatsApp</li>
          <li>Property name / building</li>
          <li>Neighborhood</li>
          <li>Bedrooms · target nightly rate (KES)</li>
          <li>Amenities (free text or chips)</li>
          <li>Photo / Drive / Instagram link</li>
          <li>Notes (anything we should know)</li>
          <li>Consent checkbox (authorized + happy to be contacted on WhatsApp)</li>
        </ul>
      </Section>

      <Section n="07" title="Copy deck">
        <p className="font-medium">10 headline options</p>
        <ol className="list-decimal pl-5 space-y-1 text-ink-2">
          <li>The Nairobi you saw on Instagram. Now keys in hand.</li>
          <li>Handpicked stays. Booked on WhatsApp.</li>
          <li>Curated Nairobi living, one DM away.</li>
          <li>Stay where the locals would put their friends.</li>
          <li>Real reels. Real homes. Real hosts.</li>
          <li>Short stays, long memories — across Nairobi.</li>
          <li>Skip the scroll. We've already filtered.</li>
          <li>Your Nairobi base camp, vetted in person.</li>
          <li>From a saved reel to a check‑in code.</li>
          <li>Apartments worth posting about. We picked them first.</li>
        </ol>

        <p className="font-medium mt-6">10 CTA button options</p>
        <ul className="grid sm:grid-cols-2 gap-y-1 list-disc pl-5 text-ink-2">
          <li>Book on WhatsApp</li>
          <li>Request availability</li>
          <li>Call us now</li>
          <li>Send my dates</li>
          <li>Hold this stay</li>
          <li>DM us on Instagram</li>
          <li>Find my stay</li>
          <li>Watch the tour</li>
          <li>Get 3 picks</li>
          <li>Talk to a human</li>
        </ul>

        <p className="font-medium mt-6">6 trust / credibility lines</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-2">
          <li>Every property personally walked by {FOUNDER}.</li>
          <li>Verified backup power and water, or honest disclosure.</li>
          <li>Real video tours — what you see is what you book.</li>
          <li>WhatsApp support open through your entire stay.</li>
          <li>Trusted by 400+ guests this year. 4.9★ average.</li>
          <li>M‑Pesa or card accepted where available — no surprises.</li>
        </ul>
      </Section>

      <Section n="08" title="Content model (per property)">
        <Code>{`{
  slug: string,                 // url, e.g. "westlands-skyline-loft"
  title: string,                // "Skyline Loft, Westlands"
  neighborhood: enum,           // Westlands | Kilimani | Lavington | Karen | CBD | Riverside
  pricePerNight: number,        // KES
  bedrooms: number,             // 0 = studio
  beds: number,
  baths: number,
  maxGuests: number,
  perfectFor: string[],         // tags, e.g. ["Couples","Business"]
  amenities: string[],          // chips
  cover: image,                 // 4:5 hero
  gallery: image[],             // 4–8 images
  videoUrl: url,                // Reel or YouTube
  shortPitch: string,           // one line under title
  description: text,            // 2–3 paragraphs
  areaNotes: text,              // no exact address
  rules: string[],
  checkIn: string,              // free text
  rating: number,               // 0–5
  reviews: number,
  verified: boolean
}`}</Code>
      </Section>

      <Section n="09" title="MVP build plan (1–2 weeks)">
        <p className="font-medium">Week 1 — ship it</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-2">
          <li>Brand + design tokens, mobile‑first layout, sticky WhatsApp button.</li>
          <li>Home, Stays (filters), Listing, Owners, Neighborhoods index — exactly this site.</li>
          <li>WhatsApp deep links on every CTA, pre‑filled with property name.</li>
          <li>Inquiry form → opens WhatsApp with all answers (no backend needed).</li>
          <li>Hosting: Vercel/Netlify · domain · basic SEO (titles, descriptions, alt text).</li>
        </ul>
        <p className="font-medium mt-4">Week 2 — polish & launch</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-2">
          <li>Embed real Reel videos on each listing.</li>
          <li>Per‑neighborhood SEO copy (already drafted in /neighborhoods).</li>
          <li>Add GA4 + Meta Pixel for retargeting Instagram traffic.</li>
          <li>Soft‑launch to 5–10 trusted owners. Collect first batch of testimonials.</li>
        </ul>
        <p className="font-medium mt-4">Phase 2 upgrades</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-2">
          <li>CMS so {FOUNDER} can add listings without code (Sanity, Notion‑backed, or Airtable + revalidation).</li>
          <li>Real availability calendar synced from owners (Hospitable / iCal).</li>
          <li>Stripe + M‑Pesa Daraja STK push for in‑page deposits.</li>
          <li>Login + saved favourites, guest reviews, referral program.</li>
          <li>Email capture + monthly "new this month" newsletter.</li>
          <li>Multi‑city expansion (Mombasa, Diani, Naivasha) on the same engine.</li>
        </ul>
      </Section>

      <Section n="10" title="Design direction">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-medium">Type</p>
            <ul className="list-disc pl-5 space-y-1 text-ink-2">
              <li>Display: <b>Fraunces</b> (warm modern serif) — headlines, prices, listing titles.</li>
              <li>Body: <b>Inter</b> — UI, body, forms.</li>
              <li>Tracking: tight on display (-0.5%), wide on eyebrows (0.18em uppercase).</li>
            </ul>
            <p className="font-medium mt-4">Spacing</p>
            <ul className="list-disc pl-5 space-y-1 text-ink-2">
              <li>4px grid · section padding 64px / 96px (mobile / desktop).</li>
              <li>Cards: 16–24px radius. Buttons: full pill.</li>
              <li>Always 1 hero element per fold on mobile.</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Colors</p>
            <Swatches items={[
              ["Cream / bg", "#FAF7F2"],
              ["Cream 2 / surface", "#F2ECE2"],
              ["Ink / text", "#1A1714"],
              ["Mute", "#8B8278"],
              ["Line", "#E7DFD3"],
              ["Gold accent", "#C9A267"],
              ["Emerald accent", "#2D5A4F"],
              ["WhatsApp green", "#25D366"],
            ]}/>
          </div>
        </div>
        <p className="font-medium mt-6">Photo & video style</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-2">
          <li>Natural light always. Shoot golden hour for hero frames.</li>
          <li>Vertical 4:5 for cards, 9:16 for reels — same composition rules.</li>
          <li>Wide establishing shot, then a human detail (mug, plant, view).</li>
          <li>Warm grade — slight golden tint, never cool/blue.</li>
          <li>Alt text formula: <i>"[Property name] — [one feature], [neighborhood]"</i>.</li>
        </ul>
      </Section>

      <div className="mt-16 rounded-3xl border border-line p-6 bg-cream-2/40 text-center">
        <p className="font-serif text-2xl">Ready when you are.</p>
        <p className="mt-1 text-ink-2">This site is the MVP. Plug in real listings, swap the placeholders, and launch.</p>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="px-5 py-3 rounded-full bg-ink text-cream">View the site</Link>
          <Link to="/owners" className="px-5 py-3 rounded-full border border-line">For owners</Link>
        </div>
      </div>
    </main>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-gold text-xl">{n}</span>
        <h2 className="font-serif text-2xl sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-4 text-ink-2 leading-relaxed">{children}</div>
    </section>
  );
}

function Map({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-2 divide-y divide-line border border-line rounded-2xl overflow-hidden">
      {items.map(([a, b]) => (
        <li key={a} className="grid sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3 bg-cream">
          <div className="font-medium text-ink">{a}</div>
          <div className="sm:col-span-2 text-sm text-ink-2">{b}</div>
        </li>
      ))}
    </ul>
  );
}

function Wire({ items }: { items: { t: string; c: string }[] }) {
  return (
    <ol className="space-y-3">
      {items.map((it, i) => (
        <li key={it.t} className="rounded-2xl border border-line p-4 bg-cream">
          <div className="text-[11px] uppercase tracking-widest text-mute">Section {String(i + 1).padStart(2, "0")}</div>
          <div className="font-medium mt-1">{it.t}</div>
          <div className="text-sm text-ink-2 mt-1">{it.c}</div>
        </li>
      ))}
    </ol>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-2 border-l-2 border-gold pl-4 text-ink-2">{children}</blockquote>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-2xl bg-ink text-cream text-xs leading-relaxed p-5 font-mono">
      {children}
    </pre>
  );
}

function Swatches({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-1 grid gap-1.5">
      {items.map(([n, hex]) => (
        <li key={hex} className="flex items-center gap-3 text-sm">
          <span className="size-6 rounded-md border border-line" style={{ background: hex }} />
          <span className="text-ink">{n}</span>
          <span className="text-mute font-mono ml-auto">{hex}</span>
        </li>
      ))}
    </ul>
  );
}
