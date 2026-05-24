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
          Differentiatie is een hoeksteen van modern, inclusief onderwijs, gericht op het omgaan met toenemende diversiteit in de klas. De uitvoering blijft echter een van de meest complexe uitdagingen voor docenten. Elke dag balanceren zij individuele leerlingbehoeften tegen praktische beperkingen zoals tijd, curriculum en klassengrootte.
        </p>
        <p>
          Van Vijfeijken et al. (2023) identificeren twee hoofdrichtingen in differentiatie, voortkomend uit opvattingen over eerlijkheid (fairness): convergente en divergente differentiatie. Convergente differentiatie streeft naar gelijke uitkomsten voor alle leerlingen. Divergente differentiatie richt zich op het bieden van het meest passende leertraject per leerling, wat kan leiden tot uiteenlopende uitkomsten.
        </p>
        <p>
          Deze tool verkent een extra dimensie: de eigenschappen van je vak. Het centrale vraagstuk in deze workshop is: <strong>Zou je visie op differentiatie alleen moeten afhangen van jouw opvatting over eerlijkheid, of ook van de kenmerken van je vak?</strong>
        </p>
        <p>
          Het primaire doel van de workshop is niet om een 'hoe-moet-ik-differentiëren'-gids te bieden, maar om je professionele oordeelsvorming aan te scherpen. Door vakspecifieke eigenschappen—zoals een landelijk centraal examen of verschillen in wiskundige vaardigheden—op de assen te plaatsen, maak je je eigen aannames expliciet. Dit verplaatst het gesprek van persoonlijke waarden naar de invloed van de specifieke context van jouw schoolvak.
        </p>
        <p className="rounded-lg border border-border bg-card/60 p-4 text-foreground/80 shadow-soft">
          Er zijn geen juiste of onjuiste plaatsingen. Het doel is de discussie en de professionele beredenering die daaruit volgt.
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
