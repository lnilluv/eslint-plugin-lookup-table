export interface ISO8601Parts {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  timezoneOffsetMinutes: number;
}

const ISO_8601_REGEX =
  /^(\d{4})-(\d{2})-(\d{2})(?:[Tt\s](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(?:([Zz])|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;

export function parseISO8601(input: string): ISO8601Parts {
  const match = input.match(ISO_8601_REGEX);
  if (!match) {
    throw new Error("Invalid ISO 8601 string");
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hours = match[4] ? Number(match[4]) : 0;
  const minutes = match[5] ? Number(match[5]) : 0;
  const seconds = match[6] ? Number(match[6]) : 0;

  let timezoneOffsetMinutes = 0;
  if (match[7]) {
    timezoneOffsetMinutes = 0;
  } else if (match[8]) {
    const sign = match[8] === "+" ? 1 : -1;
    const tzHours = Number(match[9] ?? 0);
    const tzMinutes = Number(match[10] ?? 0);
    timezoneOffsetMinutes = sign * (tzHours * 60 + tzMinutes);
  }

  const check = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() + 1 !== month ||
    check.getUTCDate() !== day ||
    hours > 23 ||
    minutes > 59 ||
    seconds > 59
  ) {
    throw new Error("Invalid ISO 8601 date values");
  }

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    timezoneOffsetMinutes,
  };
}
