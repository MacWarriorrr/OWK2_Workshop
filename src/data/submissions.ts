import { createServerFn } from '@tanstack/react-start';

export type Submission = {
  id: string;
  description: string;
  image_url: string;
  created_at: string;
};

// Global augmentation for Cloudflare Env
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WORKSHOP_DB: D1Database;
      WORKSHOP_IMAGES: R2Bucket;
    }
  }
}

export const getSubmissions = createServerFn({ method: 'GET' })
  .handler(async () => {
    // In dev @cloudflare/vite-plugin or in prod global bindings might be accessible via process.env
    // TanStack Start server functions can also access H3 event, but we'll try process.env first.
    let db = process.env.WORKSHOP_DB;

    // Fallback for some Cloudflare environments where bindings are attached to globalThis
    if (!db) {
      db = (globalThis as any).WORKSHOP_DB;
    }

    if (!db) {
      console.warn("WORKSHOP_DB not found in process.env or globalThis. Returning empty array.");
      return [];
    }

    try {
      const { results } = await db.prepare("SELECT * FROM submissions ORDER BY created_at DESC").all<Submission>();
      return results || [];
    } catch (e) {
      console.error("Failed to fetch submissions:", e);
      return [];
    }
  });

export const createSubmission = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const description = data.get('description') as string;
    const file = data.get('image') as File | null;

    if (!description || !file) {
      throw new Error("Missing description or image");
    }

    let db = process.env.WORKSHOP_DB;
    let r2 = process.env.WORKSHOP_IMAGES;

    if (!db || !r2) {
      db = db || (globalThis as any).WORKSHOP_DB;
      r2 = r2 || (globalThis as any).WORKSHOP_IMAGES;
    }

    if (!db || !r2) {
      throw new Error("Cloudflare bindings not available.");
    }

    // Generate unique ID
    const id = crypto.randomUUID();
    const fileExt = file.name.split('.').pop() || 'jpg';
    const filename = `${id}.${fileExt}`;

    // Convert File to ArrayBuffer for R2
    const arrayBuffer = await file.arrayBuffer();

    // Upload to R2
    await r2.put(filename, arrayBuffer, {
      httpMetadata: { contentType: file.type }
    });

    // We assume the bucket is configured for public access or a worker routes to it.
    // For now, we will just store the filename or a constructed URL.
    // Assuming the R2 bucket is public via a domain (e.g. images.yourdomain.com),
    // or we might need to serve it from a route. 
    // Let's create an API route to serve R2 images, or store the relative path:
    const imageUrl = `/api/images/${filename}`;

    // Insert into D1
    await db.prepare(
      "INSERT INTO submissions (id, description, image_url) VALUES (?, ?, ?)"
    ).bind(id, description, imageUrl).run();

    return { success: true, id };
  });
