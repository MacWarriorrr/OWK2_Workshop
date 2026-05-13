import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const questions = [
  "Welke kaartjes liggen het meest richting convergent?",
  "Welke kaartjes liggen het meest richting divergent?",
  "Welke kaartjes heb je het hoogst geplaatst, en waarom?",
  "Welke kaartjes veroorzaken de meeste spanning?",
  "Waar botst jouw persoonlijke voorkeur met wat het vak lijkt te vragen?",
  "Wat betekent dit voor hoe je differentiatie in dit vak zou vormgeven?",
  "Welke vormen van differentiatie lijken haalbaar binnen jouw vakcontext?",
  "Welke verschillen tussen leerlingen wil je verkleinen, en welke verschillen wil je juist ruimte geven?",
];

export function ReflectionPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Reflectievragen</SheetTitle>
          <SheetDescription>
            Gebruik deze vragen om je plaatsing te bespreken — alleen of met een collega.
          </SheetDescription>
        </SheetHeader>
        <ol className="mt-6 space-y-4 px-4 pb-8">
          {questions.map((q, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-border bg-card/60 p-3">
              <span className="font-display text-lg font-semibold text-primary">{i + 1}.</span>
              <span className="text-sm text-foreground/90">{q}</span>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
