// src/hooks/use-pokedex.ts
import { useQuery } from "@tanstack/react-query";

export type Pokemon = {
  NUMERO: number;
  NOM: string;
  TYPE_1: string;
  TYPE_2?: string;
  POINTS_DE_VIE: number;
  NIVEAU_ATTAQUE: number;
  NIVEAU_DEFENSE: number;
  NIVEAU_ATTAQUE_SPECIALE: number;
  NIVEAU_DEFENSE_SPECIALE: number;
  VITESSE: number;
  GENERATION: number;
  LEGENDAIRE: boolean;
};

export const usePokedex = () => {
  return useQuery<Pokemon[], Error>({
    queryKey: ["pokedex"],
    queryFn: async () => {
      const res = await fetch("/api/pokedex");
      if (!res.ok) throw new Error("Erreur lors du fetch du Pokedex");
      const data = await res.json();
      return data;
    },
  });
};
