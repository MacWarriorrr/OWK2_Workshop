import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bronnen")({
  head: () => ({
    meta: [
      { title: "Bronnen en verdieping — The subject matter(s)" },
      {
        name: "description",
        content:
          "Literatuur en bronnen over convergente en divergente differentiatie, fairness en vakdidactiek.",
      },
    ],
  }),
  component: BronnenPage,
});

import { useLanguage } from "@/contexts/LanguageContext";

function BronnenPage() {
  const { language } = useLanguage();
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {language === 'nl' ? 'Bronnen en verdieping' : 'Sources and background'}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {language === 'nl' 
          ? 'Een overzicht van de literatuur en bronnen achter de theoretische basis van deze tool. Bedoeld om dieper te lezen, te bespreken en mee te nemen in je eigen praktijk.'
          : 'An overview of the literature and sources behind the theoretical basis of this tool. Intended for deeper reading, discussion, and to take with you in your own practice.'}
      </p>

      <Group title={language === 'nl' ? 'Literatuur' : 'Literature'}>
        <Item>
          Ceci, S. J., & Papierno, P. B. (2005). The rhetoric and reality of gap closing: when the “Have-Nots” gain but the “Haves” gain even more. <em>American Psychologist, 60</em>(2), 149–160.{" "}
          <a className="link" href="https://doi.org/10.1037/0003-066x.60.2.149" target="_blank" rel="noreferrer">
            https://doi.org/10.1037/0003-066x.60.2.149
          </a>
        </Item>
        <Item>
          Godor, B. P. (2021). The many faces of teacher differentiation: Using Q methodology to explore teachers’ preferences for differentiated instruction. <em>The Teacher Educator, 56</em>(1), 43–60.{" "}
          <a className="link" href="https://doi.org/10.1080/08878730.2020.1785068" target="_blank" rel="noreferrer">
            https://doi.org/10.1080/08878730.2020.1785068
          </a>
        </Item>
        <Item>
          Leventhal, G. S. (1980). What should be done with equity theory? In K. J. Gergen, M. S. Greenberg, & R. H. Willis (Eds.), <em>Social exchange: Advances in theory and research</em> (pp. 27–55). Plenum.
        </Item>
        <Item>
          Mirawati, I. G., Suwastini, N. K., Haryanti, N. D., & Jayantini, I. G. (2022). Differentiated instructions: Relevant studies on its implementation. <em>Prasi, 17</em>(1), 11–21.{" "}
          <a className="link" href="https://doi.org/10.23887/prasi.v17i1.41867" target="_blank" rel="noreferrer">
            https://doi.org/10.23887/prasi.v17i1.41867
          </a>
        </Item>
        <Item>
          Nunez, N. A., Fernández-Concha, R., & Cornejo-Meza, G. (2026). One size does not fit all: customizing teaching and learning strategies with Generative AI. <em>Frontiers in Education, 11</em>.{" "}
          <a className="link" href="https://doi.org/10.3389/feduc.2026.1699228" target="_blank" rel="noreferrer">
            https://doi.org/10.3389/feduc.2026.1699228
          </a>
        </Item>
        <Item>
          Reis, S. M., & Renzulli, J. S. (1992). Using curriculum compacting to challenge the above-average. <em>Educational Leadership, 50</em>(2), 51–57.
        </Item>
        <Item>
          Resh, N., & Sabbagh, C. (2016). Justice and education. In C. Sabbagh & M. Schmitt (Eds.), <em>Handbook of social justice theory and research</em> (pp. 349–367). Springer.{" "}
          <a className="link" href="https://doi.org/10.1007/978-1-4939-3216-0_19" target="_blank" rel="noreferrer">
            https://doi.org/10.1007/978-1-4939-3216-0_19
          </a>
        </Item>
        <Item>
          Tomlinson, C. A. (2001). <em>How to differentiate instruction in mixed-ability classrooms</em> (2nd ed.). ASCD.
        </Item>
        <Item>
          Van Vijfeijken, M., Denessen, E., van Schilt-Mol, T., & Scholte, R. H. J. (2021). Equity, equality, and need: A qualitative study into teachers’ professional trade-offs in justifying their differentiation practice. <em>Open Journal of Social Sciences, 9</em>, 236–257.{" "}
          <a className="link" href="https://doi.org/10.4236/jss.2021.98017" target="_blank" rel="noreferrer">
            https://doi.org/10.4236/jss.2021.98017
          </a>
        </Item>
        <Item>
          Van Vijfeijken, M., van Schilt-Mol, T., van den Bergh, L., Scholte, R. H. J., & Denessen, E. (2023a). How teachers handle differentiation dilemmas in the context of a school’s vision: A case study. <em>Cogent Education, 10</em>(1), 2165006.{" "}
          <a className="link" href="https://doi.org/10.1080/2331186X.2023.2165006" target="_blank" rel="noreferrer">
            https://doi.org/10.1080/2331186X.2023.2165006
          </a>
        </Item>
        <Item>
          Van Vijfeijken, M., & van Schilt-Mol, T. (2023b). <em>Zo bied je eerlijke kansen</em>.
        </Item>
        <Item>
          Van Vijfeijken, M., van Schilt-Mol, T., Scholte, R. H. J., & Denessen, E. (2023c). A quantitative study of teachers’ beliefs and practices regarding fair classroom differentiation. <em>SN Social Sciences, 3</em>(1), Article 1.{" "}
          <a className="link" href="https://doi.org/10.1007/s43545-022-00590-7" target="_blank" rel="noreferrer">
            https://doi.org/10.1007/s43545-022-00590-7
          </a>
        </Item>
      </Group>
    </section>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-4 text-sm leading-relaxed text-foreground/90 shadow-soft break-words">
      {children}
      <style>{`.link { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}
