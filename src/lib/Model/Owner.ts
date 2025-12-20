import {z} from 'zod'

export const OwnerSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(6, "Minimum 6 caractères"),
})
export type OwnerType = z.infer<typeof OwnerSchema>;
