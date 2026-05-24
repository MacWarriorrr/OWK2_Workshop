import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, FileText, MessageSquareQuote, RotateCcw, Plus } from "lucide-react";
import { Board, type PlacedCard } from "@/components/Board";
import { CardInfoModal } from "@/components/CardInfoModal";
import { ReflectionPanel } from "@/components/ReflectionPanel";
import { SummaryPanel } from "@/components/SummaryPanel";
import { AddCardModal } from "@/components/AddCardModal";
import { Button } from "@/components/ui/button";
import { cardsBySubject, type CardData } from "@/data/cards";
import { getSubject } from "@/data/subjects";

export const Route = createFileRoute("/activiteit/$vak")({
  loader: ({ params }) => {
    const subject = getSubject(params.vak);
    if (!subject) throw notFound();
    return { subject };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.subject.name} — Activiteit · Differentiatie`
          : "Activiteit",
      },
      {
        name: "description",
        content: "Plaats kaartjes met vakkenmerken op een bord met twee assen.",
      },
    ],
  }),
  component: ActiviteitPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl">Vak niet gevonden</h1>
      <p className="mt-2 text-muted-foreground">Kies een vak op de vakkeuzepagina.</p>
      <Link
        to="/vakken"
        className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Naar vakkeuze
      </Link>
    </div>
  ),
});

function ActiviteitPage() {
  const { subject } = Route.useLoaderData();
  const cards: CardData[] = cardsBySubject[subject.id as keyof typeof cardsBySubject];
  const [customCards, setCustomCards] = useState<CardData[]>([]);
  const [positions, setPositions] = useState<Record<string, PlacedCard>>({});
  const [infoCard, setInfoCard] = useState<CardData | null>(null);
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const allCards = [...cards, ...customCards];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            to="/vakken"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} /> Terug naar vakkeuze
          </Link>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Plaats de kaartjes op het bord
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Sleep de kaartjes naar het bord. Bepaal per kaartje eerst hoe relevant dit kenmerk is
            voor jouw dagelijkse lespraktijk. Bepaal daarna of het kenmerk eerder richting
            convergente of divergente differentiatie wijst.
          </p>
        </div>
        <div
          className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-wider shadow-soft"
          style={{ color: subject.strong }}
        >
          Vak: {subject.name}
        </div>
      </div>

      {/* Axis explanations */}
      <div className="mb-6 grid gap-3 rounded-xl border border-border bg-card/60 p-4 text-sm shadow-soft sm:grid-cols-3">
        <Axis label="Convergente differentiatie" body="Leerlingen werken toe naar gemeenschappelijke kernstof, gedeelde doelen of eenzelfde eindniveau." />
        <Axis label="Divergente differentiatie" body="Verschillen tussen leerlingen krijgen ruimte in tempo, niveau, interesse, aanpak of product." />
        <Axis label="Relevantie" body="Hoe relevant vind je dit kenmerk voor jouw dagelijkse lespraktijk?" />
      </div>

      <Board
        cards={allCards}
        positions={positions}
        subject={subject}
        onChange={setPositions}
        onInfo={setInfoCard}
      />

      <div className="mt-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
        Er zijn geen goede of foute antwoorden. Bespreek vooral waarom je een kaartje daar plaatst.
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setPositions({})}>
          <RotateCcw size={14} /> Reset bord
        </Button>
        <Button variant="outline" onClick={() => setAddModalOpen(true)}>
          <Plus size={14} /> Eigen kaartje toevoegen
        </Button>
        <Button variant="outline" onClick={() => setReflectionOpen(true)}>
          <MessageSquareQuote size={14} /> Toon reflectievragen
        </Button>
        <Button onClick={() => setSummaryOpen(true)}>
          <FileText size={14} /> Maak samenvatting
        </Button>
        <Link
          to="/bronnen"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
        >
          <BookOpen size={14} /> Toon bronnen
        </Link>
      </div>

      <CardInfoModal card={infoCard} subject={subject} onClose={() => setInfoCard(null)} />
      <ReflectionPanel open={reflectionOpen} onOpenChange={setReflectionOpen} />
      <SummaryPanel
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
        cards={allCards}
        positions={positions}
        subject={subject}
      />
      <AddCardModal 
        open={addModalOpen} 
        onOpenChange={setAddModalOpen} 
        onAdd={(card) => setCustomCards([...customCards, card])} 
      />
    </section>
  );
}

function Axis({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
        {label}
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">{body}</p>
    </div>
  );
}
