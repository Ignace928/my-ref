"use client"
import * as React from "react"
import { ScrollArea } from "../ui/scroll-area"


export function ScrollAreaLarge({ children, tailwindStyle }: { children: React.ReactNode, tailwindStyle: string }) {
  return (
    <ScrollArea className={tailwindStyle}>
      { children }
    </ScrollArea>
  )
}