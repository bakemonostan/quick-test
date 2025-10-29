'use client';

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie, deleteCookie } from "cookies-next/client";
import { toast } from "sonner";

export interface AxiosErrorResponse extends AxiosRequestConfig {
  error: string;
  message: string;
  response: { data: { message: string } };
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer",
  },
});

const isClient = typeof window !== 'undefined';

api.interceptors.request.use(
  (config) => {
    if (isClient) {
      const kpk_token = getCookie("kpk_token");
      if (kpk_token) {
        config.headers.Authorization = `Bearer ${kpk_token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<AxiosErrorResponse>) => {
    let errorMessage = "An unknown error occurred";
    
    if (isClient) {
      if (error.response) {
        if (error.response.status === 401) {
          deleteCookie('kpk_token');
          toast.error(error.response?.data?.message || "Authentication error", {
            description: "Please log in 😊",
          });
          window.location.href = "/auth";
        }
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message || errorMessage;
      }
    } else {
      errorMessage = error.message || "Server-side request error";
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
