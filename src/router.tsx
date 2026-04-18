import { useEffect, useState, useCallback } from "react";

export function useHashRoute() {
  const get = () => {
    const h = window.location.hash.replace(/^#/, "") || "/";
    return h.startsWith("/") ? h : "/" + h;
  };
  const [route, setRoute] = useState<string>(get());
  useEffect(() => {
    const onHash = () => {
      setRoute(get());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function navigate(to: string) {
  const target = to.startsWith("/") ? to : "/" + to;
  window.location.hash = target;
}

export function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const handle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onClick?.();
      navigate(to);
    },
    [to, onClick]
  );
  return (
    <a href={"#" + to} onClick={handle} className={className}>
      {children}
    </a>
  );
}

export function parseRoute(route: string): { name: string; param?: string } {
  const parts = route.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "stays" && parts[1]) return { name: "listing", param: parts[1] };
  if (parts[0] === "neighborhoods" && parts[1]) return { name: "neighborhood", param: parts[1] };
  if (parts[0] === "admin" && parts[1] === "login") return { name: "admin-login" };
  if (parts[0] === "admin" && parts[1] === "new") return { name: "admin-new" };
  if (parts[0] === "admin" && parts[1] === "edit" && parts[2]) return { name: "admin-edit", param: parts[2] };
  if (parts[0] === "admin") return { name: "admin" };
  return { name: parts[0] };
}
