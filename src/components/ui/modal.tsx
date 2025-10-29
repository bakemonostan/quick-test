"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalContext";
import { ModalId } from "@/types/modal-types";

interface ModalProps {
  id: ModalId;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  closeOnInteractOutside?: boolean; // Add this prop
}

export function Modal({ 
  id, 
  title, 
  description = "", 
  children, 
  className, 
  onClose,
  closeOnInteractOutside = true // Default to true
}: ModalProps) {
  const { activeModal, closeModal } = useModal();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setOpen(activeModal === id);
  }, [activeModal, id]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      closeModal();
      onClose?.();
    }
  };

  const dialogClassNames = `override-mantine-modal ${className || ''}`;

  return (
    <Dialog 
      open={open} 
      onOpenChange={handleOpenChange}
      modal={true} // Ensure modal behavior
    >
      <DialogContent 
        className={dialogClassNames}
        onInteractOutside={(e) => {
          if (!closeOnInteractOutside) {
            e.preventDefault();
          }
        }}
      >
        {title && (
          <DialogHeader>
            <DialogTitle className="header-l">{title}</DialogTitle>
            <DialogDescription className={description ? "body-2 text-black" : "sr-only"}>
              {description || `${title} dialog`}
            </DialogDescription>
          </DialogHeader>
        )}
        {!title && (
          <DialogDescription className="sr-only">
            Modal dialog
          </DialogDescription>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}