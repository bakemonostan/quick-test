'use client'
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Goback() {
  const router = useRouter();

  return (
    <ArrowLeftCircle
      className="text-brand-yellow-0 cursor-pointer active:scale-110 b-1"
      onClick={router.back}
    />
  );
}
