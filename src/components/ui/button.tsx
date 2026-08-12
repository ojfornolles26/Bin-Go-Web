import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] border border-transparent shadow-xs font-bold",
  outline:
    "bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98] border border-slate-200 shadow-2xs font-bold",
  ghost:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-[0.98] border border-transparent font-bold",
};

const sizeStyles: Record<ButtonSize, string> = {
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
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
