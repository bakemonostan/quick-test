import { LogoIcon } from "@/components/icons";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavDropdownMenu from "@/app/(landing)/_components/shared/NavDropdownMenu";
export default function AllVehiclesNavbar() {
  return (
    <header className="sticky top-0 border-b border-gray-200 bg-white z-50 opacity-90">
      <nav className="flex-row flex-between mx-auto lg:max-w-[79.5rem] p-5">
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
