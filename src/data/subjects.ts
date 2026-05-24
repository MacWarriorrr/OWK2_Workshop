export type SubjectId =
  | "natuurkunde"
  | "wiskunde"
  | "scheikunde"
  | "informatica"
  | "ontwerp";

export interface Subject {
  id: SubjectId;
  name: string;
  nameEn?: string;
  label: string;
  labelEn?: string;
  colorVar: string; // tailwind utility suffix
  soft: string;
  strong: string;
}

export const subjects: Subject[] = [
  {
    id: "natuurkunde",
    name: "Natuurkunde",
    nameEn: "Physics",
    label: "Modellen, practica, centrale examens en abstract denken",
    labelEn: "Models, practicals, central exams and abstract thinking",
    colorVar: "natuurkunde",
    soft: "var(--subj-natuurkunde-soft)",
    strong: "var(--subj-natuurkunde)",
  },
  {
    id: "wiskunde",
    name: "Wiskunde",
    nameEn: "Mathematics",
    label: "Kernvaardigheden, vaste methodes en grote niveauverschillen",
    labelEn: "Core skills, fixed methods and large level differences",
    colorVar: "wiskunde",
    soft: "var(--subj-wiskunde-soft)",
    strong: "var(--subj-wiskunde)",
  },
  {
    id: "scheikunde",
    name: "Scheikunde",
    nameEn: "Chemistry",
    label: "Conceptueel denken, practica en veiligheidskaders",
    labelEn: "Conceptual thinking, practicals and safety frameworks",
    colorVar: "scheikunde",
    soft: "var(--subj-scheikunde-soft)",
    strong: "var(--subj-scheikunde)",
  },
  {
    id: "informatica",
    name: "Informatica",
    nameEn: "Computer Science",
    label: "Open projecten, voorkennisverschillen en digitale bronnen",
    labelEn: "Open projects, prior knowledge differences and digital resources",
    colorVar: "informatica",
    soft: "var(--subj-informatica-soft)",
    strong: "var(--subj-informatica)",
  },
  {
    id: "ontwerp",
    name: "Ontwerp & Onderzoek",
    nameEn: "Research & Design",
    label: "Projectmatig werken, eigen aanpak en rubrics",
    labelEn: "Project-based work, own approach and rubrics",
    colorVar: "ontwerp",
    soft: "var(--subj-ontwerp-soft)",
    strong: "var(--subj-ontwerp)",
  },
];

export const getSubject = (id: string): Subject | undefined =>
  subjects.find((s) => s.id === id);
