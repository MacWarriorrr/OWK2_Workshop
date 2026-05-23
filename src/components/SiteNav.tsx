import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", label: "Home" },
  { to: "/vakken", label: "Activiteit" },
  { to: "/uitwerkingen", label: "Uitwerkingen" },
  { to: "/bronnen", label: "Bronnen" },
  { to: "/over", label: "Over deze tool" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
          Differentiatie<span className="text-muted-foreground"> · vakkenmerken</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {items.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                activeOptions={{ exact: it.to === "/" }}
                className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
