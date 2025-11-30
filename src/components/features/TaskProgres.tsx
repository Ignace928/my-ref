"use client";

import { useMemo } from "react";
import { Progress } from "../ui/progress";

type TaskProgressProps = {
  startDate: Date; // date de création
  endDate: Date;   // date de fin / deadline
};

export function TaskProgress({ startDate, endDate }: TaskProgressProps) {
  const progress = useMemo(() => {
    const now = new Date();
    const total = endDate.getTime() - startDate.getTime(); // durée totale
    const elapsed = now.getTime() - startDate.getTime();   // temps écoulé

    let percent = Math.floor((elapsed / total) * 100);
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    // Si la durée <= 0, on affiche 100%
    if (total <= 0) percent = 100;

    return percent;
  }, [startDate, endDate]);

  return (
    <Progress value={progress} className="h-4 rounded-full" />
  );
}
