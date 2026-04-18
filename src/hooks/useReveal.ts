import { useEffect } from "react";

/**
 * Initializes a single IntersectionObserver that toggles the `.in` class on
 * any element with a `.reveal` class once it enters the viewport.
 * Mount once near the app root.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => io.observe(el));

    // Re-scan when route changes (hash router): observe newly mounted nodes
    const rescan = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => io.observe(el));
    };
    const t = setInterval(rescan, 600);

    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);
}
