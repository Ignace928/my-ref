"use server";

import { cache } from "react";
import prisma from "@/src/lib/prisma";
import { createClient } from "./server";


export async function getCurrentUser() {//Pour l'utilisation côté server avec Prisma
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.email,
    },
    create: {
      id: user.id,
      email: user.email,
    },
  });

}

export async function getSupabaseUser() { //Pour l'utilisation côté layout / RSC, sans Prisma
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "default",
  };
}



// export const getSupabaseUser = cache(async ()  => {
//   const dbUser = await prisma.user.findUnique({
//     where:{id:"user2"}
//   })
//   if(!dbUser) return {id:"null", email:"no"}
//   return {
//     id : dbUser.id,
//     email: dbUser.id,
//   };
// })



// export const getCurrentUser = cache(async () => {
//   const dbUser = await prisma.user.findUnique({
//     where: { id: "user2" },
//   });

//   if (!dbUser) {
//     return  {id:"null", email:"no"};
//   }

//   return {
//     id: dbUser.id,
//     email: dbUser.id,
//   };
// });
