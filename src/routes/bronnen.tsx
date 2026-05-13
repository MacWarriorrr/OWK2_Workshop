import { createFileRoute } from "@tanstack/react-router";
import { cardsBySubject } from "@/data/cards";
import { subjects } from "@/data/subjects";

export const Route = createFileRoute("/bronnen")({
  head: () => ({
    meta: [
      { title: "Bronnen en verdieping — Differentiatie en vakkenmerken" },
      {
        name: "description",
        content:
          "Literatuur en bronnen over convergente en divergente differentiatie, fairness en vakdidactiek.",
      },
    ],
  }),
  component: BronnenPage,
});

function BronnenPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Bronnen en verdieping</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Een overzicht van de literatuur en vakgerichte bronnen achter deze tool. Bedoeld om dieper
        te lezen, te bespreken en mee te nemen in je eigen praktijk.
      </p>

      <Group title="A. Algemene literatuur over differentiatie">
        <Item>
          Tomlinson, C. A. (2001). <em>How to differentiate instruction in mixed-ability classrooms</em>.
          ASCD.
        </Item>
        <Item>
          Mirawati, I. G., Suwastini, N. K., Haryanti, N. D., & Jayantini, I. G. (2022).
          Differentiated instructions: Relevant studies on its implementation. <em>Prasi, 17</em>(1),
          11–21.{" "}
          <a className="link" href="https://doi.org/10.23887/prasi.v17i1.41867" target="_blank" rel="noreferrer">
            https://doi.org/10.23887/prasi.v17i1.41867
          </a>
        </Item>
      </Group>

      <Group title="B. Convergente en divergente differentiatie / fairness">
        <Item>
          Van Vijfeijken, M., Denessen, E., van Schilt-Mol, T., & Scholte, R. H. J. (2021). Equity,
          equality, and need: A qualitative study into teachers’ professional trade-offs in justifying
          their differentiation practice. <em>Open Journal of Social Sciences, 9</em>, 236–257.{" "}
          <a className="link" href="https://doi.org/10.4236/jss.2021.98017" target="_blank" rel="noreferrer">
            https://doi.org/10.4236/jss.2021.98017
          </a>
        </Item>
        <Item>
          Van Vijfeijken, M., van Schilt-Mol, T., van den Bergh, L., Scholte, R. H. J., & Denessen, E.
          (2023). How teachers handle differentiation dilemmas in the context of a school’s vision: A
          case study. <em>Cogent Education, 10</em>(1), 2165006.{" "}
          <a className="link" href="https://doi.org/10.1080/2331186X.2023.2165006" target="_blank" rel="noreferrer">
            https://doi.org/10.1080/2331186X.2023.2165006
          </a>
        </Item>
        <Item>
          Van Vijfeijken, M., van Schilt-Mol, T., Scholte, R. H. J., & Denessen, E. (2023). A
          quantitative study of teachers’ beliefs and practices regarding fair classroom
          differentiation. <em>SN Social Sciences, 3</em>(1).{" "}
          <a className="link" href="https://doi.org/10.1007/s43545-022-00590-7" target="_blank" rel="noreferrer">
            https://doi.org/10.1007/s43545-022-00590-7
          </a>
        </Item>
        <Item>
          Leventhal, G. S. (1980). What should be done with equity theory? In K. J. Gergen, M. S.
          Greenberg, & R. H. Willis (Eds.), <em>Social exchange: Advances in theory and research</em>.
          Plenum.
        </Item>
        <Item>
          Resh, N., & Sabbagh, C. (2016). Justice and education. In C. Sabbagh & M. Schmitt (Eds.),{" "}
          <em>Handbook of social justice theory and research</em>. Springer.{" "}
          <a className="link" href="https://doi.org/10.1007/978-1-4939-3216-0_19" target="_blank" rel="noreferrer">
            https://doi.org/10.1007/978-1-4939-3216-0_19
          </a>
        </Item>
      </Group>

      <Group title="C. Praktische spanningen bij differentiatie">
        <Item>
          Godor, B. P. (2021). The many faces of teacher differentiation: Using Q methodology to
          explore teachers’ preferences for differentiated instruction. <em>The Teacher Educator,
          56</em>(1), 43–60.{" "}
          <a className="link" href="https://doi.org/10.1080/08878730.2020.1785068" target="_blank" rel="noreferrer">
            https://doi.org/10.1080/08878730.2020.1785068
          </a>
        </Item>
        <Item>
          Reis, S. M., & Renzulli, J. S. (1992). Using curriculum compacting to challenge the
          above-average. <em>Educational Leadership, 50</em>(2), 51–57.
        </Item>
      </Group>

      <Group title="D. Vakgerichte bronnen">
        <Item>
          <a className="link" href="https://www.examenblad.nl" target="_blank" rel="noreferrer">
            Examenblad.nl
          </a>{" "}
          — syllabi en exameneisen per vak.
        </Item>
        <Item>
          <a className="link" href="https://www.slo.nl" target="_blank" rel="noreferrer">
            SLO
          </a>{" "}
          — examenprogramma’s en curriculumdocumenten.
        </Item>
        <Item>
          <a className="link" href="https://www.cvte.nl" target="_blank" rel="noreferrer">
            College voor Toetsen en Examens
          </a>
        </Item>
        <Item>
          <a className="link" href="https://www.studiekeuze123.nl" target="_blank" rel="noreferrer">
            Studiekeuze123
          </a>{" "}
          — vervolgopleidingen en toelatingseisen.
        </Item>
        <Item>Vakdidactische literatuur per vak (placeholder — vul aan vanuit je eigen vakcollectie).</Item>
      </Group>

      <Group title="E. Bronnen per kaartje">
        <p className="mb-4 text-sm text-muted-foreground">
          Voor elk kaartje in de activiteit zijn één of meer bronnen aangegeven. Open een kaartje via
          de info-knop voor de volledige lijst.
        </p>
        <div className="space-y-8">
          {subjects.map((s) => (
            <div key={s.id}>
              <h3
                className="font-display text-xl font-semibold"
                style={{ color: s.strong }}
              >
                {s.name}
              </h3>
              <ul className="mt-3 space-y-3">
                {cardsBySubject[s.id].map((c) => (
                  <li key={c.id} className="rounded-lg border border-border bg-card/60 p-3 text-sm">
                    <div className="font-semibold text-foreground">{c.title}</div>
                    <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                      {c.sources.map((src, i) => (
                        <li key={i}>{src}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
    <div className="rounded-lg border border-border bg-card/60 p-4 text-sm leading-relaxed text-foreground/90 shadow-soft">
      {children}
      <style>{`.link { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }`}</style>
    </div>
  );
}
