import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, MoveRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Differentiatie en vakkenmerken" },
      {
        name: "description",
        content:
          "Verken welke vorm van differentiatie past bij jouw vak — digitale verdieping bij een workshop voor lerarenopleiding.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.93_0.04_230/.6),transparent)]" />
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          Aftercare bij de workshop
        </span>
        <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          Differentiatie en vakkenmerken
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Verken welke vorm van differentiatie past bij jouw vak.
        </p>

        <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <p className="text-base leading-relaxed text-foreground/90">
            Deze digitale versie hoort bij een korte workshop over convergente en divergente
            differentiatie. In de workshop heb je gewerkt met fysieke kaartjes. Hier kun je de
            activiteit later nog eens rustig herhalen, de bronnen bekijken en verder nadenken over
            jouw vak.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Plaats kaartjes met kenmerken van je vak op een bord met twee assen. De horizontale as
            loopt van convergent naar divergent. De verticale as geeft aan hoe belangrijk je het
            kenmerk vindt voor differentiatie binnen jouw vak. Er zijn geen goede of foute
            antwoorden. Het doel is om je vakbeeld expliciet te maken en daarover na te denken.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/vakken"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:shadow-lift"
          >
            Start de activiteit
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/bronnen"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-soft transition hover:bg-muted"
          >
            <BookOpen size={16} />
            Bekijk bronnen en verdieping
          </Link>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <Pillar title="Convergent" body="Leerlingen werken toe naar gemeenschappelijke kernstof, gedeelde doelen of eenzelfde eindniveau." />
          <Pillar title="Divergent" body="Verschillen tussen leerlingen krijgen ruimte in tempo, niveau, interesse, aanpak of product." />
          <Pillar title="Spanning" body="Kenmerken van je vak kunnen je naar beide kanten trekken. Die spanning maakt het gesprek juist waardevol." />
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <MoveRight size={16} />
          <span>
            Klaar om te starten? Kies eerst een vak op de{" "}
            <Link to="/vakken" className="underline underline-offset-4 hover:text-foreground">
              vakkeuzepagina
            </Link>
            .
          </span>
        </div>
      </section>
    </div>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-5 shadow-soft">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{title}</div>
      <p className="text-sm leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}
