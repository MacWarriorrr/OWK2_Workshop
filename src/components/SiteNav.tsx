import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", labelNl: "Home", labelEn: "Home" },
  { to: "/vakken", labelNl: "Activiteit", labelEn: "Activity" },
  { to: "/uitwerkingen", labelNl: "Uitwerkingen", labelEn: "Results" },
  { to: "/bronnen", labelNl: "Bronnen", labelEn: "Sources" },
  { to: "/over", labelNl: "Over deze tool", labelEn: "About this tool" },
] as const;

import { useLanguage } from "@/contexts/LanguageContext";

export function SiteNav() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
          {language === 'nl' ? 'Differentiatie' : 'Differentiation'}<span className="text-muted-foreground"> · {language === 'nl' ? 'vakkenmerken' : 'subject properties'}</span>
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
                {language === 'nl' ? it.labelNl : it.labelEn}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={toggleLanguage}
              className="ml-2 rounded-md border border-border bg-card px-2 py-1 text-xs font-semibold text-foreground hover:bg-muted"
              title="Toggle Language"
            >
              {language.toUpperCase()}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
