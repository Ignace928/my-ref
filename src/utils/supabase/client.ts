//dans le 🎁owner_repository.ts, Ce client est utilisé pour le login. route qui doit ètre publique

import { createBrowserClient } from "@supabase/ssr";

export const supabaseCli = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);