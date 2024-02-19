import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import StateCtxProvider from "@/context/StateCtx";
import ThemeProvider from "@/context/ThemeCtx";
import { SessionProvider } from "next-auth/react";
import SwipeIndicator from "@/components/SwiperIndicator";
import UpdateSessionModal from "@/components/SessionModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Traverse",
  description: "Opem source task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <StateCtxProvider>
          <ThemeProvider>
            <body
              className={`${inter.className}  dark:bg-primary/90 transition-colors duration-500`}
            >
              {children}
              <SwipeIndicator />
              <UpdateSessionModal />
            </body>
          </ThemeProvider>
        </StateCtxProvider>
      </SessionProvider>
    </html>
  );
}
