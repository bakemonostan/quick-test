/* eslint-disable */
"use client";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export const ActivityTracker = () => {
  const pathname = usePathname();
  const router = useRouter();
  const lastActivityTimestamp = useBookingStore(
    (state) => state.lastActivityTimestamp
  );
  const updateActivityTimestamp = useBookingStore(
    (state) => state.updateActivityTimestamp
  );
  const clearStorage = useBookingStore((state) => state.clearStorage);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const CheckActivityOnBookingPageOnly = () => {
    const isBookingPage =
      pathname.includes("/all-vehicles/") && pathname.split("/").length > 2;
    return isBookingPage;
  };

  const relevantData = useBookingStore((state) => state.bookingId);

  useEffect(() => {
    if (!relevantData && CheckActivityOnBookingPageOnly()) {
      router.push("/all-vehicles");
      return;
    }

    if (!relevantData) {
      return;
    }

    const handleActivity = () => {
      updateActivityTimestamp();
    };

    if (CheckActivityOnBookingPageOnly()) {
      const events = ["mousedown", "keydown"];
      events.forEach((event) => {
        window.addEventListener(event, handleActivity);
      });
    }

    timeoutRef.current = setInterval(() => {
      const inactiveMs = Date.now() - lastActivityTimestamp;
      //  8 minutes
      if (inactiveMs > 8 * 60 * 1000) {
        clearStorage(); // Uses store's built-in clear method
      }
    }, 4 * 60 * 1000);

    return () => {
      clearInterval(timeoutRef.current);
      if (CheckActivityOnBookingPageOnly()) {
        const events = ["mousedown", "keydown"];
        events.forEach((event) => {
          window.removeEventListener(event, handleActivity);
        });
      }
    };
  }, [
    lastActivityTimestamp,
    updateActivityTimestamp,
    clearStorage,
    relevantData,
    router,
  ]);

  return null;
};
