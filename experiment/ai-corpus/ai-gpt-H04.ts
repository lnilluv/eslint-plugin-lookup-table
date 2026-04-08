export type SubscriptionTier = "free" | "starter" | "pro" | "enterprise";

export interface PlanLimits {
  storageLimitGb: number;
  maxTeamMembers: number;
  monthlyApiCallQuota: number;
  customBrandingAvailable: boolean;
}

export function getPlanLimits(tier: SubscriptionTier): PlanLimits {
  switch (tier) {
    case "free":
      return {
        storageLimitGb: 1,
        maxTeamMembers: 1,
        monthlyApiCallQuota: 1000,
        customBrandingAvailable: false,
      };
    case "starter":
      return {
        storageLimitGb: 10,
        maxTeamMembers: 5,
        monthlyApiCallQuota: 25000,
        customBrandingAvailable: false,
      };
    case "pro":
      return {
        storageLimitGb: 100,
        maxTeamMembers: 25,
        monthlyApiCallQuota: 500000,
        customBrandingAvailable: true,
      };
    case "enterprise":
      return {
        storageLimitGb: Infinity,
        maxTeamMembers: Infinity,
        monthlyApiCallQuota: Infinity,
        customBrandingAvailable: true,
      };
  }
}
