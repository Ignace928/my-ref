import { supabaseCli } from "./client";
export async function login(email: string, password:string){
    const {data, error} = await supabaseCli.auth.signInWithPassword({
        email,
        password,
    })
    if(error) throw new Error(error.message);

    return{
        user: data.user,
        session: data.session,
        access_token: data.session.access_token,
    };
}

export async function logout(){
    const {error} = await supabaseCli.auth.signOut()

    if(error) throw new Error(error.message);
    return true
}

export async function getCurrentUser() {
    const {
        data: { user },
    } = await supabaseCli.auth.getUser()

    return user;
}