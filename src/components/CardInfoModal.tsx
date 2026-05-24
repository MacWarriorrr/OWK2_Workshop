import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CardData } from "@/data/cards";
import type { Subject } from "@/data/subjects";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  card: CardData | null;
  subject: Subject;
  onClose: () => void;
}

export function CardInfoModal({ card, subject, onClose }: Props) {
  const { language } = useLanguage();
  const title = language === 'en' && card?.titleEn ? card.titleEn : card?.title;
  const statement = language === 'en' && card?.statementEn ? card.statementEn : card?.statement;
  const category = language === 'en' && card?.categoryEn ? card.categoryEn : card?.category;

  return (
    <Dialog open={!!card} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        {card && (
          <>
            <DialogHeader>
              <div
                className="mb-1 inline-block w-fit rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wider"
                style={{ background: subject.soft, color: subject.strong }}
              >
                {category}
              </div>
              <DialogTitle className="font-display text-xl">{title}</DialogTitle>
              <DialogDescription className="text-base text-foreground/80">
                {statement}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              {card.sources && card.sources.length > 0 && (
                <Section label={language === 'nl' ? "Bronnen" : "Sources"}>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    {card.sources.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Section>
              )}
              <p className="rounded-md bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                {language === 'nl' ? 'Geen goede of foute antwoorden — bespreek vooral waarom je dit kaartje daar plaatst.' : 'No right or wrong answers — primarily discuss why you place this card there.'}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-foreground/90">{children}</div>
    </div>
  );
}
