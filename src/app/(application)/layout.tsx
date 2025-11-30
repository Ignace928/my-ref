import "@/src/lib/fix-radix-ssr";//Creer pour pouvoir gérer les erreurs typescript

import { ReactNode } from "react";
import { AppSidebar } from "@/src/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/sidebar";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/utils/supabase/getCurrentUser";
import { Toaster } from "@/src/components/ui/sonner";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()
  console.log("Hello from the layout",user)
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
