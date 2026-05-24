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

import { useLanguage } from "@/contexts/LanguageContext";

function OverPage() {
  const { language } = useLanguage();
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">{language === 'nl' ? 'Over deze tool' : 'About this tool'}</h1>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          {language === 'nl' 
            ? 'Differentiatie is een hoeksteen van modern, inclusief onderwijs, gericht op het omgaan met toenemende diversiteit in de klas. De uitvoering blijft echter een van de meest complexe uitdagingen voor docenten. Elke dag balanceren zij individuele leerlingbehoeften tegen praktische beperkingen zoals tijd, curriculum en klassengrootte.'
            : 'Differentiation has become a cornerstone of modern inclusive education and is aimed at addressing the increasing diversity within a classroom. While the goal of maximizing every student’s potential is universally accepted, the execution remains one of the most complex challenges for educators. Teachers are constantly balancing individual needs against time constraints, curriculum requirements and class sizes.'}
        </p>
        <p>
          {language === 'nl'
            ? 'Van Vijfeijken et al. (2023) identificeren twee hoofdrichtingen in differentiatie, voortkomend uit opvattingen over eerlijkheid (fairness): convergente en divergente differentiatie. Convergente differentiatie streeft naar gelijke uitkomsten voor alle leerlingen. Divergente differentiatie richt zich op het bieden van het meest passende leertraject per leerling, wat kan leiden tot uiteenlopende uitkomsten.'
            : 'Van Vijfeijken and colleagues identified two main streams of differentiation based on these values: convergent and divergent differentiation. Convergent differentiation seeks to bring all students to an equal level of ability based on the value of equality in terms of equal output. Divergent differentiation seeks to supply each student with the most appropriate learning trajectory based on equity.'}
        </p>
        <p>
          {language === 'nl'
            ? <span>Deze tool verkent een extra dimensie: de eigenschappen van je vak. Het centrale vraagstuk in deze workshop is: <strong>Zou je visie op differentiatie alleen moeten afhangen van jouw opvatting over eerlijkheid, of ook van de kenmerken van je vak?</strong></span>
            : <span>We seek to extend this dilemma of convergent and divergent differentiation to another lens besides fairness: the teacher’s subject. The central question in this workshop is: <strong>Should your view on differentiation depend not only on your sense of fairness, but also your subject’s properties?</strong></span>}
        </p>
        <p>
          {language === 'nl'
            ? 'Het primaire doel van de workshop is niet om een \'hoe-moet-ik-differentiëren\'-gids te bieden, maar om je professionele oordeelsvorming aan te scherpen. Door vakspecifieke eigenschappen (zoals een landelijk centraal examen of verschillen in wiskundige vaardigheden) op de assen te plaatsen, maak je je eigen aannames expliciet. Dit verplaatst het gesprek van persoonlijke waarden naar de invloed van de specifieke context van jouw schoolvak.'
            : 'The primary goal of this workshop is not to provide a \'how-to\' guide for differentiation, but to sharpen the teacher’s professional judgement when navigating complex trade-offs inherent in a diverse classroom. By placing subject-specific properties on the axes, you make your own assumptions explicit. This shifts the conversation from personal values to the influence of the specific context of your school subject.'}
        </p>
        <p className="rounded-lg border border-border bg-card/60 p-4 text-foreground/80 shadow-soft">
          {language === 'nl'
            ? 'Er zijn geen juiste of onjuiste plaatsingen. Het doel is de discussie en de professionele beredenering die daaruit volgt.'
            : 'There are no correct placements. The purpose is not to solve the dilemma, but to make the professional reasoning behind different choices explicit.'}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/vakken"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:shadow-lift"
        >
          {language === 'nl' ? 'Start de activiteit' : 'Start the activity'}
        </Link>
        <Link
          to="/bronnen"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-soft transition hover:bg-muted"
        >
          {language === 'nl' ? 'Bekijk bronnen' : 'View sources'}
        </Link>
      </div>
    </section>
  );
}
