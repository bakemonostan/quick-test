import React from "react";
import { useIsMutating } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ComponentProps<"button"> {
  onClick?: () => void;
  isActive?: boolean;
  title?: string;
  innerBg?: string;
}

export default function GradientButton({
  onClick,
  isActive = true,
  title,
  innerBg,
  ...props
}: GradientButtonProps) {
  const isMutating = useIsMutating();
  return (
    <button
      onClick={onClick}
      data-state={isActive ? "active" : "inactive"}
      disabled={isMutating > 0}
      className={cn(
        "relative border-0 rounded-full overflow-hidden cursor-pointer",
        isActive 
          ? 'before:absolute before:inset-0 p-[0.5px] before:bg-gradient-to-r before:from-[#FFCB4E] before:to-[#AD75E2] before:rounded-full' 
          : 'border-border border-[0.5px]',
        isMutating && "opacity-50"
      )}
      {...props}>
      <span
        className={cn(
          "relative flex items-center justify-center px-6 py-3 rounded-full",
          isActive && 'mx-[0.5px] my-[0.5px]'
        )}
        style={{ background: innerBg || 'var(--background, #000)' }}>
        {title}
      </span>
    </button>
  );
}
