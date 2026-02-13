export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded === 0) return "Rp0";
  const isNegative = rounded < 0;
  const formatted = Math.abs(rounded).toLocaleString("id-ID");
  return `${isNegative ? "-" : ""}Rp${formatted}`;
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function parseRupiahInput(value: string): number {
  const cleaned = value.replace(/\D/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}
