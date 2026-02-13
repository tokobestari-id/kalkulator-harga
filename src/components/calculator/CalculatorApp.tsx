"use client";

import { useState, useMemo } from "react";
import type {
  Platform,
  CommonInputs as CommonInputsType,
  ShopeeInputs,
  TiktokInputs,
} from "@/lib/types";
import {
  DEFAULT_COMMON_INPUTS,
  DEFAULT_SHOPEE_INPUTS,
  DEFAULT_TIKTOK_INPUTS,
} from "@/lib/constants";
import { calculateAll } from "@/lib/calculations";
import { Card } from "@/components/ui/Card";
import { PlatformSelector } from "./PlatformSelector";
import { CommonInputs } from "./CommonInputs";
import { ShopeeForm } from "./ShopeeForm";
import { TiktokForm } from "./TiktokForm";
import { ResultsPanel } from "./ResultsPanel";

export function CalculatorApp() {
  const [platform, setPlatform] = useState<Platform>("shopee");
  const [common, setCommon] = useState<CommonInputsType>(DEFAULT_COMMON_INPUTS);
  const [shopee, setShopee] = useState<ShopeeInputs>(DEFAULT_SHOPEE_INPUTS);
  const [tiktok, setTiktok] = useState<TiktokInputs>(DEFAULT_TIKTOK_INPUTS);

  const results = useMemo(
    () => calculateAll({ platform, common, shopee, tiktok }),
    [platform, common, shopee, tiktok]
  );

  const handleTargetMarginChange = (value: number) => {
    setCommon((prev) => ({ ...prev, targetMargin: value }));
  };

  const handleRoasChange = (value: number) => {
    setCommon((prev) => ({ ...prev, roasValue: value }));
  };

  return (
    <div className="space-y-6">
      <PlatformSelector platform={platform} onChange={setPlatform} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Card title="Input Harga">
            <CommonInputs values={common} onChange={setCommon} />
          </Card>
          <Card title="Pengaturan Biaya">
            {platform === "shopee" ? (
              <ShopeeForm values={shopee} onChange={setShopee} />
            ) : (
              <TiktokForm values={tiktok} onChange={setTiktok} />
            )}
          </Card>
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <ResultsPanel
            results={results}
            common={common}
            onTargetMarginChange={handleTargetMarginChange}
            onRoasChange={handleRoasChange}
          />
        </div>
      </div>
    </div>
  );
}
