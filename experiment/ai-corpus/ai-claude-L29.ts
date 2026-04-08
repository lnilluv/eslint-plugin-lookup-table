const ROMAN_DIGITS: Array<{ value: number; symbol: string }> = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

export function toRomanNumeral(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new RangeError("value must be an integer between 1 and 3999");
  }

  let remaining = value;
  let result = "";

  for (const { value: digit, symbol } of ROMAN_DIGITS) {
    while (remaining >= digit) {
      result += symbol;
      remaining -= digit;
    }
  }

  return result;
}
