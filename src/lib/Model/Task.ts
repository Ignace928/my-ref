import {z} from 'zod'

export const TaskSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    date: z.coerce.date(),
    status: z.string().default("En cours"),
    isPublic: z.boolean().optional().default(false),
    ownerId: z.string().optional,
    description: z.string().nullable(),
})
export type TaskType = z.infer<typeof TaskSchema>;
