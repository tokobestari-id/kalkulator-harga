import type { FeeBreakdownResult } from "@/lib/types";
import { formatRupiah, formatPercent } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";

interface FeeBreakdownProps {
  data: FeeBreakdownResult;
}

export function FeeBreakdown({ data }: FeeBreakdownProps) {
  return (
    <Card title="Rincian Biaya Platform">
      <div className="space-y-2">
        {data.items.map((item, i) => (
          <div key={i} className="flex items-start justify-between text-sm">
            <div>
              <span className="text-gray-600">{item.label}</span>
              {item.rate !== undefined && (
                <span className="ml-1 text-gray-400">
                  ({formatPercent(item.rate)})
                </span>
              )}
              {item.description && (
                <p className="text-xs text-gray-400">{item.description}</p>
              )}
            </div>
            <span className="ml-4 shrink-0 text-gray-900">
              {formatRupiah(item.amount)}
            </span>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-gray-900">
              Total Biaya ({formatPercent(data.totalFeesPercent)})
            </span>
            <span className="text-gray-900">
              {formatRupiah(data.totalFees)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
