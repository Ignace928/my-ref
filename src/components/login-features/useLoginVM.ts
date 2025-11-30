import { OwnerType } from "@/src/lib/Model/Owner";
import { loginRepository, signupRepository } from "@/src/lib/Model/owner_repository";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useLoginVM() {
  const loginMutation = useMutation({
    mutationFn: (data: OwnerType) => loginRepository(data),

    onSuccess: () => {
      toast("Connection reussit!", {
          description: `Salut, ${new Date(Date.now()).toLocaleDateString()}`,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      window.location.href = "/board"; // redirection après login
    },

    onError: (error) => {
      //const message = error instanceof Error ? error.message : String(error);
      toast.error(error.message);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
}

export function useSignupVM() {
  const signUpMutation = useMutation({
    mutationFn: (data: OwnerType) => signupRepository(data),
    onSuccess: () => {
      toast("Inscription réussie ! Vérifiez votre email pour confirmer votre compte.");
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de l'inscription.");
    },
  });

  return {
    signup: signUpMutation.mutate,
    isLoading: signUpMutation.isPending,
  };
}