'use client'
import { PinInputComponent } from "@/components/Form/FormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { setCookie } from "cookies-next/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "@/store/authStore";
import { VerifyTokenResponse } from "@/services/types";
import useCustomMutation from "@/hooks/mutations/useCusotmMutation";
import { verifyToken } from "@/services/auth";
import { Loader } from "@mantine/core";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useInvalidateQuery from "@/hooks/mutations/useInvalidateQuery";

const verifyTokenSchema = z.object({
  code: z
    .string({
      required_error: "Token is required",
    })
    .min(4, {
      message: "Token must be 5 digits",
    }),
  email: z.string().optional(),
});

export type VerifyTokenFormValues = z.infer<typeof verifyTokenSchema>;

export default function VerifyToken() {
  const { email, setCards} = useAuthStore();
  const { refetchQuery } = useInvalidateQuery();
  const router = useRouter();
  const form = useForm<VerifyTokenFormValues>({
    resolver: zodResolver(verifyTokenSchema),
  });

  const { mutate, isPending } = useCustomMutation<
    VerifyTokenResponse,
    VerifyTokenFormValues
  >(verifyToken);



  const onSubmit = (data: VerifyTokenFormValues) => {
    mutate(
      { code: data.code, email: email! },
      {
        onSuccess: (data) => {
          setCookie("kpk_token", data.token);
          toast.success("Login successful", {
            description: "Redirecting...",
          });
          window.location.reload();
          router.push("/dashboard/overview");
          setCards("sign-in");
          refetchQuery({ queryKey: ["dashboard data"] });
          useAuthStore.setState({
            isAuthenticated: true,
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <p className="text-center text-body-2 leading-body-2 text-gray-500 pb-6">
        To complete login, kindly enter the OTP sent to{" "}
        <span className="font-bold text-gray-900">{email}</span>
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6">
        <PinInputComponent
          name="code"
          control={form.control}
        />
        <Button
          type="submit"
          variant="ghost"
          className="w-full rounded-full">
          <p className="button-text">
            {isPending ? (
              <Loader
                color="yellow.4"
                size="sm"
              />
            ) : (
              "Verify and login"
            )}
          </p>
        </Button>
      </form>
    </Form>
  );
}
