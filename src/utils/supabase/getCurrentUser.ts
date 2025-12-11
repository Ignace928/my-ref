"use server";

import prisma from "@/src/lib/prisma";
import { createClient } from "./server";


// export async function getCurrentUser() {//Pour l'utilisation côté server avec Prisma
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) return null;

//   const dbUser = await prisma.user.upsert({
//     where: { id: user.id },
//     update: {},
//     create: { id: user.id }
//   });

//   return {
//     id: dbUser.id,
//     email: user.email || "default",
//   };
// }

// export async function getSupabaseUser() { //Pour l'utilisation côté layout / RSC, sans Prisma
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) return null;

//   return {
//     id: user.id,
//     email: user.email || "default",
//   };
// }



export async function getSupabaseUser() {
  const dbUser = await prisma.user.findUnique({
    where:{id:"user2"}
  })
  if(!dbUser) return {id:"null", email:"no"}
  return {
    id : dbUser.id,
    email: dbUser.id,
  };
}
export async function getCurrentUser() {
  const dbUser = await prisma.user.findUnique({
    where:{id:"user2"}
  })
  if(!dbUser) return {id:"null", email:"no"}
  return {
    id : dbUser.id,
    email: dbUser.id,
  };
}