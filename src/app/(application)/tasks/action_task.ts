"use server";
import prisma from "@/src/lib/prisma";
//import { getCurrentSupabaseUser } from "@/src/utils/supabase/supabase-server";

// export async function userfind(){
//     return await getCurrentSupabaseUser()
// }

export async function userfind(){
    return await prisma.user.findUnique({where:{id:"user2"}})
}

export async function fetch_my_tasks(){
    const user = await userfind()
    if(!user) return [];
    
    return prisma.task.findMany({
        where:{
            OR:[
                {isPublic:true},
                {ownerId:user.id}
            ],
        },
        orderBy:{createdAt:"desc"}
    })    
}

export async function fetch_one_task(taskId: string){
    const user = await userfind()
    if(!user) return [];
    
    return prisma.task.findUnique({
        where:{
            id: taskId,
            ownerId:user.id
        }
    })    
}