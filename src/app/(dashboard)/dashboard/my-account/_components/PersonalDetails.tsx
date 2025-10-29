"use client";
import { useUserStore } from "@/store/userStore";
import DetailsComponent from "./DetailsComponent";
import { ProfileCarousel } from "@/app/(dashboard)/dashboard/my-account/_components/ProfileCarousel";
import { useModal } from "@/providers/ModalContext";

export default function PersonalDetails() {
  const { details } = useUserStore();
  const { openModal } = useModal();
  return (
    <div className="flex flex-col">
      <DetailsComponent
        title="Legal name"
        subtitle={details?.legal_name}
      />
      <DetailsComponent
        title="Residential address"
        subtitle={details?.address || "No address added"}
        withLink={true}
        onAction={() => {
          openModal("edit-details", { modalType: "address" });
        }}
      />
      <DetailsComponent
        title="Email address"
        subtitle={details?.email}
        withLink={true}
        onAction={() => {
          openModal("edit-details", { modalType: "email" });
        }}
      />

      <DetailsComponent
        title="Phone number"
        subtitle={details?.telephone || "No phone number added"}
        withLink={true}
        info="Your number will only be shared with someone you have a confirmed booking with."
        onAction={() => {
          openModal("edit-details", { modalType: "telephone" });
        }}
      />
      <div className="mt-10">
        <ProfileCarousel />
      </div>
    </div>
  );
}
