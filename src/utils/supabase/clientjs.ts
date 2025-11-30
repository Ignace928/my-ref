// src/utils/supabase/client.ts
//dans le 🎁owner_repository.ts,  Ce client est utilisé pour le SignIn. route qui est aussi senssé ètre publique
import { createClient } from "@supabase/supabase-js";

export const supabaseJsCli = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
