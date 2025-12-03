"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { HeaderSidebar } from "../Layout/HeaderS";
import { PokemonType } from "@/src/lib/Model/pokemon";
import { fetch_pokedex } from "@/src/app/(application)/pokedex/action_pokedex";
import { LoaderPinwheel } from "lucide-react";
import { Pokedex } from "./Pokedex";

export function PokedexWrapper() {
  const [data, setData] = useState<PokemonType[] | null>(null);

  useEffect(() => {
    async function load() {
      const result = await fetch_pokedex();
      setData(result);
    }
    load();
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-3">
        <HeaderSidebar title="Pokedex" />
      </div>

      <section className="flex-1">
        <div className="p-4 space-y-4">
          {!data ? (
            <Card className="items-center text-center">
                <LoaderPinwheel className="animate-spin text-primary"/>
            </Card>
          ) : data.length ? (
            <Pokedex data_pokedex={data}/>
          ) : (
            <Card className="items-center text-center">
              <CardTitle>Liste des tâches</CardTitle>
              <CardContent>Aucune tâche 😥</CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
