import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CardData } from "@/data/cards";
import type { Subject } from "@/data/subjects";

interface Props {
  card: CardData | null;
  subject: Subject;
  onClose: () => void;
}

export function CardInfoModal({ card, subject, onClose }: Props) {
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
                {card.category}
              </div>
              <DialogTitle className="font-display text-xl">{card.title}</DialogTitle>
              <DialogDescription className="text-base text-foreground/80">
                {card.statement}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              {card.sources && card.sources.length > 0 && (
                <Section label="Bronnen">
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    {card.sources.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Section>
              )}
              <p className="rounded-md bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                Geen goede of foute antwoorden — bespreek vooral waarom je dit kaartje daar plaatst.
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
