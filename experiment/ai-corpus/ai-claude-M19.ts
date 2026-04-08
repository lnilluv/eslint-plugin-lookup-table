export type LengthUnit = "km" | "miles" | "meters";
export type MassUnit = "kg" | "lbs" | "oz";
export type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";
export type Unit = LengthUnit | MassUnit | TemperatureUnit;

type UnitCategory = "length" | "mass" | "temperature";

const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  km: 1000,
  miles: 1609.344,
  meters: 1,
};

const MASS_TO_KG: Record<MassUnit, number> = {
  kg: 1,
  lbs: 0.45359237,
  oz: 0.028349523125,
};

function getCategory(unit: Unit): UnitCategory {
  if (unit in LENGTH_TO_METERS) {
    return "length";
  }
  if (unit in MASS_TO_KG) {
    return "mass";
  }
  return "temperature";
}

function convertTemperature(value: number, source: TemperatureUnit, target: TemperatureUnit): number {
  let celsius: number;

  switch (source) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
  }

  switch (target) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return celsius * (9 / 5) + 32;
    case "kelvin":
      return celsius + 273.15;
  }
}

function round(value: number): number {
  return Number(value.toFixed(6));
}

export function convertUnits(value: number, sourceUnit: Unit, targetUnit: Unit): number {
  if (!Number.isFinite(value)) {
    throw new Error("value must be a finite number");
  }

  if (sourceUnit === targetUnit) {
    return value;
  }

  const sourceCategory = getCategory(sourceUnit);
  const targetCategory = getCategory(targetUnit);

  if (sourceCategory !== targetCategory) {
    throw new Error(`Cannot convert ${sourceUnit} to ${targetUnit}`);
  }

  if (sourceCategory === "length") {
    const meters = value * LENGTH_TO_METERS[sourceUnit as LengthUnit];
    return round(meters / LENGTH_TO_METERS[targetUnit as LengthUnit]);
  }

  if (sourceCategory === "mass") {
    const kg = value * MASS_TO_KG[sourceUnit as MassUnit];
    return round(kg / MASS_TO_KG[targetUnit as MassUnit]);
  }

  return round(convertTemperature(value, sourceUnit as TemperatureUnit, targetUnit as TemperatureUnit));
}
