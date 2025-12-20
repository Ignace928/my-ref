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
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";


type TaskFormProps = {
  currentUser: string;
  task?: TaskType;
  onClose?: () => void;
}
export function TaskForm({currentUser, task, onClose}:TaskFormProps){

    const { createTask, updateTask } = useTaskVm(currentUser)
    //const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false); // pour modal
    

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
                <FieldGroup className="flex flex-row gap-4 items-end">
                    {/* Date */}
                    <Field className="flex-1">
                        <FieldLabel htmlFor="date">Date</FieldLabel>
                        <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <DatePicker
                            value={field.value as Date | undefined}
                            onChange={field.onChange}
                            placeholder="Choisir une date"
                            />
                        )}
                        />
                        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                        <FieldDescription>Deadline de la tâche</FieldDescription>
                    </Field>

                    {/* Visibilité */}
                    <Field>
                            <Controller
                                control={control}
                                name="isPublic"
                                render={({field}) => (
                                    <Label className="hover:bg-muted flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary ">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked)
                                        }} // ✅ update RHF
                                        className="data-[state=checked]:border-primary data-[state=checked]:bg-primary  "
                                    />
                                        <div className="grid gap-1.5 font-normal">
                                        <p className="text-sm leading-none font-medium">
                                            Visibilité activé
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            Cette action rend votre tache publique
                                        </p>
                                        </div>
                                    </Label>
                                )}
                            />
                            {errors.isPublic && <p className="text-red-500">{errors.isPublic.message}</p>}
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
            </div>
            
        </form>
    )
}