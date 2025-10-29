import React from "react";
import Goback from "@/components/shared/Goback";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  goback?: boolean;
  title: string | undefined;
  subtitle?: string;
  withSubtitle?: boolean;
}

export default function HeaderComponent({
  goback = false,
  title = "Title",
  subtitle = "Welcome to your dashboard",
  withSubtitle = false,
  ...rest
}: HeaderProps) {
  return (
    <div {...rest}>
      {goback && <Goback />}
      <p className="heading-l pb-1 text-black/80 capitalize">{title}</p>
      {withSubtitle && <p className="body-2 text-black/80">{subtitle}</p>}
    </div>
  );
}
