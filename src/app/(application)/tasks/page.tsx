import { HeaderSidebar } from "@/src/components/Layout/HeaderS";
import { TasksTable } from "@/src/components/task-features/TasksTable";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { userfind } from "./action_task";

export default async function PageTask(){
    // await new Promise(r=>{setTimeout(r, 1000)})//  
    const user = await userfind(); //<----Recuperer Utilisateur dans la session (User | null)
    
    if(!user){
        return redirect("/login?next=/tasks")
    }
    const data = await prisma.task.findMany({
        where:{
            OR:[
                {isPublic:true},
                {ownerId:user.id}
            ],
        },orderBy:{createdAt:"desc"}
    })
    return(
        <div>
            <div className="sticky top-0">
                <HeaderSidebar title="Task Manager"></HeaderSidebar>
            </div>
            { data? (<div><TasksTable initialData={data}/></div>):(
                <Card>
                    <CardTitle>Liste des tâches</CardTitle>
                    <CardContent>
                        Tâche indisponible😥
                    </CardContent>
                </Card>
            ) }
        </div>
    )
}