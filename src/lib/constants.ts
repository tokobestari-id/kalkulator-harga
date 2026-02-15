import type {
  ShopeeCategory,
  ShopeeCategoryConfig,
  ShopeeSeller,
  TiktokSellerType,
  TiktokCategoryGroup,
  TiktokSubcategoryConfig,
} from "./types";

export const SHOPEE_CATEGORIES: Record<ShopeeCategory, ShopeeCategoryConfig> = {
  A: {
    label: "Kategori A - Fashion, Aksesori",
    description: "Fashion, Aksesori, Mainan, Buku, Otomotif, Casing HP",
    adminFeeByTier: { non_star: 10.0, star: 10.0, star_plus: 10.0, mall: 11.7 },
  },
  B: {
    label: "Kategori B - Elektronik, Kecantikan",
    description: "Taman, Elektronik Mid, Skincare, Snack, Lampu",
    adminFeeByTier: { non_star: 9.5, star: 9.5, star_plus: 9.5, mall: 11.0 },
  },
  C: {
    label: "Kategori C - Rumah Tangga, Olahraga",
    description: "Furniture, Perhiasan Asli, Olahraga, Vacuum, Setrika",
    adminFeeByTier: { non_star: 9.0, star: 9.0, star_plus: 9.0, mall: 10.5 },
  },
  D: {
    label: "Kategori D - FMCG Pokok, Elektronik Besar",
    description: "Susu Formula, Popok Bayi, Beras, Kulkas, Mesin Cuci, AC",
    adminFeeByTier: { non_star: 8.25, star: 8.25, star_plus: 8.25, mall: 9.5 },
  },
  E: {
    label: "Kategori E - Gadget, Elektronik Mahal",
    description: "Handphone, Laptop, Tablet, Kamera, SSD, Harddisk",
    adminFeeByTier: { non_star: 6.75, star: 6.75, star_plus: 6.75, mall: 8.0 },
  },
};

export const SHOPEE_SELLER_LABELS: Record<ShopeeSeller, string> = {
  non_star: "Non-Star Seller",
  star: "Star Seller",
  star_plus: "Star+ Seller",
  mall: "Mall Seller",
};

export const SHOPEE_TRANSACTION_FEE = 1250;

export const SHOPEE_PAYMENT_FEE_PERCENT = 1.8;
export const SHOPEE_PAYMENT_FEE_CAP = 50000;

export const SHOPEE_GRATIS_ONGKIR_DEFAULT = 4.5;
export const SHOPEE_AFFILIATE_DEFAULT = 4.0;
export const SHOPEE_AFFILIATE_SERVICE_FEE = 0.5;

export const TIKTOK_GRATIS_ONGKIR_CAP = 40000;
export const TIKTOK_ORDER_PROCESSING_FEE = 1250;
export const TIKTOK_MALL_SERVICE_FEE_PERCENT = 1.8;
export const TIKTOK_AFFILIATE_DEFAULT = 5.0;

export const TIKTOK_SELLER_LABELS: Record<TiktokSellerType, string> = {
  marketplace: "Marketplace (Reguler)",
  mall: "Mall Seller",
};

export const TIKTOK_CATEGORY_GROUPS: TiktokCategoryGroup[] = [
  {
    label: "Elektronik",
    subcategories: {
      virtual_products:   { label: "Virtual Products",    platformCommission: 1.0,   gratisOngkirCommission: 4.0 },
      handphone_tablet:   { label: "Handphone & Tablet",  platformCommission: 4.25,  gratisOngkirCommission: 4.0 },
      laptop_komputer:    { label: "Laptop & Komputer",   platformCommission: 4.25,  gratisOngkirCommission: 4.0 },
      aksesori_handphone: { label: "Aksesori Handphone",  platformCommission: 8.0,   gratisOngkirCommission: 4.0 },
      kulkas_ac:          { label: "Kulkas & AC",         platformCommission: 4.0,   gratisOngkirCommission: 4.0 },
      speaker_audio:      { label: "Speaker & Audio",     platformCommission: 8.0,   gratisOngkirCommission: 5.5 },
      kamera_dslr:        { label: "Kamera DSLR",         platformCommission: 4.25,  gratisOngkirCommission: 4.0 },
    },
  },
  {
    label: "Otomotif",
    subcategories: {
      sepeda_motor:     { label: "Sepeda Motor",      platformCommission: 3.5,  gratisOngkirCommission: 5.5 },
      spare_part_motor: { label: "Spare Part Motor",   platformCommission: 5.5,  gratisOngkirCommission: 5.5 },
    },
  },
  {
    label: "Perhiasan & Mewah",
    subcategories: {
      emas_berlian: { label: "Emas & Berlian", platformCommission: 4.25, gratisOngkirCommission: 4.0 },
      jam_tangan:   { label: "Jam Tangan",     platformCommission: 4.25, gratisOngkirCommission: 4.0 },
    },
  },
  {
    label: "Fashion",
    subcategories: {
      pakaian_wanita:   { label: "Pakaian Wanita",    platformCommission: 8.0, gratisOngkirCommission: 5.5 },
      pakaian_pria:     { label: "Pakaian Pria",       platformCommission: 8.0, gratisOngkirCommission: 5.0 },
      sepatu:           { label: "Sepatu",             platformCommission: 8.0, gratisOngkirCommission: 5.0 },
      tas_koper:        { label: "Tas & Koper",        platformCommission: 8.0, gratisOngkirCommission: 5.5 },
      hijab_muslim:     { label: "Hijab & Muslim",     platformCommission: 8.0, gratisOngkirCommission: 5.5 },
      aksesori_fashion: { label: "Aksesori Fashion",   platformCommission: 8.0, gratisOngkirCommission: 6.0 },
      perhiasan_imitasi:{ label: "Perhiasan Imitasi",  platformCommission: 8.0, gratisOngkirCommission: 4.0 },
    },
  },
  {
    label: "FMCG",
    subcategories: {
      susu_formula_bayi: { label: "Susu Formula Bayi", platformCommission: 5.75, gratisOngkirCommission: 4.0 },
      popok_bayi:        { label: "Popok Bayi",        platformCommission: 7.5,  gratisOngkirCommission: 4.0 },
      skincare_makeup:   { label: "Skincare & Makeup", platformCommission: 8.0,  gratisOngkirCommission: 4.0 },
      makanan_snack:     { label: "Makanan & Snack",   platformCommission: 7.5,  gratisOngkirCommission: 5.0 },
      beras_minyak:      { label: "Beras & Minyak",    platformCommission: 5.75, gratisOngkirCommission: 5.0 },
    },
  },
  {
    label: "Lifestyle",
    subcategories: {
      buku_majalah:        { label: "Buku & Majalah",        platformCommission: 8.0, gratisOngkirCommission: 5.0 },
      mainan_anak:         { label: "Mainan Anak",           platformCommission: 8.0, gratisOngkirCommission: 6.0 },
      perlengkapan_hewan:  { label: "Perlengkapan Hewan",    platformCommission: 7.5, gratisOngkirCommission: 6.0 },
      furniture:           { label: "Furniture",             platformCommission: 8.0, gratisOngkirCommission: 5.0 },
      alat_dapur:          { label: "Alat Dapur",            platformCommission: 8.0, gratisOngkirCommission: 6.0 },
    },
  },
];

// Flat lookup for O(1) access by subcategory key
export const TIKTOK_SUBCATEGORIES: Record<string, TiktokSubcategoryConfig> =
  TIKTOK_CATEGORY_GROUPS.reduce(
    (acc, group) => ({ ...acc, ...group.subcategories }),
    {} as Record<string, TiktokSubcategoryConfig>
  );

export const DEFAULT_ROAS = 8;

export const DEFAULT_COMMON_INPUTS = {
  hargaModal: 0,
  hargaJual: 0,
  biayaPengemasan: 0,
  targetMargin: 20,
  roasValue: DEFAULT_ROAS,
};

export const DEFAULT_SHOPEE_INPUTS = {
  category: "A" as ShopeeCategory,
  sellerType: "non_star" as ShopeeSeller,
  adminFeePercent: SHOPEE_CATEGORIES.A.adminFeeByTier.non_star,
  gratisOngkirPercent: SHOPEE_GRATIS_ONGKIR_DEFAULT,
  affiliateEnabled: false,
  affiliatePercent: SHOPEE_AFFILIATE_DEFAULT,
};

export const DEFAULT_TIKTOK_INPUTS = {
  subcategory: "pakaian_wanita",
  sellerType: "marketplace" as TiktokSellerType,
  platformCommissionPercent: TIKTOK_SUBCATEGORIES.pakaian_wanita.platformCommission,
  gratisOngkirPercent: TIKTOK_SUBCATEGORIES.pakaian_wanita.gratisOngkirCommission,
  affiliateEnabled: false,
  affiliatePercent: TIKTOK_AFFILIATE_DEFAULT,
};
