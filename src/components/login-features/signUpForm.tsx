"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { OwnerSchema, OwnerType } from "@/src/lib/Model/Owner";
import { useSignupVM } from "./useLoginVM"; // tu peux renommer le fichier useAuthVM.ts si tu veux
import { Label } from "../ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import z from "zod";


// Création d’un schéma local pour le formulaire signup avec confirmation de mot de passe
const SignupFormSchema = OwnerSchema.extend({
  confirmPassword: z.string().min(6, "Veuillez confirmer votre mot de passe"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type SignupFormType = z.infer<typeof SignupFormSchema>;


export function SignupForm() {
  const { register, handleSubmit, formState, reset } = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
  });

  const { signup, isLoading } = useSignupVM();

  const onSubmit: SubmitHandler<OwnerType> = (data) => {
    signup({ email: data.email, password: data.password });
    signup(data); // appelle ton mutation
    reset()
  };

  return (
        <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Inscription</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")} className="mt-2" />
              {formState.errors.email && (
                <p className="text-destructive text-sm">{formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label>Mot de passe</Label>
              <Input type="password" {...register("password")} className="mt-2" />
              {formState.errors.password && (
                <p className="text-destructive text-sm">{formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <Label>Confirmer le mot de passe</Label>
              <Input type="password" {...register("confirmPassword")} className="mt-2" />
              {formState.errors.confirmPassword && (
                <p className="text-destructive text-sm">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <CardFooter className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Inscription..." : "S'inscrire"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
