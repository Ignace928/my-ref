import { supabaseCli } from "@/src/utils/supabase/client";
import { OwnerType } from "./Owner";

export async function loginRepository(input: OwnerType) {
  const { email, password } = input;

  const { data, error } = await supabaseCli.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return {
    user: data.user,
    session: data.session,
    token: data.session?.access_token,
  };
}

// export async function logoutRepository() {
//   const { error } = await supabaseCli.auth.signOut();
//   if (error) throw new Error(error.message);
//   return true;
// }





// signup_repository.ts
import { supabaseJsCli } from "@/src/utils/supabase/clientjs";

export async function signupRepository(input: OwnerType) {
  const { email, password } = input;

  const { data, error } = await supabaseJsCli.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login` // page de redirection après confirmation
    }
  });

  if (error) throw new Error(error.message);

  return data;
}
