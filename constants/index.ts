import innovation from "../public/assets/innovation.png";
import centric from "../public/assets/centricDesign.png";
import comSolution from "../public/assets/comprehensiveSolution.png";
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
import { SidebarProps, ProjectCounterProps, SelectProps } from "@/types";
import { useProjectCtx } from "@/context/Projectctx";

export const EMPLOYERSSIDEBAR_LINKS: SidebarProps[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: Category,
    link: "dashboard",
  },

  {
    id: 2,
    label: "Total Projects",
    icon: TrendUp,
    link: "projects",
  },
  {
    id: 3,
    label: "Calender",
    icon: Profile2User,
    link: "calender",
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
    title: "Gain Valuable Workday Insights",
    desc: "Traverse doesn't just track time; it provides comprehensive insights into your productivity patterns. Understand your active and idle times, allowing you to optimize your workflow and make informed decisions",
  },
];

export const RevolutionData2 = [
  {
    title: "Uninterrupted Time Tracking Anywhere",
    desc: "Traverse understands that work happens everywhere. With offline support and auto-sync, you can track time seamlessly, even when internet connectivity is limited, ensuring your data is always up to date",
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
export const apartInfo = [
  {
    image: innovation,
    heading: "Innovation at the Core",
    desc: "Traverse is fueled by innovation, constantly evolving to meet the dynamic needs of modern work environments. We pride ourselves on staying ahead of the curve, providing access to cutting-edge features and functionalities",
  },
  {
    image: centric,
    heading: "User-Centric Design",
    desc: "Your experience is our priority. Traverse is meticulously designed for user-friendliness, ensuring that individuals, teams, and businesses can seamlessly integrate our solution into their daily routines",
  },
  {
    image: comSolution,
    heading: "Comprehensive Solutions",
    desc: "Traverse is not merely a time tracking app; it's a holistic suite of services aimed at enhancing overall productivity. From detailed time insights to client collaboration features, we offer a comprehensive solution tailored to your unique needs",
  },
];

export const faqs = [
  {
    question: "What makes Traverse different from other time tracking apps?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How does Traverse handle offline time tracking?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Can clients collaborate on Traverse?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Is Traverse suitable for both individuals and teams?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How can Traverse enhance my productivity?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
export const TYPESidebarLinks = EMPLOYERSSIDEBAR_LINKS.map((link) => link.link);

export const selectCurrencies: SelectProps[] = [
  {
    id: 0,

    symbol: "$",
    value: "USD",
  },
  {
    id: 1,

    symbol: "₦",
    value: "NGN",
  },
  {
    id: 2,

    symbol: "£",
    value: "GBP",
  },
  {
    id: 3,

    symbol: "€",
    value: "EUR",
  },
];
