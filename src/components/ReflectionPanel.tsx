import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const questionsSections = [
  {
    title: "Opstart vragen",
    questions: [
      "Welke leerlingen geef je meer tijd in je lessen?",
      "Op wat voor manieren differentieer je op dit moment in je lessen?",
      "Geef een voorbeeld van convergente/divergent differentiatie die je in je les hebt toegepast?",
    ],
  },
  {
    title: "Proces vragen",
    questions: [
      "Waarop baseren jullie deze plaatsing?",
      "Hoe erg houdt je hier bewust rekening mee?",
      "Doen jullie dit in je les omdat het een vereiste is, of omdat je het zelf belangrijk vindt?",
      "Heb je zelf een voorkeur voor convergente of divergente differentiatie?",
      "Welke van de kaartjes is het meest belangrijk en het minst belangrijk?",
      "Welke kaart is je minst favoriete en hoe wordt je hier toch toe gedwongen?",
    ],
  },
  {
    title: "Afrondende vragen",
    questions: [
      "Zien jullie een patroon in de verdeling van je kaarten op de assen?",
      "Had je zelf deze verdeling van tevoren verwacht?",
      "Met deze indeling, zien jullie dan een link tussen het vak wat je geeft en de differentiatie methode?",
      "Welke kaartjes zou je willen toevoegen, of het liefste weghalen?",
      "Wat zegt deze verdeling van kaartjes over je eigen aannames over differentatie?",
    ],
  },
  {
    title: "Afsluitende vragen (Klassikaal)",
    questions: [
      "Zien jullie samenhang tussen je visie op differentatie en het vak waarin je lesgeeft?",
      "Wat is het grootste verschil dat je ziet tussen de posters?",
      "Waar ga je na deze workshop anders over nadenken in je lesgeef praktijk?",
    ],
  }
];

const questionsSectionsEn = [
  {
    title: "Warming-up questions",
    questions: [
      "Are there students that you offer more support during your lesson, and why?",
      "In what ways do you use differentiation in your current lessons?",
      "Do you have an example of your use of divergent/convergent differentiation?",
    ],
  },
  {
    title: "Extending questions",
    questions: [
      "What assumptions underly the placement of this card?",
      "How much are you consciouscly thinking about the contents of this card during your lesson?",
      "Do you perform this action because it is required or because you find it personally important?",
      "Do you think you have a personal preference to either strategy?",
      "Which of these cards is most important to you?",
      "Which card is your least favorite and how are you still forced into this?",
    ],
  },
  {
    title: "Reflecting questions",
    questions: [
      "Is there a pattern in the placement of the cards?",
      "Did you expect the location of these cards at the start of the workshop?",
      "Having performed this exercise, do you see a link between your course and your practiced differentiation strategy?",
      "Which cards would you like to add?",
      "What assumptions underly the placement of this card?",
    ],
  },
  {
    title: "Concluding questions (Plenary)",
    questions: [
      "Having performed this exercise, do you see a link between your course and your practiced differentiation strategy?",
      "What is the biggest difference you see between posters?",
      "What are you taking with you after this course has been done?",
    ],
  }
];

import { useLanguage } from "@/contexts/LanguageContext";

export function ReflectionPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { language } = useLanguage();
  const sections = language === 'nl' ? questionsSections : questionsSectionsEn;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">
            {language === 'nl' ? 'Reflectievragen' : 'Reflection questions'}
          </SheetTitle>
          <SheetDescription>
            {language === 'nl' 
              ? 'Gebruik deze vragen om je plaatsing te bespreken — alleen of met een collega.'
              : 'Use these questions to discuss your placement — alone or with a colleague.'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-8 px-4 pb-8">
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              <h3 className="mb-3 font-display text-lg font-semibold tracking-tight text-primary">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.questions.map((q, qIdx) => (
                  <li key={qIdx} className="flex gap-3 rounded-lg border border-border bg-card/60 p-3">
                    <span className="text-sm text-foreground/90">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
