"use client";

import { ModalId, ModalParamsFor } from "@/types/modal-types";
import { ReactNode } from "react";
import { Button } from "./button";
import { useModal } from "@/providers/ModalContext";

interface ModalButtonProps<T extends ModalId> extends React.ComponentProps<typeof Button> {
  modalId: T;
  modalParams?: ModalParamsFor<T>;
  children: ReactNode;
}

export function ModalButton<T extends ModalId>({ 
  modalId, 
  modalParams,
  children,
  variant = "default",
  size = "default",
  className,
  ...props 
}: ModalButtonProps<T>) {
  const { openModal } = useModal();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => openModal(modalId, modalParams)}
      {...props}
    >
      {children}
    </Button>
  );
} 
