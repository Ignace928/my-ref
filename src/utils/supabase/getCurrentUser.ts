"use server";

import prisma from "@/src/lib/prisma";
import { createClient } from "./server";

// Pour l'utilisation côté server avec Prisma
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: { id: user.id }
  });

  return {
    id: dbUser.id,
    email: user.email || "default",
  };
}

// Pour l'utilisation côté layout / RSC, sans Prisma
export async function getSupabaseUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "default",
  };
}



// export async function getCurrentUser() {
//   const dbUser = await prisma.user.findUnique({
//     where:{id:"user3"}
//   })
//   if(!dbUser) return {id:"null", email:"no"}
//   return {
//     id : dbUser.id,
//     email: dbUser.id,
//   };
// }