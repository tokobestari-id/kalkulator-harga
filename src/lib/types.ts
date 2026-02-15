export type Platform = "shopee" | "tiktok";

export type ShopeeCategory = "A" | "B" | "C" | "D" | "E";

export type ShopeeSeller = "non_star" | "star" | "star_plus" | "mall";

export interface ShopeeCategoryConfig {
  label: string;
  description: string;
  adminFeeByTier: Record<ShopeeSeller, number>;
}

export interface ShopeeInputs {
  category: ShopeeCategory;
  sellerType: ShopeeSeller;
  adminFeePercent: number;
  gratisOngkirPercent: number;
  affiliateEnabled: boolean;
  affiliatePercent: number;
}

export type TiktokSellerType = "marketplace" | "mall";

export interface TiktokSubcategoryConfig {
  label: string;
  platformCommission: number;
  gratisOngkirCommission: number;
}

export interface TiktokCategoryGroup {
  label: string;
  subcategories: Record<string, TiktokSubcategoryConfig>;
}

export interface TiktokInputs {
  subcategory: string;
  sellerType: TiktokSellerType;
  platformCommissionPercent: number;
  gratisOngkirPercent: number;
  affiliateEnabled: boolean;
  affiliatePercent: number;
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
