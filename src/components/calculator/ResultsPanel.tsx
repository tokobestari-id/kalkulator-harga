import type { CalculationResult, CommonInputs } from "@/lib/types";
import { formatRupiah } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { FeeBreakdown } from "./FeeBreakdown";
import { ProfitAnalysis } from "./ProfitAnalysis";
import { RoasSimulation } from "./RoasSimulation";
import { PriceInsight } from "./PriceInsight";

interface ResultsPanelProps {
  results: CalculationResult;
  common: CommonInputs;
  onTargetMarginChange: (value: number) => void;
  onRoasChange: (value: number) => void;
}

function SummaryCard({ results }: { results: CalculationResult }) {
  const { profitAnalysis, roasSimulation, priceInsight } = results;

  return (
    <Card>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-gray-500">Untung Bersih</p>
          <p
            className={`text-lg font-bold leading-tight ${
              profitAnalysis.isProfitable ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatRupiah(profitAnalysis.netProfit)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Setelah Iklan</p>
          <p
            className={`text-lg font-bold leading-tight ${
              roasSimulation.isProfitableAfterAds
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {formatRupiah(roasSimulation.profitAfterAds)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Harga Ideal</p>
          <p className="text-lg font-bold leading-tight text-blue-600">
            {priceInsight.idealPrice > 0
              ? formatRupiah(priceInsight.idealPrice)
              : "-"}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function ResultsPanel({
  results,
  common,
  onTargetMarginChange,
  onRoasChange,
}: ResultsPanelProps) {
  if (common.hargaJual <= 0) {
    return (
      <Card>
        <p className="py-8 text-center text-sm text-gray-400">
          Masukkan harga jual untuk melihat kalkulasi
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <SummaryCard results={results} />
      <FeeBreakdown data={results.feeBreakdown} />
      <ProfitAnalysis data={results.profitAnalysis} />
      <RoasSimulation
        data={results.roasSimulation}
        roasValue={common.roasValue}
        onRoasChange={onRoasChange}
      />
      <PriceInsight
        data={results.priceInsight}
        roasSimulation={results.roasSimulation}
        hargaJual={common.hargaJual}
        targetMargin={common.targetMargin}
        onTargetMarginChange={onTargetMarginChange}
      />
    </div>
  );
}
