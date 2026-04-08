export function formatRelativeDate(date: Date, currentDate: Date): string {
  const diffSeconds = Math.round((date.getTime() - currentDate.getTime()) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  if (absSeconds < 10) {
    return "just now";
  }

  const units: Array<{ unit: string; seconds: number }> = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  const selected = units.find((entry) => absSeconds >= entry.seconds) ?? units[units.length - 1];
  const value = Math.floor(absSeconds / selected.seconds);

  if (selected.unit === "day" && value === 1) {
    return diffSeconds < 0 ? "yesterday" : "tomorrow";
  }

  const pluralized = value === 1 ? selected.unit : `${selected.unit}s`;
  return diffSeconds < 0 ? `${value} ${pluralized} ago` : `in ${value} ${pluralized}`;
}
