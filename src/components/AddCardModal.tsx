import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CardData } from "@/data/cards";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (card: CardData) => void;
}

export function AddCardModal({ open, onOpenChange, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !statement.trim()) return;

    const newCard: CardData = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      statement: statement.trim(),
      category: "Eigen inbreng",
    };

    onAdd(newCard);
    setTitle("");
    setStatement("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Eigen kaartje toevoegen</DialogTitle>
          <DialogDescription>
            Voeg een eigen kenmerk, uitspraak of gedachte toe die je belangrijk vindt voor differentiatie binnen jouw vak.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Korte titel</Label>
            <Input
              id="title"
              placeholder="Bijv. 'Creativiteit'"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="statement">Stelling of omschrijving</Label>
            <Textarea
              id="statement"
              placeholder="Beschrijf het kenmerk in één of twee zinnen..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              required
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            <Button type="submit">Toevoegen</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
