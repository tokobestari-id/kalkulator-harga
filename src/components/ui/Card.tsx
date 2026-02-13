interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "profit" | "loss";
}

export function Card({
  title,
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const borderClass =
    variant === "profit"
      ? "border-l-4 border-l-profit"
      : variant === "loss"
        ? "border-l-4 border-l-loss"
        : "";

  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white p-5 shadow-sm ${borderClass} ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
