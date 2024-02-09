
import innovation from "../public/assets/innovation.png"
import centric from "../public/assets/centricDesign.png"
import comSolution from "../public/assets/comprehensiveSolution.png"
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
export const apartInfo = [
  {
    image: innovation,
    heading: 'Innovation at the Core',
    desc: "Traverse is fueled by innovation, constantly evolving to meet the dynamic needs of modern work environments. We pride ourselves on staying ahead of the curve, providing access to cutting-edge features and functionalities"
  },
  {
    image: centric,
    heading: 'User-Centric Design',
    desc: "Your experience is our priority. Traverse is meticulously designed for user-friendliness, ensuring that individuals, teams, and businesses can seamlessly integrate our solution into their daily routines"
  },
  {
    image: comSolution,
    heading: 'Comprehensive Solutions',
    desc: "Traverse is not merely a time tracking app; it's a holistic suite of services aimed at enhancing overall productivity. From detailed time insights to client collaboration features, we offer a comprehensive solution tailored to your unique needs"
  },
]

export const faqs = [
  {
    question: "What makes Traverse different from other time tracking apps?",
    answer: ""
  },
  {
    question: "How does Traverse handle offline time tracking?",
    answer: ""
  },
  {
    question: "Can clients collaborate on Traverse?",
    answer: ""
  },
  {
    question: "Is Traverse suitable for both individuals and teams?",
    answer: ""
  },
  {
    question: "How can Traverse enhance my productivity?",
    answer: ""
  },
  
]
export const TYPESidebarLinks = EMPLOYERSSIDEBAR_LINKS.map((link) => link.link);
