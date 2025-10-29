import { OverviewIcon } from "@/components/icons";
import { 
  Heart, 
  Star, 
  HelpCircle, 
  User
} from "lucide-react";
import { ComponentType } from "react";

export type MenuItem = {
  name: string;
  icon: ComponentType<{ className?: string }>;
  link: string;
  active: boolean;
  withDivider?: boolean;
  notification?: boolean;
};

export const DropdownMenuItems: MenuItem[] = [
  { name: 'Dashboard', icon: OverviewIcon, link: '/dashboard/overview', active: false },
  { name: 'Favorites', icon: Heart, link: '/dashboard/wishlist', active: false, withDivider: true },
  { name: 'Reviews', icon: Star, link: '/#reviews', active: false },
  { name: 'How Kaparki works', icon: HelpCircle, link: '/how-kaparki-works', active: false },
  {
    name: 'Contact Kaparki',
    icon: User,
    link: '/dashboard/my-account',
    active: false,
    withDivider: true
  }
];

export const DropdownMenuItemsTwo: MenuItem[] = [
  { name: 'Login', icon: User, link: '/auth', active: false },
  { name: 'Sign up', icon: User, link: '/auth', active: false, withDivider: true }
]; 
