"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalContext";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/config/api";
import { toast } from "sonner";
import { useVehicleListingStore } from "@/app/(list-a-vehicle)/list-a-vehicle/vehicleListingstore";
import { deleteCookie } from "cookies-next";
export function PreviewSubmissionModal() {
  const { closeModal } = useModal();
  const router = useRouter();
  const store = useVehicleListingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await api.post(`/vehicle/save/${store.listingId}`);
    },
    onSuccess: () => {
      closeModal();
      toast.success("Vehicle listed successfully", {
        description:
          "Your vehicle has been listed successfully, awaiting approval",
      });
      store.resetStore();
      localStorage.removeItem("vehicle-listing-data");
      deleteCookie("vehicle-listing-data");
      router.push("/dashboard/listings");
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message || "Something went wrong, please try again",
      });
      closeModal();
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <Modal
      id="preview-submission-modal"
      onClose={closeModal}
      description="Are you sure you want to submit this listing?"
      title="Submit Listing?"
      className="w-full modal-md"
    >
      <div className="py-5 w-full">
        <Button 
          className="w-full" 
          variant="cta" 
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Proceed"}
        </Button>
      </div>
    </Modal>
  );
}
