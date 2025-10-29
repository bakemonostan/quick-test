"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "./GoogleIcon";
import { toast } from "sonner";

interface Props {
  onToken: (token: string) => void;
}

export default function GoogleSignInButton({ onToken }: Props) {
  const login = useGoogleLogin({
    scope:
      "email profile openid https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: async (tokenResponse) => {
      if (tokenResponse?.access_token) {
        onToken(tokenResponse.access_token);
      } else {
        toast.error("Google login failed: no access token received");
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  return (
    <div
      onClick={() => login()}
      className="cursor-pointer">
      <GoogleIcon />
    </div>
  );
}
