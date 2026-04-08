export type PaymentType = "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "crypto";

export interface PaymentMethodDetails {
  processingFeePercentage: number;
  settlementTimeHours: number;
  displayName: string;
  iconId: string;
}

const PAYMENT_METHODS: Record<PaymentType, PaymentMethodDetails> = {
  credit_card: {
    processingFeePercentage: 2.9,
    settlementTimeHours: 24,
    displayName: "Credit Card",
    iconId: "icon-credit-card",
  },
  debit_card: {
    processingFeePercentage: 1.5,
    settlementTimeHours: 24,
    displayName: "Debit Card",
    iconId: "icon-debit-card",
  },
  paypal: {
    processingFeePercentage: 3.2,
    settlementTimeHours: 12,
    displayName: "PayPal",
    iconId: "icon-paypal",
  },
  bank_transfer: {
    processingFeePercentage: 0.8,
    settlementTimeHours: 72,
    displayName: "Bank Transfer",
    iconId: "icon-bank-transfer",
  },
  crypto: {
    processingFeePercentage: 1.0,
    settlementTimeHours: 2,
    displayName: "Cryptocurrency",
    iconId: "icon-crypto",
  },
};

export function getPaymentMethodDetails(paymentType: PaymentType): PaymentMethodDetails {
  return PAYMENT_METHODS[paymentType];
}
