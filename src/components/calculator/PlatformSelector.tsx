"use client";

import type { Platform } from "@/lib/types";

interface PlatformSelectorProps {
  platform: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformSelector({
  platform,
  onChange,
}: PlatformSelectorProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange("shopee")}
        className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
          platform === "shopee"
            ? "bg-shopee text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Shopee
      </button>
      <button
        type="button"
        onClick={() => onChange("tiktok")}
        className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
          platform === "tiktok"
            ? "bg-tiktok text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        TikTok Shop
      </button>
    </div>
  );
}
