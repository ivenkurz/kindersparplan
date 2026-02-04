import { NextRequest, NextResponse } from "next/server";
import { renditeQuerySchema } from "@/lib/api-schemas";

/**
 * Mock-API: Rendite & Schwankungen basierend auf Risiko
 * sicher (0-33): 4% Rendite, 5% Schwankungen
 * ausgewogen (34-66): 6% Rendite, 12.5% Schwankungen
 * wachstum (67-100): 8% Rendite, 20% Schwankungen
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parsed = renditeQuerySchema.safeParse({
    risiko: searchParams.get("risiko") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { risiko } = parsed.data;

  let rendite: number;
  let schwankungen: number;

  if (risiko <= 33) {
    rendite = 0.04;
    schwankungen = 5;
  } else if (risiko <= 66) {
    rendite = 0.06;
    schwankungen = 12.5;
  } else {
    rendite = 0.08;
    schwankungen = 20;
  }

  const response = { rendite, schwankungen };
  console.log("[API rendite] risiko:", risiko, "->", response);
  return NextResponse.json(response);
}
