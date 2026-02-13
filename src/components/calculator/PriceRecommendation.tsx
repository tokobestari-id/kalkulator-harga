"use client";

import type { PriceRecommendationResult } from "@/lib/types";
import { formatRupiah } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { PercentageInput } from "@/components/ui/PercentageInput";

interface PriceRecommendationProps {
  data: PriceRecommendationResult;
  targetMargin: number;
  onTargetMarginChange: (value: number) => void;
}

export function PriceRecommendation({
  data,
  targetMargin,
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
            <p className="mt-2 text-xs text-gray-400">
              Dengan harga ini, estimasi biaya platform{" "}
              <span className="font-medium text-gray-600">
                {formatRupiah(data.totalFeesAtRecommended)}
              </span>{" "}
              dan keuntungan bersih sekitar{" "}
              <span className="font-medium text-green-600">
                {formatRupiah(data.netProfitAtRecommended)}
              </span>{" "}
              per item.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-yellow-50 p-3">
            <p className="text-sm text-yellow-700">
              Total biaya + target margin melebihi 100%. Kurangi biaya atau
              target margin.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
