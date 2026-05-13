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

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  cards: CardData[];
  positions: Record<string, PlacedCard>;
  subject: Subject;
}

export function SummaryPanel({ open, onOpenChange, cards, positions, subject }: Props) {
  const initial = useMemo(() => buildSummary(cards, positions, subject), [cards, positions, subject]);
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
          <SheetTitle className="font-display text-2xl">Samenvatting</SheetTitle>
          <SheetDescription>
            Een rule-based samenvatting op basis van waar je de kaartjes hebt geplaatst. Pas hem aan en
            kopieer hem naar je notities.
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
                <Check size={16} /> Gekopieerd
              </>
            ) : (
              <>
                <Copy size={16} /> Kopieer samenvatting
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
): string {
  const placed = cards.filter((c) => {
    const p = positions[c.id];
    return p && p.x !== null && p.y !== null;
  });

  if (placed.length === 0) {
    return `Voor ${subject.name} zijn nog geen kaartjes op het bord geplaatst. Sleep eerst kaartjes naar het bord om een samenvatting te genereren.`;
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
    if (!important) {
      buckets.lessImportant.push(c.title);
      continue;
    }
    if (x < 0.38) buckets.convImportant.push(c.title);
    else if (x > 0.62) buckets.divImportant.push(c.title);
    else buckets.tensionImportant.push(c.title);
  }

  const lines: string[] = [];
  lines.push(`Vakbeeld voor ${subject.name}`);
  lines.push("");

  const list = (arr: string[]) => arr.map((t) => `“${t}”`).join(", ");

  if (buckets.convImportant.length) {
    lines.push(
      `Jouw plaatsing suggereert dat je dit vak ziet als een vak met sterke convergente kenmerken, vooral door ${list(
        buckets.convImportant,
      )}.`,
    );
  }
  if (buckets.divImportant.length) {
    lines.push(
      `Tegelijkertijd ontstaat er ruimte voor divergente differentiatie bij ${list(buckets.divImportant)}.`,
    );
  }
  if (buckets.tensionImportant.length) {
    lines.push(
      `Bij ${list(buckets.tensionImportant)} kan spanning ontstaan tussen convergente en divergente keuzes — dit zijn waardevolle gesprekspunten.`,
    );
  }
  if (buckets.lessImportant.length) {
    lines.push(
      `Minder bepalend voor differentiatie binnen jouw vak vind je: ${list(buckets.lessImportant)}.`,
    );
  }

  lines.push("");
  lines.push(
    "Deze samenvatting is geen oordeel maar een spiegel: ze maakt jouw huidige vakbeeld expliciet. Geen goede of foute antwoorden.",
  );

  return lines.join("\n");
}
