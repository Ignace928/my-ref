import { getCurrentUser } from "@/src/utils/supabase/getCurrentUser";
import { redirect } from "next/navigation";
import { PokedexWrapper } from "@/src/components/pokedex-features/PokedexWrapper";

export default async function PagePkmn(){
    const user = await getCurrentUser();
    if (!user) return redirect("/login");
    return(
        <div>
            <PokedexWrapper/> 
        </div>
    )
}