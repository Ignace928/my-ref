"use server";

import prisma from "@/src/lib/prisma";
// import { createClient } from "./server";


// export async function getCurrentUser() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) return null;
//   const emaiUser = user.email
//   let dbUser = await prisma.user.findUnique({ where: { id: user.id } });

//   if (!dbUser) {
//     dbUser = await prisma.user.create({ data: { id: user.id } });
//   }

//   return {
//         id : dbUser.id,
//         email: emaiUser || "default",
//       };
// }



export async function getCurrentUser() {
  const dbUser = await prisma.user.findUnique({
    where:{id:"user3"}
  })
  if(!dbUser) return {id:"null", email:"no"}
  return {
    id : dbUser.id,
    email: dbUser.id,
  };
}