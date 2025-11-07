import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-sm text-brand-900 shadow-inner transition placeholder:text-brand-700/50 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-300/60",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";

