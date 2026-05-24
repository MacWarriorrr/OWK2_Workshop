import { useEffect, useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { CardData } from "@/data/cards";
import type { PlacedCard } from "./Board";
import type { Subject } from "@/data/subjects";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  cards: CardData[];
  positions: Record<string, PlacedCard>;
  subject: Subject;
}

export function SummaryPanel({ open, onOpenChange, cards, positions, subject }: Props) {
  const { language } = useLanguage();
  const initial = useMemo(() => buildSummary(cards, positions, subject, language), [cards, positions, subject, language]);
  const [text, setText] = useState(initial);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) setText(initial);
  }, [open, initial]);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">{language === 'nl' ? 'Samenvatting' : 'Summary'}</SheetTitle>
          <SheetDescription>
            {language === 'nl' ? 'Een rule-based samenvatting op basis van waar je de kaartjes hebt geplaatst. Pas hem aan en kopieer hem naar je notities.' : 'A rule-based summary based on where you placed the cards. Edit and copy it to your notes.'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4 px-4 pb-8">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[280px] text-sm leading-relaxed"
          />
          <Button onClick={copy} className="w-full" variant="default">
            {copied ? (
              <>
                <Check size={16} /> {language === 'nl' ? 'Gekopieerd' : 'Copied'}
              </>
            ) : (
              <>
                <Copy size={16} /> {language === 'nl' ? 'Kopieer samenvatting' : 'Copy summary'}
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function buildSummary(
  cards: CardData[],
  positions: Record<string, PlacedCard>,
  subject: Subject,
  language: Language
): string {
  const placed = cards.filter((c) => {
    const p = positions[c.id];
    return p && p.x !== null && p.y !== null;
  });

  if (placed.length === 0) {
    return language === 'nl' 
      ? `Voor ${subject.name} zijn nog geen kaartjes op het bord geplaatst. Sleep eerst kaartjes naar het bord om een samenvatting te genereren.`
      : `No cards have been placed on the board for ${subject.name} yet. Drag cards to the board first to generate a summary.`;
  }

  const buckets = {
    convImportant: [] as string[],
    divImportant: [] as string[],
    tensionImportant: [] as string[],
    lessImportant: [] as string[],
  };

  for (const c of placed) {
    const p = positions[c.id]!;
    const x = p.x!; // 0..1, left=0=convergent
    const y = p.y!; // 0..1, top=0=zeer belangrijk
    const important = y < 0.5;
    const title = language === 'en' && c.titleEn ? c.titleEn : c.title;

    if (!important) {
      buckets.lessImportant.push(title);
      continue;
    }
    if (x < 0.38) buckets.convImportant.push(title);
    else if (x > 0.62) buckets.divImportant.push(title);
    else buckets.tensionImportant.push(title);
  }

  const lines: string[] = [];
  lines.push(language === 'nl' ? `Vakbeeld voor ${subject.name}` : `Subject view for ${subject.name}`);
  lines.push("");

  const list = (arr: string[]) => arr.map((t) => `“${t}”`).join(", ");

  if (buckets.convImportant.length) {
    lines.push(
      language === 'nl'
        ? `Jouw plaatsing suggereert dat je dit vak ziet als een vak met sterke convergente kenmerken, vooral door ${list(buckets.convImportant)}.`
        : `Your placement suggests that you view this subject as having strong convergent characteristics, especially due to ${list(buckets.convImportant)}.`
    );
  }
  if (buckets.divImportant.length) {
    lines.push(
      language === 'nl'
        ? `Tegelijkertijd ontstaat er ruimte voor divergente differentiatie bij ${list(buckets.divImportant)}.`
        : `At the same time, there is room for divergent differentiation regarding ${list(buckets.divImportant)}.`
    );
  }
  if (buckets.tensionImportant.length) {
    lines.push(
      language === 'nl'
        ? `Bij ${list(buckets.tensionImportant)} kan spanning ontstaan tussen convergente en divergente keuzes — dit zijn waardevolle gesprekspunten.`
        : `With ${list(buckets.tensionImportant)}, tension may arise between convergent and divergent choices — these are valuable discussion points.`
    );
  }
  if (buckets.lessImportant.length) {
    lines.push(
      language === 'nl'
        ? `Minder bepalend voor differentiatie binnen jouw vak vind je: ${list(buckets.lessImportant)}.`
        : `You find the following less decisive for differentiation within your subject: ${list(buckets.lessImportant)}.`
    );
  }

  lines.push("");
  lines.push(
    language === 'nl'
      ? "Deze samenvatting is geen oordeel maar een spiegel: ze maakt jouw huidige vakbeeld expliciet. Geen goede of foute antwoorden."
      : "This summary is not a judgment but a mirror: it makes your current subject view explicit. No right or wrong answers."
  );

  return lines.join("\n");
}
