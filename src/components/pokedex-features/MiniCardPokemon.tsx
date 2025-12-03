"use client";

import { PokemonType } from "@/src/lib/Model/pokemon";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";


type Props = {
    pokemon: PokemonType,
    onClick:(p: PokemonType) => void
}

export function MiniCardPokemon({pokemon, onClick}:Props){
    return (
        <Card
            role="button"
            tabIndex={0}
            onClick={() => onClick?.(pokemon)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick?.(pokemon);
            }}
            className="cursor-pointer border border-primary/50 rounded-lg 
                        hover:shadow-lg hover:-translate-y-1 transition-all 
                        p-3"
            >
            <CardContent className="space-y-2 text-center">
                
                {/* Numéro */}
                <p className="text-xs text-muted-foreground font-semibold">
                #{pokemon.NUMERO}
                </p>

                {/* Nom */}
                <p className="text-sm font-bold truncate">
                {pokemon.NOM}
                </p>

                {/* Types */}
                <div className="flex justify-between gap-2 mt-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                    <Image
                        src={`https://vqtoojvjnpjulqlrtlgd.supabase.co/storage/v1/object/public/mock-pokemon/Type/${pokemon.TYPE_1}.png`}
                        alt={pokemon.TYPE_1 || "aucun"}
                        width={50}
                        height={50}
                    />
                    </div>

                    {pokemon.TYPE_2 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                        <Image
                        src={`https://vqtoojvjnpjulqlrtlgd.supabase.co/storage/v1/object/public/mock-pokemon/Type/${pokemon.TYPE_2}.png`}
                        alt={pokemon.TYPE_2}
                        width={50}
                        height={50}
                        />
                    </div>
                    )}
                </div>
            </CardContent>
            </Card>
    )
}