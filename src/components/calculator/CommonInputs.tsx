"use client";

import type { CommonInputs as CommonInputsType } from "@/lib/types";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

interface CommonInputsProps {
  values: CommonInputsType;
  onChange: (values: CommonInputsType) => void;
}

export function CommonInputs({ values, onChange }: CommonInputsProps) {
  const update = (field: keyof CommonInputsType, value: number) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div className="space-y-4">
      <CurrencyInput
        label="Harga Modal (HPP)"
        value={values.hargaModal}
        onChange={(v) => update("hargaModal", v)}
        placeholder="Harga beli/produksi barang"
      />
      <CurrencyInput
        label="Harga Jual"
        value={values.hargaJual}
        onChange={(v) => update("hargaJual", v)}
        placeholder="Harga jual di marketplace"
      />
      <CurrencyInput
        label="Biaya Pengemasan"
        value={values.biayaPengemasan}
        onChange={(v) => update("biayaPengemasan", v)}
        placeholder="Biaya packaging per item"
      />
    </div>
  );
}
