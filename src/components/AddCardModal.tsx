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
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (card: CardData) => void;
}

export function AddCardModal({ open, onOpenChange, onAdd }: Props) {
  const { language } = useLanguage();
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !statement.trim()) return;

    const newCard: CardData = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      statement: statement.trim(),
      category: language === 'nl' ? "Eigen inbreng" : "Custom",
      titleEn: language === 'en' ? title.trim() : undefined,
      statementEn: language === 'en' ? statement.trim() : undefined,
      categoryEn: "Custom",
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
          <DialogTitle className="font-display text-xl">
            {language === 'nl' ? 'Eigen kaartje toevoegen' : 'Add custom card'}
          </DialogTitle>
          <DialogDescription>
            {language === 'nl' 
              ? 'Voeg een eigen kenmerk, uitspraak of gedachte toe die je belangrijk vindt voor differentiatie binnen jouw vak.' 
              : 'Add a custom characteristic, statement, or thought that you consider important for differentiation within your subject.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">{language === 'nl' ? 'Korte titel' : 'Short title'}</Label>
            <Input
              id="title"
              placeholder={language === 'nl' ? "Bijv. 'Creativiteit'" : "e.g. 'Creativity'"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="statement">{language === 'nl' ? 'Stelling of omschrijving' : 'Statement or description'}</Label>
            <Textarea
              id="statement"
              placeholder={language === 'nl' ? "Beschrijf het kenmerk in één of twee zinnen..." : "Describe the characteristic in one or two sentences..."}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              required
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'nl' ? 'Annuleren' : 'Cancel'}
            </Button>
            <Button type="submit">{language === 'nl' ? 'Toevoegen' : 'Add'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
