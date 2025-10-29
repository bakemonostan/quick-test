import AccountIcon from "./AccountIcon";
import BookingsIcon from "./BookingsIcon";
import BookingHistoryIcon from "./BookingHistoryIcon";
import CancellationIcon from "./CancellationIcon";
import ChatBubbleIcon from "./ChatBubbleIcon";
import ConvenienceClockIcon from "./ConvenienceClockIcon";
import DowntimeIcon from "./DowntimeIcon";
import EarnMoreIcon from "./EarnMoreIcon";
import HandShakeIcon from "./HandShakeIcon";
import KeyIcon from "./KeyIcon";
import ListingsIcon from "./ListingsIcon";
import NotificationsIcon from "./NotificationsIcon";
import OverviewIcon from "./OverviewIcon";
import PartyHornIcon from "./PartyHornIcon";
import GradientArrowIcon from "./GradientArrowIcon";
import LogoIcon from "./LogoIcon";
import RequestsIcon from "./RequestsIcon";
import RocketShipIcon from "./RocketShipIcon";
import UnapprovedIcon from "./UnapprovedIcon";
import PausedIcon from "./PausedIcon";
import PendingEyesIcon from "./PendingEyesIcon";
import WarningIcon from "./WarningIcon";
import WishlistIcon from "./WishlistIcon";
import WorryFreeIcon from "./WorryFreeIcon";
import BusIcon from "./BusIcon";
import BritishFlagIcon from "./BritishFlagIcon";
import DutchFlagIcon from "./DutchFlagIcon";
import AppleIcon from "./AppleIcon";
import ArmyVehicleIcon from "./ArmyVehicleIcon";
import AirCraftIcon from "./AirCraftIcon";
import CaravanIcon from "./CaravanIcon";
import CarIcon from "./CarIcon";
import BookIcon from "./BookIcon";
import TwoWheelerIcon from "./TwoWheelerIcon";
import WhyRentCardIcon from "./WhyRentCardIcon";
import TickCircleIcon from "./TickCircleIcon";
import WishListIcon from "./WishlistIcon";

export interface SVGIconProps {
  className?: string;
  width?: number;
  height?: number;
}

// Lazy loading function for icons
export const loadIcon = {
  // BookingHistoryIcon: () => import('./BookingHistoryIcon').then(module => module.default),
  // Other feature-specific icons...
};

export {
  AccountIcon,
  BookingsIcon,
  BookingHistoryIcon,
  CancellationIcon,
  ChatBubbleIcon,
  CarIcon,
  GradientArrowIcon,
  BookIcon,
  ConvenienceClockIcon,
  DowntimeIcon,
  EarnMoreIcon,
  HandShakeIcon,
  KeyIcon,
  ListingsIcon,
  NotificationsIcon,
  BusIcon,
  BritishFlagIcon,
  DutchFlagIcon,
  AppleIcon,
  ArmyVehicleIcon,
  AirCraftIcon,
  CaravanIcon,
  OverviewIcon,
  PartyHornIcon,
  LogoIcon,
  RequestsIcon,
  RocketShipIcon,
  UnapprovedIcon,
  WarningIcon,
  WishlistIcon,
  WorryFreeIcon,
  TwoWheelerIcon,
  WhyRentCardIcon,
  TickCircleIcon,
  WishListIcon,
  PausedIcon,
  PendingEyesIcon,
};
