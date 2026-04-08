export type LengthUnit = "km" | "miles" | "meters";
export type WeightUnit = "kg" | "lbs" | "oz";
export type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";
export type Unit = LengthUnit | WeightUnit | TemperatureUnit;

type UnitCategory = "length" | "weight" | "temperature";

const unitCategories: Record<Unit, UnitCategory> = {
  km: "length",
  miles: "length",
  meters: "length",
  kg: "weight",
  lbs: "weight",
  oz: "weight",
  celsius: "temperature",
  fahrenheit: "temperature",
  kelvin: "temperature",
};

const toBaseLength: Record<LengthUnit, (v: number) => number> = {
  meters: (v) => v,
  km: (v) => v * 1000,
  miles: (v) => v * 1609.344,
};

const fromBaseLength: Record<LengthUnit, (v: number) => number> = {
  meters: (v) => v,
  km: (v) => v / 1000,
  miles: (v) => v / 1609.344,
};

const toBaseWeight: Record<WeightUnit, (v: number) => number> = {
  kg: (v) => v,
  lbs: (v) => v * 0.45359237,
  oz: (v) => v * 0.028349523125,
};

const fromBaseWeight: Record<WeightUnit, (v: number) => number> = {
  kg: (v) => v,
  lbs: (v) => v / 0.45359237,
  oz: (v) => v / 0.028349523125,
};

const toCelsius: Record<TemperatureUnit, (v: number) => number> = {
  celsius: (v) => v,
  fahrenheit: (v) => (v - 32) * (5 / 9),
  kelvin: (v) => v - 273.15,
};

const fromCelsius: Record<TemperatureUnit, (v: number) => number> = {
  celsius: (v) => v,
  fahrenheit: (v) => v * (9 / 5) + 32,
  kelvin: (v) => v + 273.15,
};

export function convertUnits(value: number, sourceUnit: Unit, targetUnit: Unit): number {
  const sourceCategory = unitCategories[sourceUnit];
  const targetCategory = unitCategories[targetUnit];

  if (sourceCategory !== targetCategory) {
    throw new Error(`Cannot convert between ${sourceCategory} and ${targetCategory}`);
  }

  if (sourceUnit === targetUnit) {
    return value;
  }

  switch (sourceCategory) {
    case "length": {
      const base = toBaseLength[sourceUnit as LengthUnit](value);
      return fromBaseLength[targetUnit as LengthUnit](base);
    }
    case "weight": {
      const base = toBaseWeight[sourceUnit as WeightUnit](value);
      return fromBaseWeight[targetUnit as WeightUnit](base);
    }
    case "temperature": {
      const celsius = toCelsius[sourceUnit as TemperatureUnit](value);
      return fromCelsius[targetUnit as TemperatureUnit](celsius);
    }
  }
}
