"use client";

import ConfettiBoom from "react-confetti-boom";

export function MiniConfetti({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-center items-center">
      <ConfettiBoom
        particleCount={80}
        spreadDeg={60}
        launchSpeed={1.2}
        colors={["#22c55e", "#3b82f6", "#facc15", "#ef4444"]}
      />
    </div>
  );
}
