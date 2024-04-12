import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import StateCtxProvider from "@/context/StateCtx";
import ThemeProvider from "@/context/ThemeCtx";
import SwipeIndicator from "@/components/SwiperIndicator";
import AuthProvider from "./Providers";
import UpdateSessionModal from "@/components/SessionModal";
import { ApprovalModal } from "@/components/ApprovalModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASEURL as string),
  applicationName: "Traverse",
  authors: [
    {
      name: "starters house team",
      // url: ""
    },
  ],
  generator: "Next.js,",
  keywords: [
    "Next.js",
    "React",
    "project-management",
    "startershouse",
    "task management",
  ],
  referrer: "origin",
  creator: "starters house team",
  title: {
    default: "Traverse",
    template: `%s - Traverse`,
  },

  description: "Starters House - Task management made easy",
  openGraph: {
    title: "Traverse",
    description: "Starters House - Task management made easy",
    url: process.env.NEXT_PUBLIC_BASEURL,
    siteName: "Traverse",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "OGUN DIGITAL SUMMIT",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <StateCtxProvider>
          <ThemeProvider>
            <body
              className={`${inter.className}  dark:bg-primary/90 transition-colors duration-500`}
            >
              {children}
              <SwipeIndicator />
              <UpdateSessionModal />
              <ApprovalModal />
            </body>
          </ThemeProvider>
        </StateCtxProvider>
      </AuthProvider>
    </html>
  );
}
