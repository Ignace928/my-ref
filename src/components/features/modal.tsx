"use client";


import { ReactNode } from "react";
import { Button } from "../ui/button";
import { 
  Dialog,
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Trash2 } from "lucide-react";
import { TaskType } from "@/src/lib/Model/Task";
import { useTaskVm } from "../task-features/useTasksVm";
import { toast } from "sonner";

interface Props {
  currentUser: string,
  isDeleteOpen: boolean,
  setIsDeleteOpen : (arg: boolean) => void,
  onClose: () => void,
  task: TaskType
}

export function DialogConfirm({currentUser, isDeleteOpen, setIsDeleteOpen, onClose, task} : Props) {
  const {deleteTask} = useTaskVm(currentUser)

  return (
    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>

                <DialogDescription>
                  
                  Voulez-vous vraiment supprimer la tâche{" "}
                  {task.title.length > 10 ? task.title.slice(0, 10) + "…" : task.title} ?
                
                </DialogDescription>

            </DialogHeader>

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
  )
}