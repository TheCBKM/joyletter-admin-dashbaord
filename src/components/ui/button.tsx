import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type ButtonProps = {
  asChild?: boolean;
  variant?: "primary" | "ghost" | "soft";
  size?: "default" | "sm" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, asChild = false, variant = "primary", size = "default", ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:pointer-events-none disabled:opacity-60",
          variant === "primary" && "bg-brand-600 text-white shadow-lg shadow-brand-500/40 hover:bg-brand-700",
          variant === "ghost" && "bg-white/70 text-brand-700 shadow-sm hover:bg-white",
          variant === "soft" && "bg-brand-500/15 text-brand-700 hover:bg-brand-500/25",
          size === "default" && "px-5 py-3 text-sm",
          size === "sm" && "px-4 py-2 text-xs",
          size === "lg" && "px-6 py-3 text-base",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

