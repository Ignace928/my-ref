"use client"

import * as React from "react"
import {
  BookOpen,
  Frame,
  ListChecks,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/src/components/nav-main"
import { NavProjects } from "@/src/components/nav-projects"
import { NavUser } from "@/src/components/nav-user"
import { TeamSwitcher } from "@/src/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar"
import { ThemeKey } from "../lib/theme"

type AppSidebarProps = {
  userEmail: string;
} & React.ComponentProps<typeof Sidebar>;

// This is sample data.
const data_user = {
  
  teams: [
    {
      name: "Dusty grass",
      logo: "🍃",
      plan: "1" as ThemeKey,
    },
    {
      name: "Sunset Orange",
      logo: "🍊",
      plan: "2" as ThemeKey,
    },
    {
      name: "Sakura",
      logo: "🌸",
      plan: "3" as ThemeKey,
    },
    {
      name: "Commète",
      logo: "☄",
      plan: "4" as ThemeKey,
    },
    {
      name: "Nouveau",
      logo: "♉",
      plan: "5" as ThemeKey,
    },
    {
      name: "Default",
      logo: "🔘",
      plan: "6" as ThemeKey,
    },
  ],
}

const data = {
  navMain: [
    {
      title: "Playground",
      url: "/board",
      icon: SquareTerminal,
    },
    {
      title: "Pokemon",
      url: "/pokedex",
      icon: PieChart,
    },
    {
      title: "Task Manager v0",
      url: "/tasks",
      icon: ListChecks
    },
    {
      title: "My Portfolio",
      url: "/",
      icon: BookOpen
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ userEmail, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data_user.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{userName: "Salut✨", email: userEmail, avatar: "https://vqtoojvjnpjulqlrtlgd.supabase.co/storage/v1/object/public/mock-pokemon/gen4_general/1.png"}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
