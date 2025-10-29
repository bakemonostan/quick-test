import { AccountIcon, BookingsIcon, ListingsIcon, NotificationsIcon, OverviewIcon, RequestsIcon, WishlistIcon } from "@/components/icons"
import { Avatar } from "@mantine/core"
import React from "react"

  
  type MenuItem = {
    name: string
    icon: React.ComponentType<{ className?: string; width?: number; height?: number }>
    link: string
    active: boolean
    withDivider?: boolean
    notification?: boolean
  }[]
  
  export const SidebarMenuItems: MenuItem = [
    { name: 'Overview', icon: OverviewIcon, link: '/dashboard/overview', active: true },
    { name: 'Listings', icon: ListingsIcon, link: '/dashboard/listings', active: false },
    { name: 'Requests', icon: RequestsIcon, link: '/dashboard/requests', active: false },
    { name: 'Bookings', icon: BookingsIcon, link: '/dashboard/bookings', active: false, withDivider: true },
    { name: 'My Account', icon: AccountIcon, link: '/dashboard/my-account', active: false },
    { name: 'Wishlist', icon: WishlistIcon, link: '/dashboard/wishlist', active: false },
    {
      name: 'Notifications',
      icon: NotificationsIcon,
      link: '/dashboard/notifications',
      active: false,
      notification: true,
      withDivider: true
    }
  ]
  
  export const FooterMenuItems: MenuItem = [
    { name: 'Overview', icon: OverviewIcon, link: '/dashboard/overview', active: true },
    { name: 'Listings', icon: ListingsIcon, link: '/dashboard/listings', active: false },
    { name: 'Requests', icon: RequestsIcon, link: '/dashboard/requests', active: false },
    { name: 'Bookings', icon: BookingsIcon, link: '/dashboard/bookings', active: false, withDivider: true },
    { name: 'Account', icon: Avatar, link: '/dashboard/my-account', active: false }
  ]
  
  export const DropdownMenuItems: MenuItem = [
    { name: 'Dashboard', icon: OverviewIcon, link: '/dashboard/overview', active: false },
    { name: 'Favorites', icon: WishlistIcon, link: '#', active: false, withDivider: true },
    { name: 'Reviews', icon: BookingsIcon, link: '#', active: false },
    { name: 'How Kaparki works', icon: RequestsIcon, link: '/how-kaparki-works', active: false },
    {
      name: 'Contact Kaparki',
      icon: AccountIcon,
      link: '/dashboard/my-account',
      active: false,
      withDivider: true
    }
  ]
  
  export const DropdownMenuItemsTwo: MenuItem = [
    { name: 'Login', icon: AccountIcon, link: '/auth', active: false },
    { name: 'Sign up', icon: AccountIcon, link: '/auth', active: false, withDivider: true }
  ]
  