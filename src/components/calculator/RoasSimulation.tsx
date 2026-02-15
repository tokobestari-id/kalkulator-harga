"use client";

import type { RoasSimulationResult } from "@/lib/types";
import { formatRupiah, formatPercent } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tooltip } from "@/components/ui/Tooltip";

interface RoasSimulationProps {
  data: RoasSimulationResult;
  roasValue: number;
  onRoasChange: (value: number) => void;
}

export function RoasSimulation({
  data,
  roasValue,
  onRoasChange,
}: RoasSimulationProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onRoasChange(0);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      onRoasChange(parsed);
    }
  };

  const isRoasAboveMinimum =
    data.minimumRoas !== Infinity && roasValue >= data.minimumRoas;

  return (
    <Card variant={data.isProfitableAfterAds ? "profit" : "loss"}>
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Simulasi Iklan
        </h3>
        <Tooltip text="ROAS = berapa kali lipat hasil dari biaya iklan. ROAS 8 artinya Rp1 iklan → Rp8 penjualan." />
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            ROAS kamu
          </label>
          <div className="flex items-center rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
            <input
              type="number"
              step="0.1"
              min={0}
              max={100}
              value={roasValue}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="pr-3 text-sm text-gray-500">x</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Makin tinggi ROAS, makin efisien iklan kamu
          </p>
        </div>

        {roasValue > 0 && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Biaya iklan per item</span>
              <span className="text-gray-900">
                -{formatRupiah(data.adCostPerItem)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    Untung setelah iklan
                  </span>
                  <Badge
                    variant={data.isProfitableAfterAds ? "profit" : "loss"}
                  />
                </div>
                <span
                  className={`text-lg font-bold ${
                    data.isProfitableAfterAds
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatRupiah(data.profitAfterAds)}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500">Margin setelah iklan</span>
                <span
                  className={`font-medium ${
                    data.isProfitableAfterAds
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatPercent(data.marginAfterAds)}
                </span>
              </div>
            </div>

            <div
              className={`mt-3 rounded-lg p-3 ${
                isRoasAboveMinimum ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex justify-between">
                <span
                  className={
                    isRoasAboveMinimum ? "text-green-700" : "text-red-700"
                  }
                >
                  ROAS minimal biar gak rugi
                </span>
                <span
                  className={`font-semibold ${
                    isRoasAboveMinimum ? "text-green-900" : "text-red-900"
                  }`}
                >
                  {data.minimumRoas === Infinity
                    ? "—"
                    : `${data.minimumRoas.toFixed(1)}x`}
                </span>
              </div>
              <p
                className={`mt-1 text-xs ${
                  isRoasAboveMinimum ? "text-green-600" : "text-red-600"
                }`}
              >
                {data.minimumRoas === Infinity
                  ? "Sudah rugi sebelum iklan — naikkan harga jual atau kurangi biaya"
                  : isRoasAboveMinimum
                    ? `ROAS kamu ${roasValue}x ✅ di atas batas aman`
                    : `ROAS di bawah ${data.minimumRoas.toFixed(1)}x = rugi setelah iklan`}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
