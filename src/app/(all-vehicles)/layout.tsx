"use client";
import AllVehiclesNavbar from "./_components/AllVehiclesNavbar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVehicleDetailPage =
    pathname?.includes("/all-vehicles/") && pathname !== "/all-vehicles";

  return (
    <>
      <AllVehiclesNavbar />
      <section
        className={`flex flex-col mx-auto ${
          isVehicleDetailPage ? "lg:max-w-[60.5625rem]" : "lg:max-w-[79.5rem]"
        }`}>
        {children}
      </section>
    </>
  );
}

// lg:max-w-[56.5625rem]
