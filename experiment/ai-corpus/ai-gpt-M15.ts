export function formatRelativeDate(date: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const absDiffMs = Math.abs(diffMs);
  const isFuture = diffMs < 0;

  const seconds = Math.floor(absDiffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let relative: string;

  if (seconds < 5) {
    return "just now";
  } else if (seconds < 60) {
    relative = `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else if (minutes < 60) {
    relative = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else if (hours < 24) {
    relative = `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else if (days < 7) {
    relative = `${days} day${days !== 1 ? "s" : ""}`;
  } else if (weeks < 5) {
    relative = `${weeks} week${weeks !== 1 ? "s" : ""}`;
  } else if (months < 12) {
    relative = `${months} month${months !== 1 ? "s" : ""}`;
  } else {
    relative = `${years} year${years !== 1 ? "s" : ""}`;
  }

  return isFuture ? `in ${relative}` : `${relative} ago`;
}
