"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Menu, ToggleRight } from "lucide-react";
import Link from "next/link";
import { DropdownMenuItems, DropdownMenuItemsTwo } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { useState } from "react";
import { Popover, PopoverDropdown, PopoverTarget } from "@mantine/core";

export default function NavDropdownMenu() {
  const { user, setUser, username, profilePicture, setUsername, setProfilePicture  } = useUserStore();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const menuItems = isAuthenticated ? DropdownMenuItems : DropdownMenuItemsTwo;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="items-center rounded-full cursor-pointer sm:flex sm:gap-4">
        <Button
          variant="link"
          className="rounded-full">
          <Link
            href="/auth"
            className="text-sm sm:text-base ">
            Sign up
          </Link>
        </Button>
        <Button
          variant="outline"
          className="rounded-full">
          <Link
            href="/auth"
            className="text-sm font-bold w-14 sm:text-base">
            Login
          </Link>
        </Button>
      </div>
    );
  }

  const signOut = () => {
    setUser(null);
    setUsername(null);
    setProfilePicture(null);
    if (typeof setIsAuthenticated === "function") {
      setIsAuthenticated(false);
    }
    localStorage.removeItem("authStore");
    localStorage.removeItem("user-store");
    localStorage.removeItem("list-a-vehicle");
    deleteCookie("kpk_token");
    router.push("/");
    router.refresh();
  };

  const handleItemClick = () => {};

  return (
    <>
      {open && <div onClick={() => setOpen(false)} />}
      <Popover
        withOverlay
        styles={{
          dropdown: {
            width: "256px",
            padding: ".0625rem",
            borderRadius: "1.58rem",
            background: "linear-gradient(to bottom, #FFCB4E, #DDC7F2)",
          },
        }}
      >
        <PopoverTarget>
          <div className="flex items-center md:gap-1 bg-black/10 rounded-full p-1 md:px-2 cursor-pointer justify-center">
            <Avatar className="hidden sm:block h-8 w-8">
              <AvatarImage
                className="border-[.1875rem] rounded-full border-brand-yellow-0"
                src={profilePicture || user?.details.profile_picture || "https://pbs.twimg.com/profile_images/1599029039297077249/p0znhFdE_200x200.jpg"}
              />
            </Avatar>
            <span className="hidden sm:block capitalize">{username || user?.details.legal_name}</span>
            <span className="border-2 block">
              <Menu className="text-black/50 w-5 h-5 md:mt-1" />
            </span>
          </div>
        </PopoverTarget>
        <PopoverDropdown className="w-[256px] p-[.0625rem] bg-gradient-to-br from-[#FFCB4E] to-[#DDC7F2] rounded-3xl translate-y-2 -translate-x-6 z-50">
          <div className="bg-white rounded-3xl overflow-hidden">
            {menuItems.map((item) => (
              <div
                key={item.link}
                className="transition-all duration-300 hover:bg-none p-0">
                <li className="w-full list-none group">
                  <Link
                    href={item.link}
                    onClick={handleItemClick}
                    className="relative flex items-center w-full p-4 text-gray-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFEDB5]/15 hover:to-[#DCC6F5]/5 group-hover:scale-[1.02]">
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFCB4E] to-[#DDC7F2] opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                    />
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="text-black">{item.name}</span>
                  </Link>
                  {item.withDivider && <hr className="w-full border my-3" />}
                </li>
              </div>
            ))}
            {user && (
              <div className="p-0">
                <button
                  onClick={signOut}
                  className="relative flex items-center w-full px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFEDB5]/15 hover:to-[#DCC6F5]/5 group-hover:scale-[1.02]">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFCB4E] to-[#DDC7F2] opacity-0 transition-opacity duration-200 hover:opacity-100" />
                  <ToggleRight className="w-5 h-5 mr-3" />
                  <p className="text-black">Logout</p>
                </button>
              </div>
            )}
            {!user && (
              <div className="p-0">
                <div className="flex justify-center w-full py-2 px-4">
                  <Button variant="cta">
                    <Link
                      href="/list-a-vehicle"
                      onClick={handleItemClick}
                      className="font-bold text-black/70">
                      List on Kaparki
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </PopoverDropdown>
      </Popover>
    </>
  );
}
