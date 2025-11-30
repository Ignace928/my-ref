"use server";
import { TaskCreateSchema, TaskUpdateSchema } from "@/src/lib/Model/Task";
import prisma from "@/src/lib/prisma";
// export async function userfind(){
//     return await prisma.user.findUnique({where:{id:"user1"}})
// }

export async function fetch_my_tasks(userId: string){
    return prisma.task.findMany({
        where:{
            OR:[
                {isPublic:true},
                {ownerId:userId}
            ],
        },
        orderBy:{createdAt:"desc"}
    })    
}

export async function fetch_one_task(userId: string, taskId: string){
    return prisma.task.findUnique({
        where:{
            id: taskId,
            ownerId:userId
        }
    })    
}

export async function create_task(userId: string, input: unknown) {
  
  const parsed = TaskCreateSchema.parse(input);

  return prisma.task.create({
    data: {
      ...parsed,
      ownerId: userId,
    },
  });
}

export async function update_task(id: string, userId: string, input: unknown) {
  
  const parsed = TaskUpdateSchema.parse(input);

  return prisma.task.update({
    where: {
      id,
      ownerId: userId,
    },
    data: parsed, // ✔ propre, jamais d'ownerId ici
  });
}

export async function delete_task(id: string, userId: string) {
  
  return prisma.task.delete({
    where: {
      id,
      ownerId: userId,
    },
  });
}