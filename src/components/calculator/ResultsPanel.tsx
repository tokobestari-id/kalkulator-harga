import type { CalculationResult, CommonInputs } from "@/lib/types";
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
