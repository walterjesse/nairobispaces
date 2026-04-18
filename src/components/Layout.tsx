import { useState } from "react";
import { Link } from "../router";
import { BRAND, INSTAGRAM_URL, INSTAGRAM_HANDLE, EMAIL, PHONE_DISPLAY, PHONE_TEL, waLink } from "../data/site";

const NAV = [
  { to: "/stays", label: "Stays" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/quiz", label: "Find my stay" },
  { to: "/owners", label: "For Owners" },
  { to: "/strategy", label: "Strategy" },
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
      className="fixed z-50 bottom-5 right-5 inline-flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-[var(--color-whatsapp)] text-white shadow-xl shadow-black/20 hover:scale-[1.03] transition pulse-ring"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <WaIcon className="size-5" />
      <span className="text-sm font-semibold">Book on WhatsApp</span>
    </a>
  );
}

export function WaIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M19.11 17.27c-.27-.14-1.62-.8-1.87-.89s-.43-.13-.62.14-.71.89-.87 1.07-.32.21-.59.07a7.62 7.62 0 0 1-2.24-1.38 8.4 8.4 0 0 1-1.55-1.93c-.16-.27 0-.41.12-.55s.27-.32.41-.48a1.7 1.7 0 0 0 .27-.45.5.5 0 0 0 0-.48c-.07-.14-.62-1.5-.85-2s-.45-.45-.62-.46h-.53a1 1 0 0 0-.74.34A3.13 3.13 0 0 0 8.5 12.6a5.43 5.43 0 0 0 1.12 2.86 12.43 12.43 0 0 0 4.74 4.18c.66.28 1.18.45 1.58.58a3.83 3.83 0 0 0 1.75.11 2.86 2.86 0 0 0 1.88-1.32 2.32 2.32 0 0 0 .16-1.32c-.06-.13-.24-.2-.51-.34zM16 4a12 12 0 0 0-10.2 18.36L4 28l5.78-1.74A12 12 0 1 0 16 4zm0 21.78A9.79 9.79 0 0 1 10.78 24l-.37-.22-3.43 1 1-3.34-.24-.39A9.78 9.78 0 1 1 16 25.78z" />
    </svg>
  );
}

export function IgIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
