"use client";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import useInvalidateQuery from "@/hooks/mutations/useInvalidateQuery";
import api from "@/config/api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/Form/FormFields";
import { Form } from "@/components/ui/form";
const bioSchema = z.object({
  bio: z.string().min(1, { message: "Bio is required" }),
});

type BioFormValues = z.infer<typeof bioSchema>;

export const EditBioModal = () => {
  const { closeModal } = useModal();
  const { refetchQuery } = useInvalidateQuery();

  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: "",
    },
  });

  const { mutate: updateBio } = useMutation({
    mutationKey: ["update bio"],
    mutationFn: async (values: BioFormValues) =>
      api.put("/account/profile", values),

    onSuccess: () => {
      toast.success("Bio updated successfully");
      refetchQuery({ queryKey: ["user-details"] });
      closeModal();
    },

    onError: () => {
      toast.error("Failed to update bio");
    },
  });

  const onSubmit = (values: BioFormValues) => {
    updateBio(values);
  };

  return (
    <Modal
      id="edit-bio"
      title={`Edit Bio`}
      className="modal-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3">
          <TextInput
            name="bio"
            control={form.control}
            label="Bio"
            placeholder="Update bio"
          />
          <div className="flex justify-end pt-5">
            <Button
              type="submit"
              className="w-max">
              Submit Changes
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
