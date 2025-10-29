import React from "react";
import { Card, CardSection } from "@mantine/core";
import { BookingHistoryIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface dashboardContentCardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isCentered?: boolean;
  withIcon?: boolean;
  title?: string;
  value?: string;
  icon?: React.ReactNode;
}

export default function OverViewContentCard({
  isCentered,
  withIcon,
  title = "Title",
  value = "4",
  icon,
  className,
  ...rest
}: dashboardContentCardProps) {
  return (
    <Card
      className={cn("border", isCentered && "text-center", className)}
      {...rest}>
      <CardSection>
        <div className={cn("p-4 ", isCentered && "flex flex-col items-center")}>
          {withIcon && (
            <div className="pb-1">
              {icon || <BookingHistoryIcon />}
            </div>
          )}
          <p className="text-black/80 text-[0.875rem] pb-1 font-medium">
            {title}
          </p>
          <p className="font-bold text-[1.375rem] text-black/80">{value}</p>
        </div>
      </CardSection>
    </Card>
  );
}
