export type ShippingZone = "domestic" | "europe" | "asia" | "americas" | "oceania";

export interface ShippingOption {
  id: string;
  carrier: string;
  service: string;
  estimatedDays: number;
  cost: number;
  currency: "USD";
}

const ZONE_MULTIPLIER: Record<ShippingZone, number> = {
  domestic: 1,
  europe: 1.35,
  asia: 1.55,
  americas: 1.45,
  oceania: 1.7,
};

const ZONE_BASE_DAYS: Record<ShippingZone, number> = {
  domestic: 2,
  europe: 5,
  asia: 6,
  americas: 5,
  oceania: 7,
};

function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateShippingOptions(weightKg: number, zone: ShippingZone): ShippingOption[] {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    throw new Error("weightKg must be a positive number.");
  }

  const zoneMultiplier = ZONE_MULTIPLIER[zone];
  const baseDays = ZONE_BASE_DAYS[zone];

  const standardCost = (4.5 + weightKg * 1.2) * zoneMultiplier;
  const expressCost = (8.5 + weightKg * 2.1) * zoneMultiplier;
  const priorityCost = (14 + weightKg * 3.0) * zoneMultiplier;

  return [
    {
      id: "standard",
      carrier: "Postal",
      service: "Standard",
      estimatedDays: baseDays,
      cost: roundToCents(standardCost),
      currency: "USD",
    },
    {
      id: "express",
      carrier: "CourierX",
      service: "Express",
      estimatedDays: Math.max(1, baseDays - 2),
      cost: roundToCents(expressCost),
      currency: "USD",
    },
    {
      id: "priority",
      carrier: "CourierX",
      service: "Priority",
      estimatedDays: Math.max(1, baseDays - 3),
      cost: roundToCents(priorityCost),
      currency: "USD",
    },
  ];
}
