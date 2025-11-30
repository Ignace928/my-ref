import { Task } from '@prisma/client';
import {z} from 'zod'


export const TaskSchemaBase = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  date: z.coerce.date(),
  status: z.string().default("En cours"),
  isPublic: z.boolean().optional(),
  //ownerId: z.string(),
});


export const TaskCreateSchema = TaskSchemaBase;

export const TaskUpdateSchema = TaskSchemaBase.partial();

export type TaskType = Task // <----- Prisma est la source de vérité pour les types de tache

export type TaskRow = Pick<TaskType, 'id' | 'title' | 'description' | 'date' | 'status' | 'isPublic' | "ownerId">;
export type TaskFormInput = z.infer<typeof TaskSchemaBase>;

