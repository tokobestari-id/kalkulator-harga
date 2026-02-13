import type { MaxAdsBudgetResult, ProfitAnalysisResult } from "@/lib/types";
import { formatRupiah, formatPercent } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";

interface MaxAdsBudgetProps {
  data: MaxAdsBudgetResult;
  profitAnalysis: ProfitAnalysisResult;
}

export function MaxAdsBudget({ data, profitAnalysis }: MaxAdsBudgetProps) {
  return (
    <Card title="Budget Iklan Maksimal">
      {profitAnalysis.isProfitable ? (
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatRupiah(data.maxBudgetPerItem)}
            </span>
            <span className="text-sm text-gray-500">per item</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {formatPercent(data.maxBudgetPercent)} dari harga jual
          </p>
          <p className="mt-3 text-xs text-gray-400">
            Anda bisa menghabiskan hingga{" "}
            <span className="font-medium text-gray-600">
              {formatRupiah(data.maxBudgetPerItem)}
            </span>{" "}
            per item untuk iklan dan masih impas (break even).
          </p>
        </div>
      ) : (
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-sm font-medium text-red-700">
            Anda sudah merugi{" "}
            <span className="font-bold">
              {formatRupiah(Math.abs(profitAnalysis.netProfit))}
            </span>{" "}
            per item sebelum biaya iklan.
          </p>
          <p className="mt-1 text-xs text-red-600">
            Naikkan harga jual atau kurangi biaya untuk bisa beriklan.
          </p>
        </div>
      )}
    </Card>
  );
}
