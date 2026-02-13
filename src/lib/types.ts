export type Platform = "shopee" | "tiktok";

export type ShopeeCategory = "A" | "B" | "C" | "D" | "E";

export type ShopeeSeller = "non_star" | "star" | "star_plus" | "mall";

export interface ShopeeCategoryConfig {
  label: string;
  description: string;
  adminFeePercent: number;
}

export interface ShopeeInputs {
  category: ShopeeCategory;
  sellerType: ShopeeSeller;
  adminFeePercent: number;
  gratisOngkirEnabled: boolean;
  gratisOngkirPercent: number;
  affiliateEnabled: boolean;
  affiliatePercent: number;
  campaignEnabled: boolean;
  campaignPercent: number;
}

export interface TiktokInputs {
  platformCommissionPercent: number;
  dynamicCommissionPercent: number;
  affiliateEnabled: boolean;
  affiliatePercent: number;
  freeShippingEnabled: boolean;
  freeShippingPercent: number;
}

export interface CommonInputs {
  hargaModal: number;
  hargaJual: number;
  biayaPengemasan: number;
  targetMargin: number;
  roasValue: number;
}

export interface CalculatorInputs {
  platform: Platform;
  common: CommonInputs;
  shopee: ShopeeInputs;
  tiktok: TiktokInputs;
}

export interface FeeLineItem {
  label: string;
  amount: number;
  rate?: number;
  description?: string;
}

export interface FeeBreakdownResult {
  items: FeeLineItem[];
  totalFees: number;
  totalFeesPercent: number;
}

export interface ProfitAnalysisResult {
  revenue: number;
  totalCOGS: number;
  totalPlatformFees: number;
  netProfit: number;
  profitMargin: number;
  isProfitable: boolean;
}

export interface MaxAdsBudgetResult {
  maxBudgetPerItem: number;
  maxBudgetPercent: number;
}

export interface RoasSimulationResult {
  adCostPerItem: number;
  profitAfterAds: number;
  marginAfterAds: number;
  isProfitableAfterAds: boolean;
  minimumRoas: number;
}

export interface PriceInsightResult {
  breakEvenPrice: number;
  breakEvenWithAdsPrice: number;
  idealPrice: number;
  targetMargin: number;
  roasValue: number;
  profitAtIdealPrice: number;
}

export interface CalculationResult {
  feeBreakdown: FeeBreakdownResult;
  profitAnalysis: ProfitAnalysisResult;
  roasSimulation: RoasSimulationResult;
  priceInsight: PriceInsightResult;
}
