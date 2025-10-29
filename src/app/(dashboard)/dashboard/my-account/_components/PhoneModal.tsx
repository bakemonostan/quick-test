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

const phoneSchema = z.object({
    telephone: z
    .string({
      required_error: "Phone number is required"
    })
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number")
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

export default function PhoneModal() {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      telephone: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PhoneFormValues) => {
      return api.put('/account/profile', values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-details'] });
      toast.success("Success", {
        description: "Phone number updated successfully"
      });
      closeModal();
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to update phone number"
      });
      closeModal();
    }
  });

  function onSubmit(values: PhoneFormValues) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Phone number" {...field} />
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
