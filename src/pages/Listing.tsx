import { useState } from "react";
import { Link, navigate } from "../router";
import { LISTINGS } from "../data/listings";
import { BRAND, PHONE_DISPLAY, fmtKES, fmtUSD, waLink } from "../data/site";
import { WaIcon } from "../components/Layout";

export function ListingPage({ slug }: { slug: string }) {
  const l = LISTINGS.find((x) => x.slug === slug);
  const [activeImg, setActiveImg] = useState(0);

  if (!l) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">We don't have that one.</h1>
        <p className="mt-3 text-ink-2">It may be paused or fully booked. Browse the rest of the collection.</p>
        <button onClick={() => navigate("/stays")} className="mt-6 px-5 py-3 rounded-full bg-ink text-cream">
          See all stays
        </button>
      </main>
    );
  }

  const images = [l.cover, ...l.gallery];
  const bookMsg = `Hi ${BRAND}! I'd like to book "${l.title}" in ${l.neighborhood}.`;

  return (
    <main>
      {/* Top — gallery */}
      <section className="mx-auto max-w-6xl px-5 pt-6">
        <div className="text-sm text-mute">
          <Link to="/stays" className="hover:underline">All stays</Link>
          <span> / </span>
          <Link to={`/neighborhoods/${l.neighborhood.toLowerCase()}`} className="hover:underline">{l.neighborhood}</Link>
          <span> / </span>
          <span className="text-ink-2">{l.title}</span>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-cream-2">
              <img src={images[activeImg]} alt={`${l.title} photo ${activeImg + 1}`} className="w-full h-full object-cover" />
              {/* Play button to suggest video */}
              <button
                onClick={() => alert("Video tour: paste your Reel/YouTube embed here.")}
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-cream/90 backdrop-blur text-ink text-sm font-medium"
                aria-label="Play video tour"
              >
                <span className="size-7 rounded-full bg-ink text-cream inline-flex items-center justify-center">▶</span>
                Watch the tour
              </button>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-lg overflow-hidden border ${i === activeImg ? "border-ink" : "border-line"}`}
                >
                  <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Booking card */}
          <aside className="lg:col-span-2">
            <div className="rounded-2xl border border-line bg-cream p-6 lg:sticky lg:top-20">
              <div className="text-[11px] uppercase tracking-widest text-mute">{l.neighborhood} · {l.bedrooms === 0 ? "Studio" : `${l.bedrooms} bed`}</div>
              <h1 className="mt-1 font-serif text-3xl leading-tight">{l.title}</h1>
              <div className="mt-1 text-sm text-ink-2">★ {l.rating} · {l.reviews} stays · {l.verified && "✓ Verified by " + BRAND}</div>

              <div className="mt-5 flex items-end gap-2">
                <div className="font-serif text-3xl">{fmtKES(l.pricePerNight)}</div>
                <div className="text-mute mb-1">/ night · ~{fmtUSD(l.pricePerNight)}</div>
              </div>

              <div className="mt-5 grid gap-2">
                <a
                  href={waLink(bookMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--color-whatsapp)] text-white font-semibold"
                >
                  <WaIcon className="size-4" /> Book on WhatsApp
                </a>
                <a
                  href={waLink(`Hi ${BRAND}, is "${l.title}" available on these dates?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-cream font-medium"
                >
                  Request availability
                </a>
                <a
                  href="tel:+254700000000"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-line text-ink"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
                <Stat label="Guests" value={l.maxGuests} />
                <Stat label="Beds" value={l.beds} />
                <Stat label="Baths" value={l.baths} />
              </div>

              <p className="mt-5 text-xs text-mute leading-relaxed">
                M‑Pesa or card accepted where available. We hold soft availability while you decide — no pressure.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-5 mt-12 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-10">
          <div>
            <h2 className="font-serif text-2xl">About this stay</h2>
            <p className="mt-3 text-ink-2 leading-relaxed">{l.description}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl">Quick facts</h2>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["Bedrooms", l.bedrooms === 0 ? "Studio" : l.bedrooms],
                ["Beds", l.beds],
                ["Baths", l.baths],
                ["Max guests", l.maxGuests],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-xl border border-line p-4">
                  <div className="text-[10px] uppercase tracking-widest text-mute">{k}</div>
                  <div className="mt-1 font-serif text-xl">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl">What's inside</h2>
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-ink-2">
              {l.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gold" /> {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl">The area</h2>
            <p className="mt-3 text-ink-2 leading-relaxed">{l.areaNotes}</p>
            <p className="mt-2 text-xs text-mute">Exact address shared after booking confirmation.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h2 className="font-serif text-2xl">House rules</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-2">
                {l.rules.map((r) => <li key={r}>• {r}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl">Check‑in</h2>
              <p className="mt-3 text-sm text-ink-2">{l.checkIn}</p>
            </div>
          </div>
        </div>

        {/* Side rail trust */}
        <aside className="lg:col-span-2 space-y-4">
          {[
            { t: "Verified by " + BRAND, d: "We've personally walked this property and met the host." },
            { t: "Backup essentials", d: "Power and water backup in place — check listing notes for specifics." },
            { t: "Real support", d: "WhatsApp line stays open during your whole stay." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-line p-5 bg-cream-2/40">
              <div className="font-medium">{b.t}</div>
              <div className="text-sm text-ink-2 mt-1">{b.d}</div>
            </div>
          ))}
        </aside>
      </section>

      {/* You might also like */}
      <section className="mx-auto max-w-6xl px-5 mt-20">
        <div className="font-serif text-2xl">You might also like</div>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {LISTINGS.filter((x) => x.slug !== l.slug).slice(0, 3).map((x) => (
            <Link key={x.slug} to={`/stays/${x.slug}`} className="group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img src={x.cover} alt={x.title} className="w-full h-full object-cover transition group-hover:scale-105 duration-700" />
              </div>
              <div className="mt-3 font-serif text-lg">{x.title}</div>
              <div className="text-sm text-mute">{x.neighborhood} · {fmtKES(x.pricePerNight)}/night</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-cream-2 py-3">
      <div className="font-serif text-xl">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-mute">{label}</div>
    </div>
  );
}
