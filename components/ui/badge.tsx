import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
        secondary:
          "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
        destructive:
          "border-transparent bg-rose-600 text-white hover:bg-rose-700",
        outline: "text-slate-300 border-white/20",
        emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
        cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
        amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
        indigo: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
