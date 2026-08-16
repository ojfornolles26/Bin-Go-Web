import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] border border-transparent shadow-xs font-bold",
  outline:
    "bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98] border border-slate-200 shadow-2xs font-bold",
  ghost:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-[0.98] border border-transparent font-bold",
};

const sizeStyles = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
