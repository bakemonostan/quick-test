"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/components/Form/FormFields";
import { PhoneInputField } from "@/components/Form/PhoneInputField";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import useCustomMutation from "@/hooks/mutations/useCusotmMutation";
import { RegistrationFormData } from "@/services/types";
import { register } from "@/services/auth";
import { Loader } from "@mantine/core";
import { toast } from "sonner";

const signUpSchema = z.object({
  first_name: z
    .string({
      required_error: "Please enter your first name 🙂",
    })
    .min(1, "First name is required"),
  last_name: z
    .string({
      required_error: "Please enter your last name 🙂",
    })
    .min(1, "Last name is required"),
  telephone: z.string({
    required_error: "Please enter your phone number 🙂",
  }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { email, setCards } = useAuthStore();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      telephone: "",
    },
  });

  const { mutate, isPending } = useCustomMutation<
    RegistrationFormData,
    SignUpFormValues
  >((data) => {
    const registrationData: RegistrationFormData = {
      ...data,
      email: email as string,
    };
    return register(registrationData);
  });
  
  const onSubmit = async (data: SignUpFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Sign up successful", {
          description: "Please verify your email to complete sign up",
        });
        setCards("verify-token");
      },
      onError: (error) => {
        toast.error("Sign up failed", {
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <div className="text-center pb-4">
        <p>{email}</p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 relative"
      >
        <TextInput
          name="first_name"
          label="First Name"
          placeholder="Enter your first name"
          control={form.control}
        />
        <TextInput
          name="last_name"
          label="Last Name"
          placeholder="Enter your last name"
          control={form.control}
        />
        <PhoneInputField
          name="telephone"
          label="Phone Number"
          placeholder="Enter your phone number"
          control={form.control}
          defaultCountry="US"
        />
        <Button
          type="submit"
          variant="outline"
          className="w-full rounded-full bg-neutral-100 hover:bg-neutral-200 py-6"
        >
          {isPending ? (
            <Loader color="yellow.4" size="sm" />
          ) : (
            "Complete sign up"
          )}
        </Button>
      </form>
    </Form>
  );
}
