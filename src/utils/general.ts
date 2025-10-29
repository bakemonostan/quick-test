'use client'

import api from "@/config/api";
import axios from "axios";
export interface ApiResponse<T> {
  message: string;
  status: boolean;
  data: T;
}

export const handlePost = async <T>(
  url: string,
  values?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, values);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error.response.data.message);
    } else {
      return Promise.reject(error);
    }
  }
};

export const handleGet = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export function formatDate(date: Date | string | null | undefined, format?: 'Y/m/d' | null): string {
  if (!date) return '';
  
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  if (format === 'Y/m/d') {
    return `${year}/${month}/${day}`;
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

export const formatCurrencyToEuros = (price: number) => {
  if (isNaN(price)) {
    return '€0.00'
  }

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatter.format(price)
}

export const calculateVat = (price: number, vat: number) => {
  const vatAmount = (price * vat) / 100
  return formatCurrencyToEuros(vatAmount)
}

export const calculatePriceAfterVat = (price: number, vat: number) => {
  const vatAmount = calculateVat(price, vat)
  const vatAmountNumber = parseFloat(vatAmount.replace('€', '').replace(',', '.'))
  const priceAfterVat = price - vatAmountNumber
  return formatCurrencyToEuros(priceAfterVat)
}


export const getStatusClass = (status: string | undefined) => {
  if (status === "confirmed") return "text-green-600 bg-[#05603A1A]";
  if (status === "cancelled") return "text-black/80 bg-red-100";
  return "text-gray-600 bg-gray-100";
};

export const getCircleClass = (status: string | undefined) => {
  if (status === "confirmed") return "bg-[#05603A]";
  if (status === "cancelled") return "bg-red-700";
  return "bg-gray-700";
};


export const compressImage = async (base64String: string, maxWidth = 800, quality = 0.6): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      
      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get compressed base64 string
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = base64String;
  });
};
