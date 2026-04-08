export interface ParsedDateTime {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  timezoneOffsetMinutes: number;
}

export function parseISO8601(input: string): ParsedDateTime {
  const dateTimeRegex =
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?)?(?:Z|([+-])(\d{2}):?(\d{2}))?$/;

  const match = input.match(dateTimeRegex);
  if (!match) {
    throw new Error(`Invalid ISO 8601 date string: ${input}`);
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  const hours = match[4] !== undefined ? parseInt(match[4], 10) : 0;
  const minutes = match[5] !== undefined ? parseInt(match[5], 10) : 0;
  const seconds = match[6] !== undefined ? parseInt(match[6], 10) : 0;

  let timezoneOffsetMinutes = 0;

  if (match[7] !== undefined) {
    const sign = match[7] === "+" ? 1 : -1;
    const tzHours = parseInt(match[8], 10);
    const tzMinutes = parseInt(match[9], 10);
    timezoneOffsetMinutes = sign * (tzHours * 60 + tzMinutes);
  }

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}`);
  }
  if (day < 1 || day > 31) {
    throw new Error(`Invalid day: ${day}`);
  }
  if (hours < 0 || hours > 23) {
    throw new Error(`Invalid hours: ${hours}`);
  }
  if (minutes < 0 || minutes > 59) {
    throw new Error(`Invalid minutes: ${minutes}`);
  }
  if (seconds < 0 || seconds > 59) {
    throw new Error(`Invalid seconds: ${seconds}`);
  }

  return { year, month, day, hours, minutes, seconds, timezoneOffsetMinutes };
}
