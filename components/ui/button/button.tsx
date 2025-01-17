import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "../spinner";

const buttonVariants = cva(
  "btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background dark:hover:bg-[#1a1a1a] hover:border-transparent hover:text-accent-foreground rounded-full",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5",
        link: "text-primary underline-offset-4 hover:underline",
        none: "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        xlg: "h-12 px-8",
        icon: "size-9",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, isLoading, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && icon && <span>{icon}</span>}
        <span className={icon ? "mx-3" : ""}>{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
