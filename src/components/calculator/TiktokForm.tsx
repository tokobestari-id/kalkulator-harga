"use client";

import type { TiktokInputs, TiktokSellerType } from "@/lib/types";
import {
  TIKTOK_CATEGORY_GROUPS,
  TIKTOK_SUBCATEGORIES,
  TIKTOK_SELLER_LABELS,
} from "@/lib/constants";
import { GroupSelect } from "@/components/ui/GroupSelect";
import { Select } from "@/components/ui/Select";
import { PercentageInput } from "@/components/ui/PercentageInput";
import { Tooltip } from "@/components/ui/Tooltip";
import { FeeToggle } from "./FeeToggle";

interface TiktokFormProps {
  values: TiktokInputs;
  onChange: (values: TiktokInputs) => void;
}

// Build grouped options for GroupSelect (computed once at module level)
const subcategoryGroups = TIKTOK_CATEGORY_GROUPS.map((group) => ({
  label: group.label,
  options: Object.entries(group.subcategories).map(([key, config]) => ({
    value: key,
    label: config.label,
  })),
}));

const sellerOptions = (
  Object.entries(TIKTOK_SELLER_LABELS) as [TiktokSellerType, string][]
).map(([key, label]) => ({
  value: key,
  label,
}));

/** Selector section: Subkategori + Tipe Seller (rendered above price inputs) */
export function TiktokSelector({ values, onChange }: TiktokFormProps) {
  const handleSubcategoryChange = (value: string) => {
    const config = TIKTOK_SUBCATEGORIES[value];
    if (!config) return;
    onChange({
      ...values,
      subcategory: value,
      platformCommissionPercent: config.platformCommission,
      gratisOngkirPercent: config.gratisOngkirCommission,
    });
  };

  const handleSellerChange = (value: string) => {
    onChange({
      ...values,
      sellerType: value as TiktokSellerType,
    });
  };

  return (
    <div className="space-y-4">
      <GroupSelect
        label="Subkategori Produk"
        value={values.subcategory}
        onChange={handleSubcategoryChange}
        groups={subcategoryGroups}
      />

      <Select
        label="Tipe Seller"
        value={values.sellerType}
        onChange={handleSellerChange}
        options={sellerOptions}
      />
      {values.sellerType === "mall" && (
        <p className="text-xs text-amber-600 -mt-2">
          Mall Seller dikenakan Biaya Layanan Mall 1,8%
        </p>
      )}
    </div>
  );
}

/** Fee settings: Admin + Gratis Ongkir (always-on) + Affiliate toggle */
export function TiktokForm({ values, onChange }: TiktokFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Biaya Admin
          </label>
          <Tooltip text="Biaya admin TikTok berdasarkan subkategori. Otomatis terisi, tapi bisa diedit manual." />
        </div>
        <PercentageInput
          value={values.platformCommissionPercent}
          onChange={(v) =>
            onChange({ ...values, platformCommissionPercent: v })
          }
          min={0}
          max={15}
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Biaya Gratis Ongkir
          </label>
          <Tooltip text="Biaya program gratis ongkir TikTok berdasarkan subkategori, maks Rp40.000 per item" />
        </div>
        <PercentageInput
          value={values.gratisOngkirPercent}
          onChange={(v) =>
            onChange({ ...values, gratisOngkirPercent: v })
          }
          min={0}
          max={10}
        />
        <p className="mt-1 text-xs text-gray-500">
          Maksimal Rp40.000 per item
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <FeeToggle
          label="Affiliate"
          description="Komisi untuk kreator/affiliate TikTok yang mempromosikan produk Anda"
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
