"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useIsMutating } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center  gap-2 whitespace-nowrap rounded-md transition-[color,box-shadow] disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive duration-300  cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover ",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive-light focus-visible:ring-destructive-light dark:focus-visible:ring-destructive-light",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "bg-black/5 hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-success text-white shadow-xs hover:bg-success-light focus-visible:ring-success-light dark:focus-visible:ring-success-light",
        cta: "rounded-[1.5rem] cta-gradient text-white",
        plain: "bg-transparent text-primary border-none",
      },
      size: {
        default: "h-9 px-4 py-6 has-[>svg]:px-3 ",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        cta: "h-[3rem] rounded-[1.5rem] py-4 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // Automatically use size "cta" when variant is "cta"
  if (variant === "cta" && !size) {
    size = "cta";
  }

  // Create ripple effect for CTA buttons
  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (variant !== "cta") return;

      const button = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      // Get position relative to the button
      const rect = button.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;
      circle.classList.add("ripple");

      // Remove existing ripples
      const ripple = button.getElementsByClassName("ripple")[0];
      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    },
    [variant]
  );

  const isMutating = useIsMutating();
  const isLoading = isMutating > 0;

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      onClick={(e) => {
        createRipple(e);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
