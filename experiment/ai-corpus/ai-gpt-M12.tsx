import { useState, useEffect, useCallback } from "react";

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  display: string;
}

function calculateTimeLeft(target: Date): CountdownResult {
  const now = Date.now();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, display: "00:00:00:00" };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const pad = (n: number): string => String(n).padStart(2, "0");
  const display = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return { days, hours, minutes, seconds, isExpired: false, display };
}

export function useCountdown(targetDate: Date): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(() => calculateTimeLeft(targetDate));

  const update = useCallback(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
  }, [targetDate]);

  useEffect(() => {
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [update]);

  return timeLeft;
}
