import { type NextRequest } from "next/server"
import { updateSession } from "@/src/utils/supabase/middleware"

export async function middleware(req: NextRequest) {
    const res = await updateSession(req);
    return res;
}

export const config = {
  matcher: [
    "/board/:path*",
    "/pokedex/:path*",
    "/tasks/:path*"
  ],
}