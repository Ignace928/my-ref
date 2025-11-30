"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover"
import { cn } from "@/src/lib/utils"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Choisir une date",
  className,
}: DatePickerProps) {

  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (onChange) onChange(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          className="rounded-md border shadow"
        />
      </PopoverContent>
    </Popover>
  )
}
