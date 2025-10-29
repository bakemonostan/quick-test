'use client';

import { handlePost } from "@/utils/general";
import {
  LoginResponse,
  RegistrationFormData,
  VerifyTokenResponse,
} from "./types";
import { SignInFormValues } from "@/app/(auth)/_components/SignInForm";
import { VerifyTokenFormValues } from "@/app/(auth)/_components/VerifyToken";
import { SignUpFormValues } from "@/app/(auth)/_components/SignUpForm";

export const login = async (data: SignInFormValues): Promise<LoginResponse> => {
  return handlePost<LoginResponse>("/login", data);
};

export const verifyToken = async (
  data: VerifyTokenFormValues
): Promise<VerifyTokenResponse> => {
  return handlePost<VerifyTokenResponse>("/login/verification", data);
};

export const register = async (
  data: SignUpFormValues
): Promise<RegistrationFormData> => {
  return handlePost<RegistrationFormData>("/register", data);
};