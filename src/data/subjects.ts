export type SubjectId =
  | "natuurkunde"
  | "wiskunde"
  | "scheikunde"
  | "informatica"
  | "ontwerp";

export interface Subject {
  id: SubjectId;
  name: string;
  label: string;
  colorVar: string; // tailwind utility suffix
  soft: string;
  strong: string;
}

export const subjects: Subject[] = [
  {
    id: "natuurkunde",
    name: "Natuurkunde",
    label: "Modellen, practica, centrale examens en abstract denken",
    colorVar: "natuurkunde",
    soft: "var(--subj-natuurkunde-soft)",
    strong: "var(--subj-natuurkunde)",
  },
  {
    id: "wiskunde",
    name: "Wiskunde",
    label: "Kernvaardigheden, vaste methodes en grote niveauverschillen",
    colorVar: "wiskunde",
    soft: "var(--subj-wiskunde-soft)",
    strong: "var(--subj-wiskunde)",
  },
  {
    id: "scheikunde",
    name: "Scheikunde",
    label: "Conceptueel denken, practica en veiligheidskaders",
    colorVar: "scheikunde",
    soft: "var(--subj-scheikunde-soft)",
    strong: "var(--subj-scheikunde)",
  },
  {
    id: "informatica",
    name: "Informatica",
    label: "Open projecten, voorkennisverschillen en digitale bronnen",
    colorVar: "informatica",
    soft: "var(--subj-informatica-soft)",
    strong: "var(--subj-informatica)",
  },
  {
    id: "ontwerp",
    name: "Ontwerp & Onderzoek",
    label: "Projectmatig werken, eigen aanpak en rubrics",
    colorVar: "ontwerp",
    soft: "var(--subj-ontwerp-soft)",
    strong: "var(--subj-ontwerp)",
  },
];

export const getSubject = (id: string): Subject | undefined =>
  subjects.find((s) => s.id === id);
