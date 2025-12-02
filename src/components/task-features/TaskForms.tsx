"use client"

import { TaskCreateSchema, TaskType, TaskUpdateSchema } from "@/src/lib/Model/Task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTaskVm } from "./useTasksVm";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { DatePicker } from "../features/calendar";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";


type TaskFormProps = {
  currentUser: string;
  task?: TaskType;
  onClose?: () => void;
}
export function TaskForm({currentUser, task, onClose}:TaskFormProps){

    const { createTask, updateTask, deleteTask } = useTaskVm(currentUser)
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false); // pour modal


    const { register, handleSubmit, control, formState:{errors} } = useForm({
        resolver: zodResolver(task ? TaskUpdateSchema : TaskCreateSchema),
        defaultValues:{
            title : task?.title ?? "",
            description: task?.description || "",
            date: task?.date  ?? new Date(),
            status: task?.status ?? "En cours",
            isPublic: task?.isPublic ?? false
        },
    })

    const submitFn = async (data: unknown) => {
        try{
            if(task){
                await updateTask.mutateAsync({id: task.id, input: data}).then((t)=>{
                    toast("Modification reussit", {
                        description: `Titre: ${t.title}`,
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                    //const message = error instanceof Error ? error.message : String(error);
                }).catch(e => {
                    toast.error(e.PrismaClientKnownRequestError)
                    })
            } else {
                await createTask.mutateAsync(data).then(t=>{
                    toast("Nouveau tâche ajouté", {
                        description: `Titre: ${t.title}`,
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                        })
                }).catch(e => {toast.error(e.message)})
            }

            if(onClose) onClose()

        } catch(err){
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(submitFn)} className="space-y-4 p-4 border rounded">
            <FieldSet className="flex">
                <FieldLegend className="text-center">Taches</FieldLegend>
                <FieldDescription className="text-center">Description & détails</FieldDescription>
                <FieldSeparator/>
                <FieldGroup className="flex flex-row">
                    
                    <Field>
                        <FieldLabel htmlFor="titre">Titre</FieldLabel>
                        <Input id="titre" {...register("title")}  placeholder="todo" />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        <FieldDescription>Le nom du tâche</FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="desc">Description</FieldLabel>
                        <Textarea id="desc" {...register("description")}  placeholder="Ajouer la description détaillé" />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        <FieldDescription>Quelques descriptions</FieldDescription>
                    </Field>

                </FieldGroup>
                <FieldSeparator/>
                <FieldGroup className="flex">
                    <Controller
                        control={control}          // le contrôle RHF (useForm)
                        name="date"                // le nom du champ
                        render={({ field }) => (  // RHF te fournit un objet field
                            <DatePicker
                            value={field.value as Date | undefined} // 👈 on dit à TS que c’est une Date
                            onChange={field.onChange} // ↩ RHF récupère la nouvelle valeur
                            placeholder="Choisir une date"
                            />
                    )}
                        />



                    <Field className="flex flex-row">
                        <FieldLabel htmlFor="visible">Tache partagé</FieldLabel>
                        <Input id="visible" type="checkbox" {...register('isPublic')} />
                        {errors.isPublic && <p className="text-red-500">{errors.isPublic.message}</p>}
                        <FieldDescription>Visibilité</FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>

            <div className="flex flex-row gap-4">
                <Button
                    type="submit"
                    variant={!task ? "outline" : "default"}
                    className="rounded bg-primary"
                    >
                    {task ? "Mettre à jour" : "Créer"}
                </Button>
                {
                task && (
                    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="rounded-full h-10 w-10 cursor-pointer ml-6">
                                <Trash2 />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirmer la suppression</DialogTitle>
                            </DialogHeader>
                            <div className="py-2">Voulez-vous vraiment supprimer la tâche{" "}
                                {task.title.length > 10 ? task.title.slice(0, 10) + "…" : task.title} ?
                            </div>
                            <DialogFooter>
                                <Button className="cursor-pointer" variant="outline" onClick={() => setIsDeleteOpen(false)}>Annuler</Button>
                                <Button className="cursor-pointer" variant="destructive" onClick={async () => {
                                        try {
                                            await deleteTask.mutateAsync(task.id)
                                            setIsDeleteOpen(false)     // ferme la modal
                                            if (onClose) onClose()     // ferme le form parent (si modal parent)
                                            toast("Tâche supprimée")
                                            } catch (err) {
                                            toast.error("Erreur lors de la suppression")
                                        }
                                    }}>Supprimer</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
                
                </div>
            
        </form>
    )
}