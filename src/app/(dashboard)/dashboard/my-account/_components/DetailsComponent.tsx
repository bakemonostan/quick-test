import React from "react";
import { Skeleton } from "@mantine/core";
import { cn } from "@/lib/utils";

interface DetailsComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  linkText?: string;
  info?: string;
  isLoading?: boolean;
  isColumn?: boolean;
  withLink?: boolean;
  onAction?: () => void;
  className?: string;
}

export default function DetailsComponent({
  title,
  subtitle = "",
  linkText = "Edit",
  info = "",
  isLoading = false,
  isColumn = false,
  withLink = false,
  onAction,
  className,
  ...props
}: DetailsComponentProps) {
  const handleAction = () => {
    if (onAction) {
      onAction();
    }
  };

  if (isLoading) {
    return <Skeleton className="w-full h-40" />;
  }

  return (
    <div
      className={cn(
        "flex justify-between border-b py-8",
        isColumn ? "flex-col" : "items-center",
        className
      )}
      {...props}>
      <div
        className={`space-y-1 text-sm sm:text-base text-black/60 ${
          isColumn ? "flex flex-col space-y-5" : ""
        }`}>
        <p className={isColumn ? "text-black/50 header-6" : ""}>{title}</p>

        {isLoading ? (
          <Skeleton className="w-full h-4" />
        ) : (
          <p
            className={`text-sm font-medium sm:text-base ${
              isColumn ? "text-black/75" : "text-black/75"
            }`}>
            {subtitle}
          </p>
        )}
        <p className="text-black/60 body-2 font-normal max-w-[414px] w-full">
          {info}
        </p>
      </div>
      {withLink ? (
        <div
          className="py-5 cursor-pointer"
          onClick={handleAction}>
          <p className="text-sm font-bold sm:text-base cursor-pointer w-max">
            {linkText}
          </p>
        </div>
      ) : (
        <div>{null}</div>
      )}
    </div>
  );
}
