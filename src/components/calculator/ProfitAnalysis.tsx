import type { ProfitAnalysisResult } from "@/lib/types";
import { formatRupiah, formatPercent } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ProfitAnalysisProps {
  data: ProfitAnalysisResult;
}

export function ProfitAnalysis({ data }: ProfitAnalysisProps) {
  return (
    <Card variant={data.isProfitable ? "profit" : "loss"}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Analisis Keuntungan
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Pendapatan (Harga Jual)</span>
          <span className="text-gray-900">{formatRupiah(data.revenue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Harga Modal + Pengemasan</span>
          <span className="text-gray-900">-{formatRupiah(data.totalCOGS)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Biaya Platform</span>
          <span className="text-gray-900">
            -{formatRupiah(data.totalPlatformFees)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                Keuntungan Bersih
              </span>
              <Badge variant={data.isProfitable ? "profit" : "loss"} />
            </div>
            <span
              className={`text-lg font-bold ${
                data.isProfitable ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatRupiah(data.netProfit)}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-gray-500">Margin Keuntungan</span>
            <span
              className={`font-medium ${
                data.isProfitable ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatPercent(data.profitMargin)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
