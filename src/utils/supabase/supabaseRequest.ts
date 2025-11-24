import { createClient } from "@/src/utils/supabase/server";

export const checkoutUser = async () => {
  try {
    // 1️⃣ Vérification de session Supabase
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }
    return user

  } catch (error) {
    return{ message: "Impossible de récupérer le Pokedex", error }
  }
}
