import {
  ConvenienceClockIcon,
  DowntimeIcon,
  EarnMoreIcon,
  WorryFreeIcon,
} from "@/components/icons";
import { CancellationIcon } from "@/components/icons";
import { HandShakeIcon } from "@/components/icons";
import {
  FAQAccordionTabOne,
  FAQAccordionTabTwo,
} from "../(landing)/_components/shared/FAQAccordion";
import { Reviews } from "../(landing)/_components/shared/ReviewCards";

export const FAQ_DATA = [
  {
    value: "Are the vehicles insured?",
    description:
      "Yes! Every vehicle listed on Kaparki must have insurance that covers other drivers during the rental period. Coverage details vary by host and region, so always check the listing before booking.",
  },
  {
    value: "What's included in the rental price?",
    description:
      "If you damage the vehicle, you'll be responsible for the repair costs. However, Kaparki's insurance covers you for most damages, so you'll only need to pay a deductible.",
  },
  {
    value: "Can I cancel my booking?",
    description:
      "You can cancel your booking at any time up to the rental start date. However, you may be charged a cancellation fee depending on the host's policy.",
  },
  {
    value: "What kind of vehicles are available?",
    description:
      "You can cancel your booking at any time up to the rental start date. However, you may be charged a cancellation fee depending on the host's policy.",
  },
  {
    value: "What's the cancellation policy?",
    description:
      "You can cancel your booking at any time up to the rental start date. However, you may be charged a cancellation fee depending on the host's policy.",
  },
  {
    value: "What's is the minimum age to rent a vehicle?",
    description:
      "You can cancel your booking at any time up to the rental start date. However, you may be charged a cancellation fee depending on the host's policy.",
  },
];

export const FAQ_TABS = [
  {
    name: "Renting on Kaparki",
    value: "renting",
    content: FAQAccordionTabOne,
  },
  {
    name: "Listing on Kaparki",
    value: "listing",
    content: FAQAccordionTabTwo,
  },
];

export const REVIEW_TABS_DATA = [
  {
    name: "Renters",
    value: "renters",
    content: Reviews,
  },
  {
    name: "Kaparki hosts",
    value: "kaparki-hosts",
    content: Reviews,
  },
];

export const WHY_RENT_DATA = [
  {
    icon: HandShakeIcon,
    title: "Flexible & Affordable Rentals",
    description:
      "Better deals, more choices. Rent anything from cars to camper vans and off-roaders—at prices traditional rentals can't match.",
  },
  {
    icon: CancellationIcon,
    title: "Easy Cancellation & Secure Payments",
    description:
      "Change of plans? No worries! Cancel up to 24 hours before your trip for a full refund. All payments are securely processed.",
  },
  {
    icon: ConvenienceClockIcon,
    title: "Designed for convenience",
    description:
      "Skip the pickup hassle. Many owners offer delivery to airports, train stations, or your doorstep—making rentals effortless.",
  },
];

export const WHY_RENT_ON_KAPARKI_DATA = [
  {
    icon: EarnMoreIcon,
    title: "Reach more renters, earn more income",
    description:
      "Kaparki connects you with a growing marketplace of people looking for unique rides. The more visibility your vehicle gets, the more bookings you can secure.",
  },
  {
    icon: DowntimeIcon,
    title: "Turn downtime into profits",
    description:
      "Kaparki helps you maximize its earning potential by letting you rent it out on your terms, whether for short trips, weekend getaways, or long-term use.",
  },
  {
    icon: WorryFreeIcon,
    title: "Worry-free rentals",
    description:
      "All renters are verified, and every vehicle listed must have insurance that covers other drivers.  You can rent out your vehicle with confidence.",
  },
];

export const BUILT_FOR_HOSTS_DATA = [
  {
    title: "High Demand, More Bookings",
    description:
      "Kaparki connects your vehicle to a global audience, from road trip travelers to professionals and event planners. More visibility means more opportunities to earn.",
  },
  {
    title: "Seamless Booking & Secure Payments",
    description:
      "No hassle with payments—Kaparki securely processes transactions, so you get paid on time. Renters are verified, and insurance is required for added security.",
  },
  {
    title: "Smart Pricing & Earnings Control",
    description:
      "Set your own pricing, choose daily or long-term rentals, and adjust availability with ease. Use Kaparki’s insights to stay competitive while maximizing earnings.",
  },
  {
    title: "Easy-to-Use Dashboard",
    description:
      "Track bookings, communicate with renters, and manage your listings effortlessly—all from your personal host dashboard.",
  },
];
