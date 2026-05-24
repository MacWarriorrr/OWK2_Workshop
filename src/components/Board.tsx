import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import type { CardData } from "@/data/cards";
import type { Subject } from "@/data/subjects";
import { useLanguage } from "@/contexts/LanguageContext";

export interface PlacedCard {
  id: string;
  x: number | null; // 0..1 relative to board, null = in tray
  y: number | null;
}

interface BoardProps {
  cards: CardData[];
  positions: Record<string, PlacedCard>;
  subject: Subject;
  onChange: (positions: Record<string, PlacedCard>) => void;
  onInfo: (card: CardData) => void;
}

interface DragState {
  cardId: string;
  pointerX: number;
  pointerY: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

const CARD_W = 180;
const CARD_H = 92;

export function Board({ cards, positions, subject, onChange, onInfo }: BoardProps) {
  const { language } = useLanguage();
  const boardRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<DragState | null>(null);

  useEffect(() => {
    if (!drag) return;
    const onMove = (e: PointerEvent) => {
      setDrag((d) => (d ? { ...d, pointerX: e.clientX, pointerY: e.clientY } : d));
    };
    const onUp = (e: PointerEvent) => {
      const board = boardRef.current;
      if (!board) {
        setDrag(null);
        return;
      }
      const rect = board.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      const next = { ...positions };
      if (inside) {
        // top-left of card so it stays under pointer where grabbed
        const px = e.clientX - rect.left - drag.offsetX;
        const py = e.clientY - rect.top - drag.offsetY;
        // clamp so card stays fully inside
        const maxX = rect.width - CARD_W;
        const maxY = rect.height - CARD_H;
        const cx = Math.max(0, Math.min(maxX, px));
        const cy = Math.max(0, Math.min(maxY, py));
        next[drag.cardId] = {
          id: drag.cardId,
          x: cx / rect.width,
          y: cy / rect.height,
        };
      } else {
        next[drag.cardId] = { id: drag.cardId, x: null, y: null };
      }
      onChange(next);
      setDrag(null);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [drag, positions, onChange]);

  const startDrag = (e: React.PointerEvent, cardId: string) => {
    if ((e.target as HTMLElement).closest("[data-info-btn]")) return;
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setDrag({
      cardId,
      pointerX: e.clientX,
      pointerY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    });
  };

  const placedIds = cards
    .map((c) => c.id)
    .filter((id) => positions[id]?.x !== null && positions[id]?.x !== undefined);
  const trayCards = cards.filter((c) => !placedIds.includes(c.id));

  return (
    <div className="flex flex-col gap-6">
      {/* BOARD */}
      <div className="relative">
        {/* Y label top */}
        <div className="mb-2 flex items-center justify-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {language === 'nl' ? 'Relevant voor mijn dagelijkse lespraktijk' : 'Relevant to my day-to-day teaching'}
        </div>

        <div className="flex items-stretch gap-3">
          {/* X axis labels left */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="rounded-md bg-card px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-foreground shadow-soft whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {language === 'nl' ? 'Convergente differentiatie' : 'Convergent Differentiation'}
            </div>
          </div>

          <div
            ref={boardRef}
            className="board-surface relative flex-1 rounded-2xl border border-border bg-card/60 shadow-soft"
            style={{ aspectRatio: "16 / 10", minHeight: 460 }}
          >
            {/* center cross */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/80" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/80" />

            {/* corner hints */}
            <span className="pointer-events-none absolute left-3 top-3 text-[10px] uppercase tracking-wider text-muted-foreground">
              Relevant · Convergent
            </span>
            <span className="pointer-events-none absolute right-3 top-3 text-right text-[10px] uppercase tracking-wider text-muted-foreground">
              Relevant · Divergent
            </span>
            <span className="pointer-events-none absolute bottom-3 left-3 text-[10px] uppercase tracking-wider text-muted-foreground">
              {language === 'nl' ? 'Niet relevant' : 'Not relevant'} · Convergent
            </span>
            <span className="pointer-events-none absolute bottom-3 right-3 text-right text-[10px] uppercase tracking-wider text-muted-foreground">
              {language === 'nl' ? 'Niet relevant' : 'Not relevant'} · Divergent
            </span>

            {/* placed cards */}
            {cards.map((card) => {
              const pos = positions[card.id];
              if (!pos || pos.x === null || pos.y === null) return null;
              const board = boardRef.current;
              const rect = board?.getBoundingClientRect();
              const left = rect ? pos.x * rect.width : 0;
              const top = rect ? pos.y * rect.height : 0;
              const isDragging = drag?.cardId === card.id;
              if (isDragging) return null;
              return (
                <CardChip
                  key={card.id}
                  card={card}
                  subject={subject}
                  style={{ position: "absolute", left, top, width: CARD_W }}
                  onPointerDown={(e) => startDrag(e, card.id)}
                  onInfo={() => onInfo(card)}
                />
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              className="rounded-md bg-card px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-foreground shadow-soft whitespace-nowrap"
              style={{ writingMode: "vertical-rl" }}
            >
              {language === 'nl' ? 'Divergente differentiatie' : 'Divergent Differentiation'}
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {language === 'nl' ? 'Niet relevant voor mijn dagelijkse lespraktijk' : 'Not relevant to my day-to-day teaching'}
        </div>
      </div>

      {/* TRAY */}
      <div className="rounded-2xl border border-border bg-card/40 p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {language === 'nl' ? 'Kaartjes' : 'Cards'} ({trayCards.length})
          </h3>
          <p className="text-xs text-muted-foreground">
            {language === 'nl' ? 'Sleep een kaartje naar het bord. Geen goede of foute antwoorden.' : 'Drag a card to the board. No right or wrong answers.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {trayCards.map((card) => {
            const isDragging = drag?.cardId === card.id;
            if (isDragging) return <div key={card.id} style={{ width: CARD_W, height: CARD_H }} />;
            return (
              <CardChip
                key={card.id}
                card={card}
                subject={subject}
                style={{ width: CARD_W }}
                onPointerDown={(e) => startDrag(e, card.id)}
                onInfo={() => onInfo(card)}
              />
            );
          })}
          {trayCards.length === 0 && (
            <p className="text-sm text-muted-foreground">{language === 'nl' ? 'Alle kaartjes zijn geplaatst.' : 'All cards have been placed.'}</p>
          )}
        </div>
      </div>

      {/* Floating drag ghost */}
      {drag &&
        (() => {
          const card = cards.find((c) => c.id === drag.cardId);
          if (!card) return null;
          return (
            <div
              style={{
                position: "fixed",
                left: drag.pointerX - drag.offsetX,
                top: drag.pointerY - drag.offsetY,
                width: CARD_W,
                pointerEvents: "none",
                zIndex: 50,
              }}
            >
              <CardChip card={card} subject={subject} dragging onInfo={() => {}} />
            </div>
          );
        })()}
    </div>
  );
}

interface ChipProps {
  card: CardData;
  subject: Subject;
  style?: React.CSSProperties;
  onPointerDown?: (e: React.PointerEvent) => void;
  onInfo: () => void;
  dragging?: boolean;
}

function CardChip({ card, subject, style, onPointerDown, onInfo, dragging }: ChipProps) {
  const { language } = useLanguage();
  const title = language === 'en' && card.titleEn ? card.titleEn : card.title;
  const category = language === 'en' && card.categoryEn ? card.categoryEn : card.category;

  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        ...style,
        background: "var(--card)",
        borderLeft: `4px solid ${subject.strong}`,
      }}
      className={`group select-none rounded-lg border border-border p-2.5 transition-shadow ${
        dragging ? "shadow-lift rotate-[1.5deg] cursor-grabbing" : "shadow-card hover:shadow-lift cursor-grab"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div
            className="mb-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
            style={{ background: subject.soft, color: subject.strong }}
          >
            {category}
          </div>
          <div className="truncate text-sm font-semibold text-foreground" title={title}>
            {title}
          </div>
        </div>
        <button
          data-info-btn
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInfo();
          }}
          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Toon uitleg"
        >
          <Info size={14} />
        </button>
      </div>
    </div>
  );
}
