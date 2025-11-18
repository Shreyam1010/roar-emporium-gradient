import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-2 border-white/80 bg-secondary/40 text-white hover:bg-secondary/60 hover:border-white shadow-sm",
        destructive: "border-2 border-white/80 bg-destructive/80 text-white hover:bg-destructive hover:border-white shadow-sm",
        outline: "border-2 border-white/80 bg-secondary/40 text-white hover:bg-secondary/60 hover:border-white shadow-sm",
        secondary: "border-2 border-white/60 bg-secondary/60 text-white hover:bg-secondary/80 hover:border-white shadow-sm",
        ghost: "border-2 border-white/80 bg-secondary/40 text-white hover:bg-secondary/60 hover:border-white shadow-sm",
        link: "text-white underline-offset-4 hover:underline",
        premium: "border-2 border-white/80 bg-secondary/40 text-white hover:bg-secondary/60 hover:border-white shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-xl px-4",
        lg: "h-12 rounded-xl px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
