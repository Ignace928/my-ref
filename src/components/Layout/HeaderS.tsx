import "@/src/lib/fix-radix-ssr"
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import ModeRoundedSwitcher from "../Theme/modeChooseRound";
export function HeaderSidebar({ children, title }:{children?:React.ReactNode, title:string}){
    return(
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                  {children}
                  <BreadcrumbItem>
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className=" fixed right-7 z-50">
                <ModeRoundedSwitcher/>
            </div>
        </header>
    )
}