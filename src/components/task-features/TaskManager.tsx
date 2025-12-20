"use client"

import { CheckCircle, Circle, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarGroup, SidebarMenuAction } from "../ui/sidebar"
import { TaskType } from "@/src/lib/Model/Task"
import { ReactNode } from "react"


type props = {
    children: ReactNode,
    task: TaskType,
    let_edit: (task: TaskType) => void,
    let_delete: (task: TaskType) => void,
    endTask: (task: TaskType, taskId: string) => void
}

export default function TaskManager({children, task, let_edit, let_delete, endTask}:props) {
    const date = new Date()
    return(
        <SidebarGroup className="items-center">
            <DropdownMenu>
                <DropdownMenuTrigger className="p-2">
                    <SidebarMenuAction>
                        {children}
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 rounded-lg" side="left" align="start">

                    <DropdownMenuItem onClickCapture={() => let_edit(task)}>
                        <Pencil className="text-muted-foreground" /> Modifier
                    </DropdownMenuItem>

                    <DropdownMenuItem onMouseDownCapture={() => let_delete(task)}>
                        <Trash2 className="text-muted-foreground" /> Supprimer
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem disabled={task.status !== "En cours"} onClick={() => 
                        endTask({...task, status: `${date.toLocaleDateString() + " " + date.toLocaleTimeString()}` }, task.id)
                    }>
                        {
                            task.status !== "En cours" ? (
                                <><CheckCircle className="text-primary"/> Effectué </>
                            ):(
                                <><Circle className="text-muted-foreground" /> À faire </>
                            )
                        }
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarGroup>
    )
}