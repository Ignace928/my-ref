import { useEffect, useMemo, useState } from "react";

type CountdownProps = {
  targetDate: Date | string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (target: Date): TimeLeft => {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export default function Countdown({ targetDate }: CountdownProps) {
  const target = useMemo(() => {
    return typeof targetDate === "string"
      ? new Date(targetDate)
      : targetDate;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(target)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="font-mono text-sm">
      {timeLeft.days > 0 && `${timeLeft.days}j `}
      {String(timeLeft.hours).padStart(2, "0")}:
      {String(timeLeft.minutes).padStart(2, "0")}:
      {String(timeLeft.seconds).padStart(2, "0")}
    </span>
  );
}
