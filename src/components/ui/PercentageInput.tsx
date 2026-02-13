"use client";

interface PercentageInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function PercentageInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: PercentageInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange(0);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex items-center rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
        <input
          type="number"
          step="0.1"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-full rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="pr-3 text-sm text-gray-500">%</span>
      </div>
    </div>
  );
}
