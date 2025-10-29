"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ModalId, ModalParamsFor } from "@/types/modal-types";

type ModalParamsType = {
  [K in ModalId]?: ModalParamsFor<K>;
};

interface ModalContextType {
  openModal: <T extends ModalId>(id: T, params?: ModalParamsFor<T>) => void;
  closeModal: () => void;
  activeModal: ModalId | null;
  modalParams: ModalParamsType | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const [modalParams, setModalParams] = useState<ModalParamsType | null>(null);

  const openModal = <T extends ModalId>(id: T, params?: ModalParamsFor<T>) => {
    setActiveModal(id);
    if (params) {
      setModalParams({ [id]: params } as ModalParamsType);
    } else {
      setModalParams(null);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalParams(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, activeModal, modalParams }}>
      {children}
    </ModalContext.Provider>
  );
} 
