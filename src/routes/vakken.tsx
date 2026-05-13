import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { subjects } from "@/data/subjects";

export const Route = createFileRoute("/vakken")({
  head: () => ({
    meta: [
      { title: "Kies je vak — Differentiatie en vakkenmerken" },
      { name: "description", content: "Kies het vak waarvoor je de differentiatie-activiteit wilt doen." },
    ],
  }),
  component: VakkenPage,
});

function VakkenPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Kies je vak</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Elk vak heeft een eigen set kaartjes met kenmerken die kunnen meespelen in differentiatie.
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
              {s.name}
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">{s.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open activiteit
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
