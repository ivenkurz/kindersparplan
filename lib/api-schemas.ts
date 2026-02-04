import { z } from "zod";

/**
 * Schema für API rendite: Query-Parameter risiko (0–100), optional, Default 50.
 * Zentrale Validierung für alle API-Routen (Code-Review: Schema-Validierung).
 */
export const renditeQuerySchema = z.object({
  risiko: z.preprocess(
    (v) => (v == null || v === "" ? 50 : Number(v)),
    z.number().min(0).max(100)
  ),
});

export type RenditeQuery = z.infer<typeof renditeQuerySchema>;
