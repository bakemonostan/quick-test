import { LogoIcon } from "@/components/icons";
import React from "react";
import NavDropdownMenu from "../../../(landing)/_components/shared/NavDropdownMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 border-b border-gray-200 bg-white z-50 opacity-90">
      <nav className="flex-row flex-between mx-auto lg:max-w-[1272px] p-5 sm:px-2">
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="h-10 rounded-full border-black/80 active:bg-black/10 active:translate-y-1 transition-all active:duration-300">
            <Link
              href="/list-a-vehicle"
              className="px-2 ">
              Start earning on Kaparki
            </Link>
          </Button>
        </div>
        <div>
          <NavDropdownMenu />
        </div>
      </nav>
    </header>
  );
}
