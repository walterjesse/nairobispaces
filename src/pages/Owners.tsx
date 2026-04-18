import { useState } from "react";
import { BRAND, FOUNDER, waLink } from "../data/site";
import { WaIcon } from "../components/Layout";

export function OwnersPage() {
  const [form, setForm] = useState({
    owner: "",
    phone: "",
    propertyName: "",
    neighborhood: "",
    bedrooms: 1,
    nightly: "",
    amenities: "",
    photosUrl: "",
    notes: "",
    consent: false,
  });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `New owner intake for ${BRAND}:%0A%0A` +
      `Owner: ${form.owner}%0A` +
      `Phone: ${form.phone}%0A` +
      `Property: ${form.propertyName}%0A` +
      `Neighborhood: ${form.neighborhood}%0A` +
      `Bedrooms: ${form.bedrooms}%0A` +
      `Nightly rate: ${form.nightly}%0A` +
      `Amenities: ${form.amenities}%0A` +
      `Photos: ${form.photosUrl}%0A` +
      `Notes: ${form.notes}`;
    window.open(waLink(decodeURIComponent(msg)), "_blank");
    setSent(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-emerald text-cream">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=70"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20">
          <div className="text-[11px] uppercase tracking-[0.18em] text-cream/80">For owners</div>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl leading-[1.05] max-w-3xl">
            We promote a small list of Nairobi properties. <span className="text-gold">Yours might be next.</span>
          </h1>
          <p className="mt-4 max-w-xl text-cream/85">
            {FOUNDER} hand‑picks every property featured on {BRAND}. If yours fits, you get a real reel, real photography, and pre‑screened guests through one direct WhatsApp line.
          </p>
          <a
            href="#owner-form"
            className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream text-ink font-medium"
          >
            Submit your property →
          </a>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-5 mt-16 grid gap-6 md:grid-cols-3">
        {[
          { t: "Curation, not a directory.", d: "We feature a tight collection. That's why guests trust us — and why your listing actually gets attention." },
          { t: "Reels that book.", d: "Every featured property gets a styled video tour designed to turn Instagram views into inquiries." },
          { t: "Pre‑screened guests.", d: "We talk to every guest before forwarding. You get fewer messages and better stays." },
        ].map((x) => (
          <div key={x.t} className="rounded-3xl border border-line p-6 bg-cream">
            <div className="font-serif text-xl">{x.t}</div>
            <div className="mt-2 text-ink-2 text-sm">{x.d}</div>
          </div>
        ))}
      </section>

      {/* What we look for */}
      <section className="mx-auto max-w-6xl px-5 mt-16">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mute">What we look for</div>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">A clear baseline. No surprises for guests.</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-ink-2">
          {[
            "Located in Westlands, Kilimani, Lavington, Karen, Riverside, or near CBD",
            "Backup power and water (or honest disclosure)",
            "Fast, reliable Wi‑Fi (50 Mbps+)",
            "Secure building with controlled access",
            "Clean, modern furnishing — no dated finishes",
            "Responsive on‑site or nearby caretaker",
          ].map((x) => (
            <li key={x} className="flex items-start gap-2">
              <span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" /> {x}
            </li>
          ))}
        </ul>
      </section>

      {/* Form */}
      <section id="owner-form" className="mx-auto max-w-6xl px-5 mt-16">
        <div className="rounded-3xl border border-line bg-cream p-6 sm:p-10">
          <h3 className="font-serif text-3xl">Tell us about your property.</h3>
          <p className="mt-2 text-ink-2 max-w-xl">
            Takes 2 minutes. We reply on WhatsApp within 48 hours and, if it's a fit, schedule a visit.
          </p>
          <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <F label="Your name"><input required className="ip" value={form.owner} onChange={(e)=>setForm({...form, owner:e.target.value})} /></F>
            <F label="Phone / WhatsApp"><input required className="ip" placeholder="+254…" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} /></F>
            <F label="Property name / building"><input required className="ip" value={form.propertyName} onChange={(e)=>setForm({...form, propertyName:e.target.value})} /></F>
            <F label="Neighborhood"><input required className="ip" placeholder="e.g. Kilimani" value={form.neighborhood} onChange={(e)=>setForm({...form, neighborhood:e.target.value})} /></F>
            <F label="Bedrooms"><input type="number" min={0} max={6} className="ip" value={form.bedrooms} onChange={(e)=>setForm({...form, bedrooms:+e.target.value})} /></F>
            <F label="Nightly rate (KES)"><input className="ip" placeholder="e.g. 12,000" value={form.nightly} onChange={(e)=>setForm({...form, nightly:e.target.value})} /></F>
            <F label="Amenities (comma separated)" wide><input className="ip" placeholder="Wi‑Fi, pool, backup power…" value={form.amenities} onChange={(e)=>setForm({...form, amenities:e.target.value})} /></F>
            <F label="Photos / drive link" wide><input className="ip" placeholder="Google Drive, Dropbox, or Instagram link" value={form.photosUrl} onChange={(e)=>setForm({...form, photosUrl:e.target.value})} /></F>
            <F label="Anything else?" wide><textarea rows={3} className="ip" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} /></F>
            <label className="sm:col-span-2 flex items-start gap-2 text-sm text-ink-2">
              <input type="checkbox" required checked={form.consent} onChange={(e)=>setForm({...form, consent:e.target.checked})} className="mt-1" />
              I'm authorized to list this property and agree to be contacted on WhatsApp.
            </label>
            <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-cream font-medium">
              <WaIcon className="size-4" /> Send via WhatsApp
            </button>
            {sent && <div className="sm:col-span-2 text-sm text-emerald">Opening WhatsApp… we'll review and reply within 48 hours.</div>}
          </form>
          <style>{`
            .ip {
              width:100%; background: var(--color-cream-2); border:1px solid var(--color-line);
              border-radius: 14px; padding: 12px 14px; font-size:15px; color: var(--color-ink); outline:none;
            }
            .ip:focus { border-color: var(--color-ink); background:#fff; }
          `}</style>
        </div>
      </section>
    </main>
  );
}

function F({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="block text-xs uppercase tracking-widest text-mute mb-1.5">{label}</span>
      {children}
    </label>
  );
}
