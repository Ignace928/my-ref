"use client"
import {motion} from 'framer-motion'

import { PokemonType } from "@/src/lib/Model/pokemon"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import Image from "next/image"
import { usePokemonBrowserStore } from "@/src/store/useBrowsePokemon"


export const PokemonBrowser = ({ data } : {data:PokemonType}) => {
    const {resetPokemn} = usePokemonBrowserStore()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemVariants :any = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
        }
        }
    };

    return(
        <Card className="relative items-center hover:cursor-pointer w-full xs:w-1/2 md:w-1/3 h-3/4 p-4" onClick={resetPokemn}>
            <motion.div 
                className="border-b flex flex-col items-center justify-center" // Ajout de classes de centrage Tailwind ici
                variants={itemVariants}
                initial="hidden" // État initial au montage
                animate="visible" // État final (visible et animé)
                whileHover={{ scale: 1.05 }} // Animation au survol
            >
                
      
            <CardTitle className="border-b flex flex-col items-center gap-2">
                <h1 className='text-center mb-4 text-2xl'>{data.NOM}</h1>
                <Image
                    src={`https://vqtoojvjnpjulqlrtlgd.supabase.co/storage/v1/object/public/mock-pokemon/gen4_general/${data.NUMERO}.png`}
                    height={120} // Assurez-vous que la hauteur et la largeur sont identiques pour un cercle parfait
                    width={120}
                    alt={`${data.NOM}.png`}
                    className="rounded-full aspect-square object-cover border border-primary p-2" // Classes Tailwind
                />
                <div className="flex justify-end gap-2 mt-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                    <Image
                        src={`https://vqtoojvjnpjulqlrtlgd.supabase.co/storage/v1/object/public/mock-pokemon/Type/${data.TYPE_1}.png`}
                        alt={data.TYPE_1 || "aucun"}
                        width={50}
                        height={50}
                    />
                    </div>

                    {data.TYPE_2 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                        <Image
                        src={`https://vqtoojvjnpjulqlrtlgd.supabase.co/storage/v1/object/public/mock-pokemon/Type/${data.TYPE_2}.png`}
                        alt={data.TYPE_2}
                        width={50}
                        height={50}
                        />
                    </div>
                    )}
                </div>
            </CardTitle>
            </motion.div>
            <CardContent className="h-full pt-0 ">
                <div className="flex justify-around font-mono text-sm">
            
            {/* Colonne des titres de statistiques */}
                    <div className="flex flex-col space-y-2 space-x-3 text-left">
                        <span className="font-semibold">Attaque</span>
                        <span className="font-semibold">Att.Spé</span>
                        <span className="font-semibold">Défense</span>
                        <span className="font-semibold">Déf.Spé</span>
                        <span className="font-semibold">Vitesse</span>
                    </div>

                    {/* Colonne des valeurs des statistiques */}
                    <div className="flex flex-col space-y-2 text-right font-bold ">
                        <span>{data.NIVEAU_ATTAQUE}</span>
                        <span>{data.NIVEAU_ATTAQUE_SPECIALE}</span>
                        <span>{data.NIVEAU_DEFENSE}</span>
                        <span>{data.NIVEAU_DEFENSE_SPECIALE}</span>
                        <span>{data.VITESSE}</span>
                    </div>
                    
                </div>

            </CardContent>
            <CardFooter className='text-primary'>
                {data.LEGENDAIRE ? ("Legendaire"):("")}
            </CardFooter>
        </Card>
    )    
}