"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { HeaderSidebar } from "../Layout/HeaderS";
import { ScrollArea } from "../ui/scroll-area";
import { TasksTable } from "./TasksTable";
import { TaskType } from "@/src/lib/Model/Task";
import { fetch_my_tasks } from "@/src/app/(application)/tasks/action_task";
import { LoaderPinwheel } from "lucide-react";

export function TaskWrapper({ userId }: { userId: string }) {
  const [data, setData] = useState<TaskType[] | null>(null);

  useEffect(() => {
    async function load() {
      const result = await fetch_my_tasks(userId);
      setData(result);
    }
    load();
  }, [userId]);

  return (
    <div>
      <div className="sticky top-0 z-3">
        <HeaderSidebar title="Task Manager" />
      </div>

      <section className="flex-1">
        <div className="p-4 space-y-4">
          {!data ? (
              <Card className="items-center text-center">
                <LoaderPinwheel className="animate-spin text-primary"/>
            </Card>
          ) : data.length ? (
            <TasksTable initialData={data} userId={userId} />
          ) : (
            <Card>
              <CardTitle>Liste des tâches</CardTitle>
              <CardContent>Aucune tâche 😥</CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
