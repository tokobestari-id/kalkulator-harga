"use client";

import type { ShopeeInputs, ShopeeCategory, ShopeeSeller } from "@/lib/types";
import {
  SHOPEE_CATEGORIES,
  SHOPEE_SELLER_LABELS,
} from "@/lib/constants";
import { Select } from "@/components/ui/Select";
import { PercentageInput } from "@/components/ui/PercentageInput";
import { Tooltip } from "@/components/ui/Tooltip";
import { FeeToggle } from "./FeeToggle";

interface ShopeeFormProps {
  values: ShopeeInputs;
  onChange: (values: ShopeeInputs) => void;
}

const categoryOptions = (
  Object.entries(SHOPEE_CATEGORIES) as [ShopeeCategory, (typeof SHOPEE_CATEGORIES)[ShopeeCategory]][]
).map(([key, config]) => ({
  value: key,
  label: config.label,
}));

const sellerOptions = (
  Object.entries(SHOPEE_SELLER_LABELS) as [ShopeeSeller, string][]
).map(([key, label]) => ({
  value: key,
  label,
}));

function getAdminFee(category: ShopeeCategory, sellerType: ShopeeSeller): number {
  return SHOPEE_CATEGORIES[category].adminFeeByTier[sellerType];
}

/** Selector section: Kategori + Tipe Seller (rendered above price inputs) */
export function ShopeeSelector({ values, onChange }: ShopeeFormProps) {
  const handleCategoryChange = (value: string) => {
    const category = value as ShopeeCategory;
    onChange({
      ...values,
      category,
      adminFeePercent: getAdminFee(category, values.sellerType),
    });
  };

  const handleSellerChange = (value: string) => {
    const sellerType = value as ShopeeSeller;
    onChange({
      ...values,
      sellerType,
      adminFeePercent: getAdminFee(values.category, sellerType),
    });
  };

  return (
    <div className="space-y-4">
      <Select
        label="Kategori Produk"
        value={values.category}
        onChange={handleCategoryChange}
        options={categoryOptions}
      />
      <p className="text-xs text-gray-500 -mt-2">
        {SHOPEE_CATEGORIES[values.category].description}
      </p>

      <Select
        label="Tipe Seller"
        value={values.sellerType}
        onChange={handleSellerChange}
        options={sellerOptions}
      />
      {values.sellerType === "mall" && (
        <p className="text-xs text-amber-600 -mt-2">
          Shopee Mall dikenakan Biaya Pembayaran 1,8% (maks. Rp50.000)
        </p>
      )}
    </div>
  );
}

/** Fee settings: Admin + Gratis Ongkir (always-on) + Affiliate toggle */
export function ShopeeForm({ values, onChange }: ShopeeFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Biaya Admin
          </label>
          <Tooltip text="Biaya administrasi Shopee berdasarkan kategori produk & tipe seller. Otomatis terisi, tapi bisa diedit manual sesuai sub-kategori Anda." />
        </div>
        <PercentageInput
          value={values.adminFeePercent}
          onChange={(v) => onChange({ ...values, adminFeePercent: v })}
          min={0}
          max={15}
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Biaya Gratis Ongkir
          </label>
          <Tooltip text="Biaya program Gratis Ongkir XTRA Shopee yang ditanggung seller" />
        </div>
        <PercentageInput
          value={values.gratisOngkirPercent}
          onChange={(v) => onChange({ ...values, gratisOngkirPercent: v })}
          min={0}
          max={15}
        />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <FeeToggle
          label="Affiliate"
          description="Komisi affiliate untuk kreator/influencer yang mempromosikan produk Anda (+0.5% biaya layanan)"
          enabled={values.affiliateEnabled}
          onToggle={(v) => onChange({ ...values, affiliateEnabled: v })}
          percent={values.affiliatePercent}
          onPercentChange={(v) =>
            onChange({ ...values, affiliatePercent: v })
          }
          max={15}
        />
      </div>
    </div>
  );
}
