import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { PokedexSchema } from "@/src/lib/Model/pokemon";
import { createClient } from "@/src/utils/supabase/server";

export async function GET() {
  try {
    // 1️⃣ Vérification de session Supabase
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Récupérer les données si user OK
    const pokedex = await prisma.pokedex.findMany();
    const parsedPokedex = PokedexSchema.parse(pokedex);

    return NextResponse.json(parsedPokedex);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Impossible de récupérer le Pokedex" },
      { status: 500 }
    );
  }
}
