import { Card, CardContent } from '@/src/components/ui/card';
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface MiniCardProps {
  title: string,
  icon?: LucideIcon,
  action: () => void
}

export function TaskExplorer({ title, icon: Icon, action }: MiniCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow mt-2" onClick={action}>
        <CardContent className="flex items-center gap-4 p-4">
            {Icon && <Icon className="h-6 w-6"/>}
            <span className="font-medium"> {title} </span>
        </CardContent>
    </Card>
  )
}