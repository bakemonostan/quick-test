import { DashboardData } from "@/contents/data";
import { UserData } from "@/types/dashboard";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: DashboardData | null;
  details: UserData | null;
  username: string | null;
  profilePicture: string | null;
  setUser: (user: DashboardData | null) => void;
  setDetails: (details: UserData | null) => void;
  setUsername: (username: string | null) => void;
  setProfilePicture: (profilePicture: string | null) => void;
}


export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      details: null,
      username: null,
      profilePicture: null,
      setUser: (user: DashboardData | null) => set({ user }),
      setDetails: (details: UserData | null) => set({ details }),
      setUsername: (username: string | null) => set({ username }),
      setProfilePicture: (profilePicture: string | null) => set({ profilePicture }),
    }),
    {
      name: "user-store",
    }
  )
);
