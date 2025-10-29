"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/components/Form/FormFields";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import useCustomMutation from "@/hooks/mutations/useCusotmMutation";
import { LoginResponse } from "@/services/types";
import { login } from "@/services/auth";
import { Loader } from "@mantine/core";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";
import useInvalidateQuery from "@/hooks/mutations/useInvalidateQuery";
import { useEffect } from "react";

const signInSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your email address 🙂",
    })
    .email({
      message: "Please enter a valid email address 🙂",
    }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  redirectPath?: string;
}

export default function SignInForm({ redirectPath = "/" }: SignInFormProps) {
  const { setCards, setEmail, isAuthenticated  } = useAuthStore();
  const router = useRouter();
  const { refetchQuery } = useInvalidateQuery();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard/overview");
    }
  }, [isAuthenticated, router]);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useCustomMutation<
    LoginResponse,
    SignInFormValues
  >(login);

  const onSubmit = async (data: SignInFormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        setEmail(data.email);
        if (data && 'token' in data) {
          setCookie("kpk_token", data.token);
          useAuthStore.setState({
            isAuthenticated: true,
          });
          refetchQuery({ queryKey: ["dashboard data"] });
          
          toast.success("Login successful");
          router.push(redirectPath);
        } else {
          toast.success("Login successful", {
            description: "Please verify your email to complete login",
          });
          setCards("verify-token");
        }
      },
      onError: (error) => {
        if (error.message === "Proceed to Sign Up") {
          setEmail(data.email);
          setCards("sign-up");
        }
        toast.error("Sign in failed", {
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 relative"
      >
        <TextInput
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          control={form.control}
        />
        <Button type="submit" variant="ghost" className="w-full rounded-full">
          <p className="button-text">
            {isPending ? <Loader color="yellow.4" size="sm" /> : "Continue"}
          </p>
        </Button>
      </form>
    </Form>
  );
}
