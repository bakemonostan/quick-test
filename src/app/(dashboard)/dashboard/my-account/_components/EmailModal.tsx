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

const emailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required"
    })
    .email("Please enter a valid email address")
    .min(1, "Email is required")
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function EmailModal() {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: EmailFormValues) => {
      return api.put('/account/profile', values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-details'] });
      toast.success("Success", {
        description: "Email updated successfully"
      });
      closeModal();
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to update email"
      });
      closeModal();
    }
  });

  function onSubmit(values: EmailFormValues) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email address" {...field} />
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