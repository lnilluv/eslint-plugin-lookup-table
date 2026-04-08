export type SubscriptionTier = "free" | "starter" | "pro" | "enterprise";

export interface PlanLimits {
  storageLimitGb: number;
  maxTeamMembers: number;
  monthlyApiCallQuota: number;
  customBrandingAvailable: boolean;
}

const PLAN_LIMITS: Record<SubscriptionTier, PlanLimits> = {
  free: {
    storageLimitGb: 5,
    maxTeamMembers: 1,
    monthlyApiCallQuota: 1000,
    customBrandingAvailable: false,
  },
  starter: {
    storageLimitGb: 50,
    maxTeamMembers: 5,
    monthlyApiCallQuota: 25000,
    customBrandingAvailable: false,
  },
  pro: {
    storageLimitGb: 250,
    maxTeamMembers: 25,
    monthlyApiCallQuota: 200000,
    customBrandingAvailable: true,
  },
  enterprise: {
    storageLimitGb: 2000,
    maxTeamMembers: 500,
    monthlyApiCallQuota: 5000000,
    customBrandingAvailable: true,
  },
};

export function getPlanLimits(tier: SubscriptionTier): PlanLimits {
  return PLAN_LIMITS[tier];
}
