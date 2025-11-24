
import "@/src/lib/fix-radix-ssr";//Creer pour pouvoir gérer les erreurs typescript

import { ReactNode } from "react";
import { AppSidebar } from "@/src/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/sidebar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
