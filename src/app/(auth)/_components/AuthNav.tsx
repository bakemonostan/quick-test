'use client'
import { LogoIcon } from "@/components/icons";
import Link from "next/link";
export default function AuthNav() {
  return (
    <header className="border-b border-gray-200">
      <nav className="flex-between landing-container py-6 px-5">
        <Link href="/">
          <LogoIcon />
        </Link>
      </nav>
    </header>
  );
}
