import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/over")({
  head: () => ({
    meta: [
      { title: "Over deze tool — Differentiatie en vakkenmerken" },
      {
        name: "description",
        content:
          "Achtergrond bij de tool: differentiatie, vakkenmerken en de gedachte achter de kaartjes.",
      },
    ],
  }),
  component: OverPage,
});

function OverPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Over deze tool</h1>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          Deze tool is ontwikkeld als digitale verdieping bij een workshop over convergente en
          divergente differentiatie. De centrale gedachte is dat differentiatie niet alleen wordt
          beïnvloed door persoonlijke opvattingen over eerlijkheid, maar ook door kenmerken van het
          vak zelf, zoals toetsing, curriculum, motivatie, voorkennis, praktische opdrachten en
          klassengrootte.
        </p>
        <p className="rounded-lg border border-border bg-card/60 p-4 text-foreground/80 shadow-soft">
          De kaartjes zijn bedoeld als gespreksstarter. Er zijn geen juiste of onjuiste plaatsingen.
        </p>
        <p>
          De activiteit kun je alleen doen of samen met een collega of medestudent. Gebruik de
          reflectievragen en de samenvatting om je vakbeeld expliciet te maken en daarover in
          gesprek te gaan.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/vakken"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:shadow-lift"
        >
          Start de activiteit
        </Link>
        <Link
          to="/bronnen"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-soft transition hover:bg-muted"
        >
          Bekijk bronnen
        </Link>
      </div>
    </section>
  );
}
