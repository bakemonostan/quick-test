import { BookingHistoryIcon } from "@/components/icons";
import { CheckSquare2 } from "lucide-react";
import React from "react";
// Content for the HowItWorks section
export const howItWorksContent = {
  title: "Rent Unique Vehicles or List Yours & Earn!",
  subtitle:
    "From adventure rides to work vehicles, find or list a vehicle with ease",

  forRenters: {
    title: "For Renters (Find & Book Vehicles)",
    benefits: [
      "No long-term commitments—rent for a day, a week, or more",
      "Choose from adventure, work, or specialty vehicles.",
      "Option for vehicle delivery at your convenience.",
    ],
    primaryButton: {
      text: "How it works",
      href: "/become-a-host",
    },
    secondaryButton: {
      text: "See reviews",
      href: "/#reviews",
    },
  },

  forOwners: {
    title: "For Owners (List & Earn)",
    benefits: [
      "Turn your vehicle into income when it's not in use.",
      "You control pricing, availability, and rental rules.",
      "Kaparki handles secure payments & bookings.",
    ],
    primaryButton: {
      text: "Read more",
      href: "/",
    },
    secondaryButton: {
      text: "See reviews",
      href: "/",
    },
  },
};

// Get SVGIconProps type from the component
type SVGIconProps = Parameters<typeof BookingHistoryIcon>[0];

// Dashboard interfaces
export interface DashboardCardItem {
  title: string;
  key: string;
  icon?: React.ComponentType<SVGIconProps>;
  isMonetary?: boolean;
}

export interface DashboardCardContent {
  trips: DashboardCardItem[];
  activity: DashboardCardItem[];
}

export interface DashboardData {
  details: {
    legal_name: string;
    email: string;
    profile_picture: string | null;
  };
  completed_trips: number;
  upcoming_trips: number;
  pending_reviews: number;
  total_bookings: number;
  upcoming_bookings: number;
  total_earnings: number;
}

// Dashboard overview card content
export const dashboardCardContent: DashboardCardContent = {
  trips: [
    { title: "Completed Trips", key: "completed_trips" },
    { title: "Upcoming Trips", key: "upcoming_trips" },
    { title: "Pending Reviews", key: "pending_reviews" },
  ],
  activity: [
    {
      title: "Total Bookings",
      key: "total_bookings",
      icon: CheckSquare2,
    },
    {
      title: "Upcoming Bookings",
      key: "upcoming_bookings",
      icon: BookingHistoryIcon,
    },
    {
      title: "Total Earnings",
      key: "total_earnings",
      isMonetary: true,
      icon: BookingHistoryIcon,
    },
  ],
};
