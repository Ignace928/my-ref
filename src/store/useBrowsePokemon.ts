import { create } from "zustand";
import { PokemonType } from "../lib/Model/pokemon";

interface pokemonBrowserStore {
  pokemon: PokemonType | null;
  setPokemon: (p: PokemonType) => void;
  resetPokemn: () => void;
}

export const usePokemonBrowserStore = create<pokemonBrowserStore>((set) => ({
    pokemon: null,
    setPokemon: (p)=>{
      set({pokemon:p})
    },
    resetPokemn:()=>set({pokemon:null})
}));

