import { getCurrentUser } from "@/src/utils/supabase/getCurrentUser";
import { redirect } from "next/navigation";
import { TaskWrapper } from "@/src/components/task-features/TaskWrapper";

export default async function PageTask(){
    // ✅ Récupération utilisateur côté serveur
  const user = await getCurrentUser();
  if (!user) return redirect("/login"); // redirect est géré par le layout

    return(
        <div><TaskWrapper userId={user.id}/></div>
    )
}