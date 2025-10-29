import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import { getsingleListing } from "@/services/dashboard";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";
import { ModalButton } from "@/components/ui/modal-button";
import useInvalidateQuery from "@/hooks/mutations/useInvalidateQuery";
import api from "@/config/api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
export const ListingsModal = () => {
  const { modalParams, closeModal } = useModal();
  const listingId = modalParams?.listings?.listingId as string;
    const { refetchQuery } = useInvalidateQuery();
  
const { mutate } = useMutation({
  mutationKey: ['pause ad'],
  mutationFn: async () =>
    api.put(`/vehicle/update/listing-status/${listingId}`, {
      action: data?.status === "active" ? "pause" : "activate"
    }),

  onSuccess: () => {
    toast.success('Ad paused successfully')
    refetchQuery({ queryKey: ['getsingleListing', listingId] })
  },

  onError: () => {
    toast.error('Failed to pause ad')
  }
})
  const { data } = useCustomQuery(
    ["getsingleListing", listingId],
    () => getsingleListing(listingId),
    {
      enabled: !!listingId,
    }
  );

  return (
    <Modal
      id="listings"
      title={`${data?.status === "active" ? "Pause" : "Resume"} Ad`}
      className="modal-md">
      <div className="space-y-4">
        <p className="body-2 text-black/60">
          {data?.status === "active"
            ? "Are you sure you want to pause this ad?"
            : "Are you sure you want to resume this ad?"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ModalButton
          variant="outline"
          modalId="listings"
          className="border-none shadow-none"
          onClick={() => closeModal()}>
          Cancel
        </ModalButton>
        <ModalButton
          modalId="listings"
          className="rounded-full"
          onClick={() => mutate()}>
          {data?.status === "active" ? "Pause" : "Resume"}
        </ModalButton>
      </div>
    </Modal>
  );
};
