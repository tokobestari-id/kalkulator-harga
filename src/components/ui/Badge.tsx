interface BadgeProps {
  variant: "profit" | "loss";
}

export function Badge({ variant }: BadgeProps) {
  if (variant === "profit") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
        ✅ UNTUNG
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
      ❌ RUGI
    </span>
  );
}
