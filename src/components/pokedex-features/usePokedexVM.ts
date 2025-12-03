"use client";

import { fetch_pokedex } from "@/src/app/(application)/pokedex/action_pokedex";
import { useQuery } from "@tanstack/react-query";

export function usePokedexVM(){
    const {data, isLoading, error} = useQuery({
        queryKey:["pokedex"],
        queryFn: () => fetch_pokedex(),
        staleTime: 10_000
    })

    //Nous pouvons jouter ici les mutation si necessaire


    return{
        data: data??[],
        isLoading,
        error
    }
}