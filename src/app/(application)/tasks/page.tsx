import { HeaderSidebar } from "@/src/components/Layout/HeaderS";
import { TasksTable } from "@/src/components/task-features/TasksTable";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { fetch_my_tasks } from "./action_task";
import { getCurrentUser } from "@/src/utils/supabase/getCurrentUser";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default async function PageTask(){
    // ✅ Récupération utilisateur côté serveur
  const user = await getCurrentUser();
  if (!user) return null; // redirect est géré par le layout

  // ✅ On récupère les tâches côté serveur
  const data = await fetch_my_tasks(user.id);
    return(
        <div >
                <div className="sticky top-0 z-3">
                    <HeaderSidebar title="Task Manager"></HeaderSidebar>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                        {data && data.length ? (
                            <TasksTable initialData={data} userId={user.id} />
                        ) : (
                            <Card>
                            <CardTitle>Liste des tâches</CardTitle>
                            <CardContent>Tâche indisponible 😥</CardContent>
                            </Card>
                        )}
                    </div>
                </ScrollArea>
        </div>
    )
}