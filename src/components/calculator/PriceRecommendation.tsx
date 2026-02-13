"use client";

import type { PriceRecommendationResult } from "@/lib/types";
import { formatRupiah } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { PercentageInput } from "@/components/ui/PercentageInput";

interface PriceRecommendationProps {
  data: PriceRecommendationResult;
  targetMargin: number;
  roasValue: number;
  onTargetMarginChange: (value: number) => void;
}

export function PriceRecommendation({
  data,
  targetMargin,
  roasValue,
  onTargetMarginChange,
}: PriceRecommendationProps) {
  return (
    <Card title="Rekomendasi Harga Jual">
      <div className="space-y-4">
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

        {data.recommendedPrice > 0 ? (
          <div>
            <p className="text-sm text-gray-500">Rekomendasi Harga Jual</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatRupiah(data.recommendedPrice)}
            </p>
            <div className="mt-2 space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Biaya platform</span>
                <span className="font-medium text-gray-600">
                  {formatRupiah(data.totalFeesAtRecommended)}
                </span>
              </div>
              {roasValue > 0 && (
                <div className="flex justify-between">
                  <span>Biaya iklan (ROAS {roasValue}x)</span>
                  <span className="font-medium text-gray-600">
                    {formatRupiah(data.adCostAtRecommended)}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-1">
                <span>Keuntungan bersih setelah iklan</span>
                <span className="font-medium text-green-600">
                  {formatRupiah(data.netProfitAtRecommended)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-yellow-50 p-3">
            <p className="text-sm text-yellow-700">
              Total biaya + target margin + biaya iklan melebihi 100%. Kurangi
              biaya, target margin, atau naikkan ROAS.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
