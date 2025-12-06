
import {z} from 'zod'

export const MessageSchema = z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
    
    mail: z.string().email("Veuillez entrer une adresse e-mail valide."),
    
    phone: z.string()
        .min(10, "Le minimum est de 10 chiffres.")
        .regex(/^\+?[0-9\s-]+$/, "Format de numéro de téléphone invalide."),
    
    object: z.string().min(3, "L'objet doit contenir au moins 3 caractères."),
    
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
})
export type MessageType = z.infer<typeof MessageSchema>;
