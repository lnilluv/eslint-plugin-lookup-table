export type ShippingZone = "domestic" | "europe" | "asia" | "americas" | "oceania";

export interface ShippingOption {
  name: string;
  estimatedDays: number;
  cost: number;
  carrier: string;
}

const baseRates: Record<ShippingZone, { standard: number; express: number; overnight: number }> = {
  domestic: { standard: 5.99, express: 12.99, overnight: 24.99 },
  europe: { standard: 14.99, express: 29.99, overnight: 59.99 },
  asia: { standard: 19.99, express: 39.99, overnight: 79.99 },
  americas: { standard: 12.99, express: 24.99, overnight: 49.99 },
  oceania: { standard: 22.99, express: 44.99, overnight: 89.99 },
};

const estimatedDays: Record<ShippingZone, { standard: number; express: number; overnight: number }> = {
  domestic: { standard: 5, express: 2, overnight: 1 },
  europe: { standard: 10, express: 5, overnight: 2 },
  asia: { standard: 14, express: 7, overnight: 3 },
  americas: { standard: 10, express: 5, overnight: 2 },
  oceania: { standard: 14, express: 7, overnight: 3 },
};

const carriers: Record<ShippingZone, { standard: string; express: string; overnight: string }> = {
  domestic: { standard: "USPS", express: "UPS", overnight: "FedEx" },
  europe: { standard: "DHL", express: "DHL Express", overnight: "FedEx International" },
  asia: { standard: "EMS", express: "DHL Express", overnight: "FedEx International Priority" },
  americas: { standard: "USPS International", express: "UPS Worldwide", overnight: "FedEx International" },
  oceania: { standard: "Australia Post", express: "DHL Express", overnight: "FedEx International Priority" },
};

function weightMultiplier(weightKg: number): number {
  if (weightKg <= 1) return 1;
  if (weightKg <= 5) return 1.5;
  if (weightKg <= 15) return 2.5;
  if (weightKg <= 30) return 4;
  return 6;
}

export function calculateShippingOptions(weightKg: number, zone: ShippingZone): ShippingOption[] {
  const multiplier = weightMultiplier(weightKg);
  const rates = baseRates[zone];
  const days = estimatedDays[zone];
  const zoneCarriers = carriers[zone];

  return [
    {
      name: "Standard Shipping",
      estimatedDays: days.standard,
      cost: Math.round(rates.standard * multiplier * 100) / 100,
      carrier: zoneCarriers.standard,
    },
    {
      name: "Express Shipping",
      estimatedDays: days.express,
      cost: Math.round(rates.express * multiplier * 100) / 100,
      carrier: zoneCarriers.express,
    },
    {
      name: "Overnight Shipping",
      estimatedDays: days.overnight,
      cost: Math.round(rates.overnight * multiplier * 100) / 100,
      carrier: zoneCarriers.overnight,
    },
  ];
}
