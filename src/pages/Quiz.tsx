import { useMemo, useState } from "react";
import { Link } from "../router";
import { LISTINGS } from "../data/listings";
import { BRAND, fmtKES, waLink } from "../data/site";
import { WaIcon } from "../components/Layout";

type Answers = {
  who: "Solo" | "Couple" | "Family" | "Friends" | "Business";
  vibe: "Quiet" | "Social" | "Romantic" | "Productive";
  budget: "Under 8k" | "8–15k" | "15–25k" | "25k+";
  area: "Central" | "Quiet/leafy" | "Doesn't matter";
};

const Q = [
  { key: "who", q: "Who's coming?", opts: ["Solo", "Couple", "Family", "Friends", "Business"] as const },
  { key: "vibe", q: "What's the vibe?", opts: ["Quiet", "Social", "Romantic", "Productive"] as const },
  { key: "budget", q: "Budget per night?", opts: ["Under 8k", "8–15k", "15–25k", "25k+"] as const },
  { key: "area", q: "Where would you prefer?", opts: ["Central", "Quiet/leafy", "Doesn't matter"] as const },
] as const;

export function QuizPage() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Partial<Answers>>({});
  const done = step >= Q.length;

  const picks = useMemo(() => {
    if (!done) return [];
    let scored = LISTINGS.map((l) => {
      let s = 0;
      // who → tags
      const whoMap: Record<string, string[]> = {
        Solo: ["Solo", "Business", "Budget"],
        Couple: ["Couples", "Romantic"],
        Family: ["Families"],
        Friends: ["Friends"],
        Business: ["Business", "Solo"],
      };
      if (a.who && l.perfectFor.some((t) => whoMap[a.who!].includes(t))) s += 3;

      // vibe
      if (a.vibe === "Quiet" && ["Karen", "Lavington", "Kilimani"].includes(l.neighborhood)) s += 2;
      if (a.vibe === "Social" && ["Westlands", "CBD"].includes(l.neighborhood)) s += 2;
      if (a.vibe === "Romantic" && l.perfectFor.includes("Romantic")) s += 3;
      if (a.vibe === "Productive" && l.amenities.includes("Workspace")) s += 2;

      // budget
      const inRange = (lo: number, hi: number) => l.pricePerNight >= lo && l.pricePerNight <= hi;
      if (a.budget === "Under 8k" && inRange(0, 8000)) s += 3;
      if (a.budget === "8–15k" && inRange(8000, 15000)) s += 3;
      if (a.budget === "15–25k" && inRange(15000, 25000)) s += 3;
      if (a.budget === "25k+" && l.pricePerNight >= 25000) s += 3;

      // area
      if (a.area === "Central" && ["Westlands", "CBD", "Kilimani", "Riverside"].includes(l.neighborhood)) s += 1;
      if (a.area === "Quiet/leafy" && ["Karen", "Lavington"].includes(l.neighborhood)) s += 2;

      return { l, s };
    });
    scored.sort((x, y) => y.s - x.s);
    return scored.slice(0, 3).map((x) => x.l);
  }, [a, done]);

  const reset = () => { setA({}); setStep(0); };

  return (
    <main className="mx-auto max-w-3xl px-5 pt-10 pb-16">
      <div className="text-[11px] uppercase tracking-[0.18em] text-mute">Find my stay</div>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">A 30‑second quiz.</h1>
      <p className="mt-2 text-ink-2">Tell us a few things. We'll pick 3 stays and hand you over to WhatsApp.</p>

      {!done ? (
        <div className="mt-10 rounded-3xl border border-line bg-cream p-6 sm:p-10">
          <div className="text-xs text-mute">Question {step + 1} of {Q.length}</div>
          <div className="mt-2 h-1 rounded-full bg-line overflow-hidden">
            <div className="h-full bg-ink" style={{ width: `${((step) / Q.length) * 100}%` }} />
          </div>
          <h2 className="mt-6 font-serif text-2xl sm:text-3xl">{Q[step].q}</h2>
          <div className="mt-6 grid gap-3">
            {Q[step].opts.map((opt) => (
              <button
                key={opt}
                onClick={() => { setA({ ...a, [Q[step].key]: opt } as Partial<Answers>); setStep(step + 1); }}
                className="text-left px-5 py-4 rounded-2xl border border-line hover:border-ink bg-cream-2/40 hover:bg-cream-2 transition"
              >
                {opt}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="mt-6 text-sm underline underline-offset-4 text-mute">
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="mt-10">
          <div className="rounded-3xl border border-line bg-cream-2/50 p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-mute">Your matches</div>
            <h2 className="mt-2 font-serif text-3xl">3 stays you'll like.</h2>
            <p className="mt-2 text-ink-2 text-sm">Want us to check availability for your dates? Tap WhatsApp.</p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {picks.map((l) => (
              <Link key={l.slug} to={`/stays/${l.slug}`} className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={l.cover} alt={l.title} className="w-full h-full object-cover transition group-hover:scale-105 duration-700" />
                </div>
                <div className="mt-3 font-serif text-lg">{l.title}</div>
                <div className="text-xs text-mute">{l.neighborhood} · {fmtKES(l.pricePerNight)}/night</div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink(`Hi ${BRAND}! I just took the quiz. Top picks: ${picks.map(p => p.title).join(", ")}. Can you check availability?`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-whatsapp)] text-white font-medium"
            >
              <WaIcon className="size-4" /> Send my picks to WhatsApp
            </a>
            <button onClick={reset} className="px-5 py-3 rounded-full border border-line">Retake quiz</button>
          </div>
        </div>
      )}
    </main>
  );
}
