import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/providers/ModalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/config/api";

const addressSchema = z.object({
  address: z
    .string({
      required_error: "Address is required"
    })
    .min(1, "Address is required")
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddressModal() {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: AddressFormValues) => {
      return api.put('/account/profile', values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-details'] });
      toast.success("Success", {
        description: "Address updated successfully"
      });
      closeModal();
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to update address"
      });
      closeModal();
    }
  });

  function onSubmit(values: AddressFormValues) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-5">
          <Button type="submit" disabled={isPending}>Submit Changes</Button>
        </div>
      </form>
    </Form>
  );
}
