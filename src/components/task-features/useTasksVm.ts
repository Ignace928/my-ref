"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_task, delete_task, fetch_my_tasks, update_task } from "@/src/app/(application)/tasks/action_task";
import { toast } from "sonner";

export function useTaskVm(userId:string){
/*
----✅ queryClient() permet de garder ton UI synchronisée avec les mutations côté serveur.
Après une mutation (createTask, updateTask, deleteTask), tu veux que la liste des tâches se mette à jour
----✅ invalidateQueries() marque la query comme « périmée », donc React Query va la refetcher.
*/
    const queryClient = useQueryClient()

    // Query principale
    const { data, isLoading, error } = useQuery({
        queryKey: ["tasks", userId], //<----- userId pour activer et identifié cache pour chaque clients 
        queryFn: () => fetch_my_tasks(userId),
        staleTime: 10_000,
    });

    // ✅ Mutations
    const createTask = useMutation({
        mutationFn : (input:unknown) => create_task(userId, input),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey:["tasks", userId] as const
        }),
        onError:(e) => toast.error(e.message)
    })

    const updateTask = useMutation({
        mutationFn: ({input, id}:{input: unknown, id:string}) => update_task(id, userId, input),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey:["tasks", userId] as const
        }),
        onError:(e) => toast.error(e.message)
    })

    const deleteTask = useMutation({
        mutationFn: (id: string) => delete_task(id, userId),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey:["tasks", userId] as const
        }),
        onError:(e) => {
            console.log(e)
        }
    })

    return {
        data : data??[],
        isLoading,
        error,
        createTask,
        updateTask,
        deleteTask
    }
}