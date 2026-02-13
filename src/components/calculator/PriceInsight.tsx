"use client";

import type { PriceInsightResult, RoasSimulationResult } from "@/lib/types";
import { formatRupiah } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { PercentageInput } from "@/components/ui/PercentageInput";

interface PriceInsightProps {
  data: PriceInsightResult;
  roasSimulation: RoasSimulationResult;
  hargaJual: number;
  targetMargin: number;
  onTargetMarginChange: (value: number) => void;
}

export function PriceInsight({
  data,
  roasSimulation,
  hargaJual,
  targetMargin,
  onTargetMarginChange,
}: PriceInsightProps) {
  const isCurrentBelowBreakEven = hargaJual > 0 && hargaJual < data.breakEvenPrice;
  const isCurrentBelowBreakEvenAds =
    hargaJual > 0 && hargaJual < data.breakEvenWithAdsPrice;

  return (
    <Card title="Insight & Rekomendasi">
      <div className="space-y-5">
        {/* Break Even Prices */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Harga Minimum (Break Even)
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Tanpa iklan</p>
              <p className="text-lg font-bold text-gray-900">
                {data.breakEvenPrice > 0
                  ? formatRupiah(data.breakEvenPrice)
                  : "-"}
              </p>
              {isCurrentBelowBreakEven && (
                <p className="mt-1 text-xs text-red-600">
                  Harga saat ini di bawah break even
                </p>
              )}
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Dengan iklan (ROAS {data.roasValue}x)
              </p>
              <p className="text-lg font-bold text-gray-900">
                {data.breakEvenWithAdsPrice > 0
                  ? formatRupiah(data.breakEvenWithAdsPrice)
                  : "-"}
              </p>
              {!isCurrentBelowBreakEven && isCurrentBelowBreakEvenAds && (
                <p className="mt-1 text-xs text-red-600">
                  Harga saat ini di bawah break even
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Ideal Price */}
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Harga Ideal (Target Margin + Iklan)
          </h4>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Target Margin Keuntungan
            </label>
            <PercentageInput
              value={targetMargin}
              onChange={onTargetMarginChange}
              min={1}
              max={90}
            />
          </div>

          {data.idealPrice > 0 ? (
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs text-blue-600">
                Harga ideal (margin {data.targetMargin}% + ROAS{" "}
                {data.roasValue}x)
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {formatRupiah(data.idealPrice)}
              </p>
              <p className="mt-1 text-xs text-blue-600">
                Keuntungan bersih setelah semua biaya + iklan:{" "}
                <span className="font-semibold">
                  {formatRupiah(data.profitAtIdealPrice)}
                </span>{" "}
                per item
              </p>
            </div>
          ) : (
            <div className="rounded-lg bg-yellow-50 p-3">
              <p className="text-sm text-yellow-700">
                Total biaya + target margin + biaya iklan melebihi 100%.
                Kurangi target margin atau naikkan ROAS.
              </p>
            </div>
          )}
        </div>

        {/* Actionable Tips */}
        {hargaJual > 0 && isCurrentBelowBreakEvenAds && (
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Tips
            </h4>
            <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              <p className="font-medium">
                Harga jual saat ini ({formatRupiah(hargaJual)}) belum cukup
                untuk menutup biaya + iklan.
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
                <li>
                  Naikkan harga ke minimal{" "}
                  <span className="font-semibold">
                    {formatRupiah(data.breakEvenWithAdsPrice)}
                  </span>{" "}
                  supaya impas
                </li>
                {roasSimulation.minimumRoas !== Infinity && (
                  <li>
                    Atau naikkan ROAS ke minimal{" "}
                    <span className="font-semibold">
                      {roasSimulation.minimumRoas.toFixed(1)}x
                    </span>{" "}
                    supaya tidak rugi
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
