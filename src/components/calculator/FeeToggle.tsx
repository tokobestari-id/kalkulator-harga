"use client";

import { Toggle } from "@/components/ui/Toggle";
import { PercentageInput } from "@/components/ui/PercentageInput";
import { Tooltip } from "@/components/ui/Tooltip";

interface FeeToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  percent: number;
  onPercentChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function FeeToggle({
  label,
  description,
  enabled,
  onToggle,
  percent,
  onPercentChange,
  min = 0,
  max = 100,
}: FeeToggleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Toggle enabled={enabled} onChange={onToggle} />
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {description && <Tooltip text={description} />}
        </div>
      </div>
      {enabled && (
        <div className="ml-13 pl-0.5">
          <PercentageInput
            value={percent}
            onChange={onPercentChange}
            min={min}
            max={max}
          />
        </div>
      )}
    </div>
  );
}
