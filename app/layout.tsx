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
  title: "Traverse",
  description: "Starters House - Task management made easy",
  // icons: {
  //   icon: [
  //     {
  //       url: "./assets/traverseWhite.png",
  //       href: "./assets/traverseWhite.png",
  //     },
  //   ],
  // },
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
