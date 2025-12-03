"use client";

import { PokemonType } from "@/src/lib/Model/pokemon";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { usePokedexVM } from "./usePokedexVM";
import { useMemo, useState } from "react";
import { MiniCardPokemon } from "./MiniCardPokemon";
import { Card, CardContent } from "../ui/card";
import { LoaderPinwheel, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Field } from "../ui/field";

type Props = {
    data_pokedex:PokemonType[],
    onSelect?: (pokemon: PokemonType) => void
}
export const column_Pokedex : ColumnDef<PokemonType>[] = [
    {accessorKey:"NUMERO", header:"Numero"},
    {accessorKey:"NOM", header:"Nom"},
    {accessorKey:"TYPE_1", header:'Type 1'},
    {accessorKey:"TYPE_2", header:'Type 2'},
    {accessorKey:"LEGENDAIRE", header:"Rareté"}
]

export function Pokedex({data_pokedex, onSelect}:Props){
    const [filterType1, setFilterType1] = useState<string>("");
    const [filterType2, setFilterType2] = useState<string>("");
    const { data: liveData, isLoading, error } = usePokedexVM()

    const filteredData = useMemo(() => {
    const base = liveData ?? data_pokedex;

        return base.filter(p => {
            const match1 = filterType1 === "all" || !filterType1 ? true : p.TYPE_1 === filterType1;
            const match2 = filterType2 === "all" || !filterType2 ? true : p.TYPE_2 === filterType2;
            return match1 && match2;
        });
    }, [liveData, data_pokedex, filterType1, filterType2]);

    const uniqueType1 = useMemo(() => {
        const base = liveData ?? data_pokedex;
        return Array.from(new Set(base.map(p => p.TYPE_1).filter(Boolean)));
    }, [liveData, data_pokedex]);

    const uniqueType2 = useMemo(() => {
        const base = liveData ?? data_pokedex;
        return Array.from(new Set(base.map(p => p.TYPE_2).filter(Boolean)));
    }, [liveData, data_pokedex]);



    const Table = useReactTable(
        useMemo(() => ({
            data : filteredData,
            columns : column_Pokedex,
            getCoreRowModel : getCoreRowModel()
        }), [filteredData])
    )
    if(isLoading) return(
        <Card className="items-center text-center">
            Mise en Cache...
            <LoaderPinwheel className="animate-spin text-primary"/>
        </Card>
    )
    if(error) return(<p className="text-red-600 p-4">Erreur de chargement</p>)
    
    return(
        <div>
            <div className="sticky top-16 z-9 bg-background border-b p-2 flex items-center gap-3">
                <div className="flex gap-4 p-2">
                    <Field>
                        <Input
                            type="text"
                            // value={globalFilter}
                            // onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Rechercher une tâche…"
                            className="border p-2 rounded w-64"
                            />
                        <p className="text-secondary-foreground decoration-2">{Table.getRowCount()} Pokemon</p>
                    </Field>
                </div>
                <div className="flex gap-4 p-2">
                    <Field>
                    <Select
                        name="type1"
                        value={filterType1}
                        onValueChange={(value) => setFilterType1(value)}
                    >
                        <SelectTrigger className="w-48 border px-3 py-2 rounded-md">
                            <SelectValue placeholder="Tous Type 1" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous Type 1</SelectItem>
                            {uniqueType1.map((t) => (
                            <SelectItem key={t} value={t || ""}>
                                {t}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                    value={filterType2}
                    onValueChange={(value) => setFilterType2(value)}
                    >
                        <SelectTrigger className="w-48 border px-3 py-2 rounded-md">
                            <SelectValue placeholder="Tous Type 1" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous Type 2</SelectItem>
                            {uniqueType2.map((t) => (
                            <SelectItem key={t} value={t || ""}>
                                {t}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    </Field>
                
                </div>
            </div>
            <div className="mt-3 grid gap-3 grid-cols-1 min-[370]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {
                    Table.getRowModel().rows.length ? (
                        Table.getRowModel().rows.map((r) => (
                            <MiniCardPokemon
                                key={r.id}
                                pokemon={r.original}
                                onClick={() => onSelect}
                            />
                        ))
                    ):(
                        <Card className="h-100 items-center text-center">
                            <CardContent className="w-full">
                                Aucun donné trouvée
                            </CardContent>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}