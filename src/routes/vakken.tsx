import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { subjects } from "@/data/subjects";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/vakken")({
  head: () => ({
    meta: [
      { title: "Kies je vak — The subject matter(s)" },
      { name: "description", content: "Kies het vak waarvoor je de differentiatie-activiteit wilt doen." },
    ],
  }),
  component: VakkenPage,
});

function VakkenPage() {
  const { language } = useLanguage();
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {language === 'nl' ? 'Kies je vak' : 'Choose your subject'}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {language === 'nl' ? 'Elk vak heeft een eigen set kaartjes met kenmerken die kunnen meespelen in differentiatie.' : 'Each subject has its own set of cards with characteristics that can play a role in differentiation.'}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <Link
            key={s.id}
            to="/activiteit/$vak"
            params={{ vak: s.id }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-lift"
          >
            <div
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: s.strong }}
              aria-hidden
            />
            <div
              className="mb-3 inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ background: s.soft, color: s.strong }}
            >
              {language === 'en' && s.nameEn ? s.nameEn : s.name}
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {language === 'en' && s.nameEn ? s.nameEn : s.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {language === 'en' && s.labelEn ? s.labelEn : s.label}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              {language === 'nl' ? 'Open activiteit' : 'Open activity'}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
