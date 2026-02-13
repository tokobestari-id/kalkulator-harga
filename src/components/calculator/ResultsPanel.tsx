import type { CalculationResult, CommonInputs } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { FeeBreakdown } from "./FeeBreakdown";
import { ProfitAnalysis } from "./ProfitAnalysis";
import { MaxAdsBudget } from "./MaxAdsBudget";
import { PriceRecommendation } from "./PriceRecommendation";

interface ResultsPanelProps {
  results: CalculationResult;
  common: CommonInputs;
  onTargetMarginChange: (value: number) => void;
}

export function ResultsPanel({
  results,
  common,
  onTargetMarginChange,
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
      <MaxAdsBudget
        data={results.maxAdsBudget}
        profitAnalysis={results.profitAnalysis}
      />
      <PriceRecommendation
        data={results.priceRecommendation}
        targetMargin={common.targetMargin}
        onTargetMarginChange={onTargetMarginChange}
      />
    </div>
  );
}
