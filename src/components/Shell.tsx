import { cn } from "@/lib/utils";
import React from "react";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ children, ...props }) => {
  return (
    <div className={cn("landing-container mx-auto", props.className)} {...props}>
      {children}
    </div>
  );
};

export default Shell;
