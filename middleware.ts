import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/src/utils/supabase/middleware"

export async function middleware(req: NextRequest) {
    const res = await updateSession(req);

    // Si pas de session → redirige côté serveur (SEO friendly)
    const pathname = req.nextUrl.pathname;

    const isPublicPage =
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/public");

    if (!isPublicPage && !req.cookies.get("sb-access-token")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
}

export const config = {
  matcher: [
    "/board/:path*",
    "/pokedex/:path*",
    "/tasks/:path*"
  ],
}