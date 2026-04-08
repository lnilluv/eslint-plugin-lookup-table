export type PaymentType = "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "crypto";

export interface PaymentMethodDetails {
  processingFeePercentage: number;
  settlementTimeHours: number;
  displayName: string;
  iconId: string;
}

export function getPaymentMethodDetails(type: PaymentType): PaymentMethodDetails {
  switch (type) {
    case "credit_card":
      return {
        processingFeePercentage: 2.9,
        settlementTimeHours: 48,
        displayName: "Credit Card",
        iconId: "icon-credit-card",
      };
    case "debit_card":
      return {
        processingFeePercentage: 1.5,
        settlementTimeHours: 24,
        displayName: "Debit Card",
        iconId: "icon-debit-card",
      };
    case "paypal":
      return {
        processingFeePercentage: 3.49,
        settlementTimeHours: 72,
        displayName: "PayPal",
        iconId: "icon-paypal",
      };
    case "bank_transfer":
      return {
        processingFeePercentage: 0.5,
        settlementTimeHours: 120,
        displayName: "Bank Transfer",
        iconId: "icon-bank",
      };
    case "crypto":
      return {
        processingFeePercentage: 1.0,
        settlementTimeHours: 1,
        displayName: "Cryptocurrency",
        iconId: "icon-crypto",
      };
  }
}
