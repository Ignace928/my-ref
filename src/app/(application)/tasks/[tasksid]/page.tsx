import { HeaderSidebar } from "@/src/components/Layout/HeaderS";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { userfind } from "../action_task";


export default async function Page(props: {
    params: Promise<{
        tasksid: string
    }>
    //searchParams: Promise<Record<string, string | string[]>>
}) {
    const parametre = await props.params
    
    const user = await userfind() //<--- il faut savoir si utilisateur connecté à supabase return (User | null)

    if(!user){
        return redirect("/login?next=/tasks")
    }
    
    const data = await prisma.task.findUnique({
        where:{
            id:parametre.tasksid,
            OR:[
            {ownerId: user.id},
            {isPublic:true}
            ],
        }
    })
    if(!data) return redirect("/tasks")
    return data &&(
        <div>
            <div className="sticky top-0 ">
                <HeaderSidebar title="Citation">
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={"/board"}>
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                </HeaderSidebar>
            </div>
            
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">   
               <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                     <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                       <div className="bg-muted/50 aspect-video rounded-xl" >{user.id}</div>
                       <div className="bg-muted/50 aspect-video rounded-xl" />
                       <div className="bg-muted/50 aspect-video rounded-xl">
                            <Button onClick={ async ()=>{
                                    "use server"
                                    console.log(data)
                                }}
                            >searchParams</Button>
                       </div>
                     </div>
                     <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </section>
        </div>
    )
}