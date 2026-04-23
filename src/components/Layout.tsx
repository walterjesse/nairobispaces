import { useState } from "react";
import { Link } from "../router";
import { BRAND, INSTAGRAM_URL, INSTAGRAM_HANDLE, TIKTOK_URL, TIKTOK_HANDLE, EMAIL, PHONE_DISPLAY, PHONE_TEL, waLink } from "../data/site";

const NAV = [
  { to: "/stays", label: "Stays" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/quiz", label: "Find my stay" },
  { to: "/owners", label: "For Owners" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/85 border-b border-line/70">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tight flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-gold inline-block" />
          <span className="text-ink">{BRAND.split(" ")[0]}</span>
          <span className="text-gold-dark italic font-light"> {BRAND.split(" ")[1]}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.14em]">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-ink-2 hover:text-ink transition">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden lg:inline-flex items-center text-xs text-ink-2 hover:text-ink mr-2"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={waLink(`Hi ${BRAND}, I'd like to ask about a stay.`)}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full btn-gold"
          >
            <WaIcon className="size-4" /> WhatsApp
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span className="h-[1.5px] bg-ink"></span>
              <span className="h-[1.5px] bg-ink"></span>
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-cream">
          <div className="px-5 py-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-ink border-b border-line/70 last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-2">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-gold inline-block" />
            <span className="text-ink">Nairobi</span>
            <span className="text-gold-dark italic font-light"> Spaces</span>
          </div>
          <p className="mt-3 text-sm text-ink-2 max-w-sm">
            Handpicked short‑stay apartments and BnBs across Nairobi. Verified hosts, real video tours, booked over WhatsApp.
          </p>
          <div className="mt-5 flex gap-2">
            <a href={waLink(`Hi! I'd like to ask about a stay.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full bg-ink text-cream">
              <WaIcon className="size-4" /> WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-line text-ink">
              <IgIcon className="size-4" /> Instagram
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-line text-ink">
              <TikTokIcon className="size-4" /> TikTok
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-mute mb-3">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/stays" className="hover:underline">All stays</Link></li>
            <li><Link to="/neighborhoods" className="hover:underline">Neighborhoods</Link></li>
            <li><Link to="/quiz" className="hover:underline">Find my stay</Link></li>
            <li><Link to="/owners" className="hover:underline">For owners</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-mute mb-3">Contact</div>
          <ul className="space-y-2 text-sm">
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:underline">{INSTAGRAM_HANDLE}</a></li>
            <li><a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="hover:underline">{TIKTOK_HANDLE}</a></li>
            <li><a href={`tel:${PHONE_TEL}`} className="hover:underline">{PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-mute">
          <div>© {new Date().getFullYear()} Nairobi Spaces. Curated in Nairobi.</div>
          <div>Pay via M‑Pesa or card where available.</div>
        </div>
      </div>
    </footer>
  );
}

export function StickyWhatsApp() {
  return (
    <a
      href={waLink(`Hi ${BRAND}! I saw your site and I'd like to ask about a stay.`)}
      target="_blank"
      rel="noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed z-50 bottom-5 right-5 inline-flex items-center justify-center p-3 rounded-full bg-[var(--color-whatsapp)] text-white shadow-xl shadow-black/20 hover:scale-[1.03] transition pulse-ring"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <WaIcon className="size-6" colored={false} />
    </a>
  );
}

export function WaIcon({ className = "size-5", colored = false }: { className?: string; colored?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={colored ? "#25D366" : "currentColor"} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.08 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function IgIcon({ className = "size-5", colored = false }: { className?: string; colored?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={colored ? "#E4405F" : "currentColor"} strokeWidth="1.5" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={colored ? "#E4405F" : "currentColor"} />
    </svg>
  );
}

export function TikTokIcon({ className = "size-5", colored = false }: { className?: string; colored?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={colored ? "#000000" : "currentColor"} className={className} aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function PlayIcon({ className = "size-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
