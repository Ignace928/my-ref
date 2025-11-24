import {z} from 'zod'

//Utilisateur de supabase pour le login

export const OwnerSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
})
export type OwnerType = z.infer<typeof OwnerSchema>;
