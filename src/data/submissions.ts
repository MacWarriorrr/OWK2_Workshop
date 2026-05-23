import { createServerFn } from '@tanstack/react-start';
import { getEvent } from 'vinxi/http'; // Belangrijk voor het ophalen van de Cloudflare context

export type Submission = {
  id: string;
  description: string;
  image_url: string;
  created_at: string;
};

// Helper om bindings op te halen, onafhankelijk van de actieve omgeving (dev of prod)
function getPlatformEnv() {
  try {
    // 1. Probeer de Cloudflare Pages productietext te lezen via Vinxi/H3
    const event = getEvent();
    if (event?.context?.cloudflare?.env) {
      return event.context.cloudflare.env;
    }
  } catch (e) {
    // Slik de fout build-time / lokaal desgewenst in
  }

  // 2. Fallback naar globalThis (voor specifieke lokale emulators)
  if ((globalThis as any).WORKSHOP_DB) {
    return globalThis as any;
  }

  // 3. Fallback naar process.env (voor standaard Vite/Node dev)
  return process.env;
}

export const getSubmissions = createServerFn({ method: 'GET' })
  .handler(async () => {
    const env = getPlatformEnv();
    const db = env?.WORKSHOP_DB;

    if (!db) {
      console.warn("WORKSHOP_DB niet gevonden. Controleer de bindings.");
      return [];
    }

    try {
      const { results } = (await db.prepare("SELECT * FROM submissions ORDER BY created_at DESC").all()) as { results: Submission[] };
      return results || [];
    } catch (e) {
      console.error("Fout bij ophalen submissions:", e);
      return [];
    }
  });

export const createSubmission = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const description = data.get('description') as string;
    const file = data.get('image') as File | null;

    if (!description || !file) {
      throw new Error("Beschrijving of afbeelding ontbreekt");
    }

    const env = getPlatformEnv();
    const db = env?.WORKSHOP_DB;
    const r2 = env?.WORKSHOP_IMAGES;

    if (!db || !r2) {
      throw new Error("Cloudflare bindings niet beschikbaar in deze omgeving.");
    }

    // Unieke ID en bestandsnaam genereren
    const id = crypto.randomUUID();
    const fileExt = file.name.split('.').pop() || 'jpg';
    const filename = `${id}.${fileExt}`;

    // Bestand converteren naar ArrayBuffer voor R2 opslag
    const arrayBuffer = await file.arrayBuffer();

    // Upload naar R2
    await r2.put(filename, arrayBuffer, {
      httpMetadata: { contentType: file.type }
    });

    const imageUrl = `/api/images/${filename}`;

    // Opslaan in D1 SQL database
    await db.prepare(
      "INSERT INTO submissions (id, description, image_url) VALUES (?, ?, ?)"
    ).bind(id, description, imageUrl).run();

    return { success: true, id };
  });

export const deleteSubmission = createServerFn({ method: 'POST' })
  .inputValidator((id: unknown) => {
    if (typeof id !== 'string') throw new Error('Invalid ID');
    return id;
  })
  .handler(async ({ data: id }) => {
    const env = getPlatformEnv();
    const db = env?.WORKSHOP_DB;
    const r2 = env?.WORKSHOP_IMAGES;

    if (!db || !r2) {
      throw new Error("Cloudflare bindings niet beschikbaar in deze omgeving.");
    }

    // Get submission to find image filename
    const { results } = await db.prepare("SELECT image_url FROM submissions WHERE id = ?").bind(id).all();
    if (results && results.length > 0) {
      const imageUrl = (results[0] as any).image_url as string;
      const filename = imageUrl.split('/').pop();
      if (filename) {
        await r2.delete(filename);
      }
    }

    // Delete from DB
    await db.prepare("DELETE FROM submissions WHERE id = ?").bind(id).run();

    return { success: true };
  });