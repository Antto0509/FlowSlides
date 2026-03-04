import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z.string().min(1).max(500),
  author_name: z.string().min(1).max(80),
  author_role: z.string().max(80).optional(),
  author_company: z.string().max(80).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const supabase = await createClient(cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté pour laisser un avis." }, { status: 401 });
  }

  const { error } = await supabase.from("reviews").insert({
    user_id: user.id,
    rating: parsed.data.rating,
    content: parsed.data.content,
    author_name: parsed.data.author_name,
    author_role: parsed.data.author_role ?? null,
    author_company: parsed.data.author_company ?? null,
  });

  if (error) {
    console.error("Review insert error:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
