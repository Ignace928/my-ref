import "@/src/lib/fix-radix-ssr";//Creer pour pouvoir gérer les erreurs typescript

import { ReactNode } from "react";
import { AppSidebar } from "@/src/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/sidebar";
import { redirect } from "next/navigation";
import { Toaster } from "@/src/components/ui/sonner";
import { getSupabaseUser } from "@/src/utils/supabase/getCurrentUser";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const user = await getSupabaseUser()
  if (!user) return redirect("/login")
  return user && (
    <SidebarProvider>
      <AppSidebar userEmail={user.email}/>
      {/* <AppSidebar userEmail={"Default"}/> */}
      <SidebarInset>
        <Toaster position="top-center" />
          {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
