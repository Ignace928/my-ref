"use server"

import prisma from "@/src/lib/prisma"

export async function fetch_pokedex(){
    return prisma.pokedex.findMany({
        orderBy:{NUMERO:"asc"}
    })
}
