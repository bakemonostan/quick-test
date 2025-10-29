import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import React from "react";
import AddressModal from "./AddressModal";
import EmailModal from "./EmailModal";
import PhoneModal from "./PhoneModal";

export default function EditDetailsModal() {
  const { modalParams } = useModal();
  const modalType = modalParams?.["edit-details"]?.modalType;
  return (
    <Modal
      id="edit-details"
      title="Edit Details"
      description="Edit your details"
      className="modal-md">
      {modalType === "address" && <AddressModal />}
      {modalType === "email" && <EmailModal />}
      {modalType === "telephone" && <PhoneModal />}
    </Modal>
  );
}
