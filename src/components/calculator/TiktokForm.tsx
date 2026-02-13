"use client";

import type { TiktokInputs } from "@/lib/types";
import { PercentageInput } from "@/components/ui/PercentageInput";
import { Tooltip } from "@/components/ui/Tooltip";
import { FeeToggle } from "./FeeToggle";

interface TiktokFormProps {
  values: TiktokInputs;
  onChange: (values: TiktokInputs) => void;
}

export function TiktokForm({ values, onChange }: TiktokFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Komisi Platform
          </label>
          <Tooltip text="Komisi yang dipotong TikTok Shop, berbeda per kategori produk (1-10%)" />
        </div>
        <PercentageInput
          value={values.platformCommissionPercent}
          onChange={(v) =>
            onChange({ ...values, platformCommissionPercent: v })
          }
          min={1}
          max={10}
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-sm font-medium text-gray-700">
            Komisi Dinamis
          </label>
          <Tooltip text="Komisi dinamis TikTok Shop (4-6%), maksimal Rp40.000 per item" />
        </div>
        <PercentageInput
          value={values.dynamicCommissionPercent}
          onChange={(v) =>
            onChange({ ...values, dynamicCommissionPercent: v })
          }
          min={4}
          max={6}
        />
        <p className="mt-1 text-xs text-gray-500">
          Maksimal Rp40.000 per item
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-4">
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
        <FeeToggle
          label="Gratis Ongkir"
          description="Subsidi ongkir yang ditanggung seller"
          enabled={values.freeShippingEnabled}
          onToggle={(v) => onChange({ ...values, freeShippingEnabled: v })}
          percent={values.freeShippingPercent}
          onPercentChange={(v) =>
            onChange({ ...values, freeShippingPercent: v })
          }
          max={20}
        />
      </div>
    </div>
  );
}
