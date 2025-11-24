"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/src/components/ui/sidebar"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const [pageActive, setPageActive] = useState<string>("")
  const route = useRouter()

  const navigate = (title: string, u:string) => {
    setPageActive(title)
    route.push(u)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} className={`${pageActive === item.title ? "bg-sidebar-primary text-sidebar-primary-foreground":"" }`}onClick={()=>navigate(item.title, item.url)}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto" />
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}



// {/* <Collapsible
//   key={item.title}
//   asChild
//   defaultOpen={item.isActive}
//   className="group/collapsible"
// >
//     <CollapsibleTrigger asChild>
//       <button>
//         <ChevronRight className="ml-auto transition-transform duration-400 group-data-[state=open]/collapsible:rotate-90" />
//       </button>
//     </CollapsibleTrigger>
//     <CollapsibleContent>
  
//     </CollapsibleContent>
// </Collapsible> */}