import React from "react";
import {
  type Icon,
  Category,
  Briefcase,
  WalletMoney,
  MessageText,
  Personalcard,
  Notification1,
  Profile2User,
  ArchiveBook,
  TrendUp,
  Box,
  DiscountShape,
  InfoCircle,
  ArrowCircleRight2,
  Setting2,
  Logout,
  BoxTick,
  I3DRotate,
  ShoppingCart,
  Coin1,
  Message,
} from "iconsax-react";
import { SidebarProps } from "@/types";

export const EMPLOYERSSIDEBAR_LINKS: SidebarProps[] = [
  {
    id: 1,
    label: "Client Dashboard",
    icon: Category,
    link: "dashboard",
  },

  {
    id: 2,
    label: "Total Projects",
    icon: TrendUp,
    link: "total-projects",
  },
  {
    id: 3,
    label: "Meetings",
    icon: Profile2User,
    link: "Meetings",
  },
  {
    id: 4,
    label: "Chats",
    icon: Message,
    link: "chat",
  },
  {
    id: 5,
    label: "Notification",
    icon: Notification1,
    link: "notification",
  },
  {
    id: 6,
    label: "settings",
    icon: Setting2,
    link: "settings",
  },
];

const NAVLINKS = [
  {
    title: "Home",
    descText: "Take a snapshot into our page",
    link: "/",
  },
  {
    title: "About us",
    descText: "Learn More about us",
    link: "/about",
  },
  {
    title: "Request Beta",
    descText: "Lets show you what we got",
    link: "/request",
  },
];

export default NAVLINKS;

export const RevolutionData1 = [
  {
    title: "Enhance Precision in Time Management",
    desc: "Traverse offers advanced time tracking capabilities, ensuring every moment is accurately accounted for. From automatic start/stop functionality to real-time synchronization, our features guarantee a seamless and precise time tracking experience",
  },
  {
    title: "Uninterrupted Time Tracking Anywhere",
    desc: "Traverse understands that work happens everywhere. With offline support and auto-sync, you can track time seamlessly, even when internet connectivity is limited, ensuring your data is always up to date",
  },
];

export const RevolutionData2 = [
  {
    title: "Gain Valuable Workday Insights",
    desc: "Traverse doesn't just track time; it provides comprehensive insights into your productivity patterns. Understand your active and idle times, allowing you to optimize your workflow and make informed decisions",
  },
  {
    title: "Foster Seamless Client-Service Provider Communication",
    desc: "Traverse goes beyond individual productivity. With client collaboration features, your clients can provide feedback, schedule meetings, and stay engaged throughout the project, fostering transparent and effective communication.",
  },
];

export const Aboutdata = [
  "Accurately account for every second, gaining a clear understanding of your work patterns.",
  "Foster transparent communication with clients and team members, creating a collaborative environment that drives success.",
  "With offline support and auto-sync, Traverse adapts to your work style, allowing seamless time tracking regardless of your location.",
];

export const TYPESidebarLinks = EMPLOYERSSIDEBAR_LINKS.map((link) => link.link);
