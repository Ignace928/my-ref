import { Pokedex } from "@prisma/client";
import { z } from "zod";

// Définir le schéma
const PokemonSchema = z.object({
    NUMERO: z.number(),
    NOM: z.string(),
    TYPE_1: z.string(),
    TYPE_2: z.string().nullable(),
    POINTS_DE_VIE: z.number(),
    NIVEAU_ATTAQUE: z.number(),
    NIVEAU_DEFENSE: z.number(),
    NIVEAU_ATTAQUE_SPECIALE: z.number(),
    NIVEAU_DEFENSE_SPECIALE: z.number(),
    VITESSE: z.number(),
    GENERATION: z.number(),
    LEGENDAIRE: z.boolean(),
  })

export type PokemonType = Pokedex

// Pour un tableau
export const PokedexSchema = z.array(PokemonSchema);
