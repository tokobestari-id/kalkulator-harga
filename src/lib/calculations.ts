import type {
  ShopeeInputs,
  TiktokInputs,
  CommonInputs,
  FeeBreakdownResult,
  FeeLineItem,
  ProfitAnalysisResult,
  MaxAdsBudgetResult,
  PriceRecommendationResult,
  CalculationResult,
  CalculatorInputs,
} from "./types";
import {
  SHOPEE_TRANSACTION_FEE,
  SHOPEE_AFFILIATE_SERVICE_FEE,
  TIKTOK_DYNAMIC_COMMISSION_CAP,
  TIKTOK_ORDER_PROCESSING_FEE,
} from "./constants";

export function calculateShopeeFees(
  hargaJual: number,
  inputs: ShopeeInputs
): FeeBreakdownResult {
  const items: FeeLineItem[] = [];

  const adminFee = hargaJual * (inputs.adminFeePercent / 100);
  items.push({
    label: "Biaya Admin",
    amount: Math.round(adminFee),
    rate: inputs.adminFeePercent,
  });

  items.push({
    label: "Biaya Layanan Transaksi",
    amount: SHOPEE_TRANSACTION_FEE,
    description: "Rp1.250 per transaksi",
  });

  if (inputs.gratisOngkirEnabled) {
    const fee = hargaJual * (inputs.gratisOngkirPercent / 100);
    items.push({
      label: "Program Gratis Ongkir",
      amount: Math.round(fee),
      rate: inputs.gratisOngkirPercent,
    });
  }

  if (inputs.affiliateEnabled) {
    const commission = hargaJual * (inputs.affiliatePercent / 100);
    items.push({
      label: "Komisi Affiliate",
      amount: Math.round(commission),
      rate: inputs.affiliatePercent,
    });

    const serviceFee = hargaJual * (SHOPEE_AFFILIATE_SERVICE_FEE / 100);
    items.push({
      label: "Biaya Layanan Affiliate",
      amount: Math.round(serviceFee),
      rate: SHOPEE_AFFILIATE_SERVICE_FEE,
    });
  }

  if (inputs.campaignEnabled) {
    const fee = hargaJual * (inputs.campaignPercent / 100);
    items.push({
      label: "Biaya Campaign",
      amount: Math.round(fee),
      rate: inputs.campaignPercent,
    });
  }

  const totalFees = items.reduce((sum, item) => sum + item.amount, 0);
  const totalFeesPercent = hargaJual > 0 ? (totalFees / hargaJual) * 100 : 0;

  return { items, totalFees, totalFeesPercent };
}

export function calculateTiktokFees(
  hargaJual: number,
  inputs: TiktokInputs
): FeeBreakdownResult {
  const items: FeeLineItem[] = [];

  const platformCommission =
    hargaJual * (inputs.platformCommissionPercent / 100);
  items.push({
    label: "Komisi Platform",
    amount: Math.round(platformCommission),
    rate: inputs.platformCommissionPercent,
  });

  const rawDynamic = hargaJual * (inputs.dynamicCommissionPercent / 100);
  const dynamicCommission = Math.min(rawDynamic, TIKTOK_DYNAMIC_COMMISSION_CAP);
  items.push({
    label: "Komisi Dinamis",
    amount: Math.round(dynamicCommission),
    rate: inputs.dynamicCommissionPercent,
    description:
      rawDynamic > TIKTOK_DYNAMIC_COMMISSION_CAP
        ? "Terkena cap maksimal Rp40.000"
        : undefined,
  });

  items.push({
    label: "Biaya Pemrosesan Order",
    amount: TIKTOK_ORDER_PROCESSING_FEE,
    description: "Rp1.250 per order",
  });

  if (inputs.affiliateEnabled) {
    const fee = hargaJual * (inputs.affiliatePercent / 100);
    items.push({
      label: "Komisi Affiliate",
      amount: Math.round(fee),
      rate: inputs.affiliatePercent,
    });
  }

  if (inputs.freeShippingEnabled) {
    const fee = hargaJual * (inputs.freeShippingPercent / 100);
    items.push({
      label: "Biaya Gratis Ongkir",
      amount: Math.round(fee),
      rate: inputs.freeShippingPercent,
    });
  }

  const totalFees = items.reduce((sum, item) => sum + item.amount, 0);
  const totalFeesPercent = hargaJual > 0 ? (totalFees / hargaJual) * 100 : 0;

  return { items, totalFees, totalFeesPercent };
}

export function calculateProfitAnalysis(
  common: CommonInputs,
  feeBreakdown: FeeBreakdownResult
): ProfitAnalysisResult {
  const totalCOGS = common.hargaModal + common.biayaPengemasan;
  const netProfit = common.hargaJual - totalCOGS - feeBreakdown.totalFees;
  const profitMargin =
    common.hargaJual > 0 ? (netProfit / common.hargaJual) * 100 : 0;

  return {
    revenue: common.hargaJual,
    totalCOGS,
    totalPlatformFees: feeBreakdown.totalFees,
    netProfit,
    profitMargin,
    isProfitable: netProfit > 0,
  };
}

export function calculateMaxAdsBudget(
  profitAnalysis: ProfitAnalysisResult
): MaxAdsBudgetResult {
  const maxBudgetPerItem = Math.max(0, profitAnalysis.netProfit);
  const maxBudgetPercent =
    profitAnalysis.revenue > 0
      ? (maxBudgetPerItem / profitAnalysis.revenue) * 100
      : 0;

  return { maxBudgetPerItem, maxBudgetPercent };
}

function extractFeePercentages(
  platform: "shopee" | "tiktok",
  shopee: ShopeeInputs,
  tiktok: TiktokInputs
): { totalPercentage: number; totalFixed: number } {
  if (platform === "shopee") {
    let pct = shopee.adminFeePercent;
    const fixed = SHOPEE_TRANSACTION_FEE;
    if (shopee.gratisOngkirEnabled) pct += shopee.gratisOngkirPercent;
    if (shopee.affiliateEnabled) pct += shopee.affiliatePercent + SHOPEE_AFFILIATE_SERVICE_FEE;
    if (shopee.campaignEnabled) pct += shopee.campaignPercent;
    return { totalPercentage: pct, totalFixed: fixed };
  } else {
    let pct = tiktok.platformCommissionPercent + tiktok.dynamicCommissionPercent;
    const fixed = TIKTOK_ORDER_PROCESSING_FEE;
    if (tiktok.affiliateEnabled) pct += tiktok.affiliatePercent;
    if (tiktok.freeShippingEnabled) pct += tiktok.freeShippingPercent;
    return { totalPercentage: pct, totalFixed: fixed };
  }
}

export function calculateRecommendedPrice(
  common: CommonInputs,
  totalFeePercentage: number,
  fixedFees: number
): PriceRecommendationResult {
  const totalCOGS = common.hargaModal + common.biayaPengemasan;
  const denominator =
    1 - totalFeePercentage / 100 - common.targetMargin / 100;

  let recommendedPrice = 0;
  if (denominator > 0) {
    recommendedPrice = Math.ceil((totalCOGS + fixedFees) / denominator);
  }

  const totalFeesAtRecommended =
    Math.round(recommendedPrice * (totalFeePercentage / 100)) + fixedFees;
  const netProfitAtRecommended =
    recommendedPrice - totalCOGS - totalFeesAtRecommended;

  return {
    recommendedPrice,
    targetMargin: common.targetMargin,
    totalFeesAtRecommended,
    netProfitAtRecommended,
  };
}

export function calculateAll(inputs: CalculatorInputs): CalculationResult {
  const feeBreakdown =
    inputs.platform === "shopee"
      ? calculateShopeeFees(inputs.common.hargaJual, inputs.shopee)
      : calculateTiktokFees(inputs.common.hargaJual, inputs.tiktok);

  const profitAnalysis = calculateProfitAnalysis(inputs.common, feeBreakdown);
  const maxAdsBudget = calculateMaxAdsBudget(profitAnalysis);

  const { totalPercentage, totalFixed } = extractFeePercentages(
    inputs.platform,
    inputs.shopee,
    inputs.tiktok
  );
  const priceRecommendation = calculateRecommendedPrice(
    inputs.common,
    totalPercentage,
    totalFixed
  );

  return { feeBreakdown, profitAnalysis, maxAdsBudget, priceRecommendation };
}
