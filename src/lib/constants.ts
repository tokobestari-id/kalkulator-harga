import type { ShopeeCategory, ShopeeCategoryConfig, ShopeeSeller } from "./types";

export const SHOPEE_CATEGORIES: Record<ShopeeCategory, ShopeeCategoryConfig> = {
  A: {
    label: "Kategori A - Fashion, FMCG",
    description: "Fashion, Pakaian Muslim, FMCG, Makanan Kering, Snack, Perlengkapan Bayi",
    adminFeePercent: 10.0,
  },
  B: {
    label: "Kategori B - Elektronik, Kecantikan",
    description: "Elektronik, Aksesori, Jam Tangan, Perawatan Kulit, Gaming, Kamera",
    adminFeePercent: 9.5,
  },
  C: {
    label: "Kategori C - Rumah Tangga, Olahraga",
    description: "Peralatan Rumah Tangga, Olahraga, Otomotif",
    adminFeePercent: 7.5,
  },
  D: {
    label: "Kategori D - Perlengkapan Bayi",
    description: "Susu Formula, Makanan Bayi, Suplemen Bayi, Vitamin Bayi",
    adminFeePercent: 6.5,
  },
  E: {
    label: "Kategori E - Logam Mulia, Perhiasan",
    description: "Logam Mulia, Perhiasan, Alat Tulis tertentu",
    adminFeePercent: 4.25,
  },
};

export const SHOPEE_SELLER_LABELS: Record<ShopeeSeller, string> = {
  non_star: "Non-Star Seller",
  star: "Star Seller",
  star_plus: "Star+ Seller",
  mall: "Mall Seller",
};

export const SHOPEE_TRANSACTION_FEE = 1250;

export const SHOPEE_GRATIS_ONGKIR_DEFAULT = 4.5;
export const SHOPEE_AFFILIATE_DEFAULT = 4.0;
export const SHOPEE_AFFILIATE_SERVICE_FEE = 0.5;
export const SHOPEE_CAMPAIGN_DEFAULT = 1.5;

export const TIKTOK_PLATFORM_COMMISSION_DEFAULT = 5.0;
export const TIKTOK_DYNAMIC_COMMISSION_DEFAULT = 5.0;
export const TIKTOK_DYNAMIC_COMMISSION_CAP = 40000;
export const TIKTOK_ORDER_PROCESSING_FEE = 1250;
export const TIKTOK_AFFILIATE_DEFAULT = 5.0;
export const TIKTOK_FREE_SHIPPING_DEFAULT = 5.0;

export const DEFAULT_COMMON_INPUTS = {
  hargaModal: 0,
  hargaJual: 0,
  biayaPengemasan: 0,
  targetMargin: 20,
};

export const DEFAULT_SHOPEE_INPUTS = {
  category: "A" as ShopeeCategory,
  sellerType: "non_star" as ShopeeSeller,
  adminFeePercent: SHOPEE_CATEGORIES.A.adminFeePercent,
  gratisOngkirEnabled: true,
  gratisOngkirPercent: SHOPEE_GRATIS_ONGKIR_DEFAULT,
  affiliateEnabled: false,
  affiliatePercent: SHOPEE_AFFILIATE_DEFAULT,
  campaignEnabled: false,
  campaignPercent: SHOPEE_CAMPAIGN_DEFAULT,
};

export const DEFAULT_TIKTOK_INPUTS = {
  platformCommissionPercent: TIKTOK_PLATFORM_COMMISSION_DEFAULT,
  dynamicCommissionPercent: TIKTOK_DYNAMIC_COMMISSION_DEFAULT,
  affiliateEnabled: false,
  affiliatePercent: TIKTOK_AFFILIATE_DEFAULT,
  freeShippingEnabled: false,
  freeShippingPercent: TIKTOK_FREE_SHIPPING_DEFAULT,
};
