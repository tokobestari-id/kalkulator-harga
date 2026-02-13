"use client";

import { useState, useCallback } from "react";

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export function CurrencyInput({
  label,
  value,
  onChange,
  placeholder = "0",
}: CurrencyInputProps) {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  const formattedValue =
    value > 0 ? value.toLocaleString("id-ID") : "";

  const handleFocus = useCallback(() => {
    setFocused(true);
    setDisplayValue(value > 0 ? String(value) : "");
  }, [value]);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "");
      setDisplayValue(raw);
      onChange(raw ? parseInt(raw, 10) : 0);
    },
    [onChange]
  );

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
        <span className="pl-3 text-sm text-gray-500">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          value={focused ? displayValue : formattedValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full rounded-lg px-2 py-2.5 text-sm text-gray-900 outline-none"
        />
      </div>
    </div>
  );
}
