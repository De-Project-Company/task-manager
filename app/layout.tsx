import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import StateCtxProvider from "@/context/StateCtx";
import ThemeProvider from "@/context/ThemeCtx";
import UserContextProvider from "@/context/UserCtx";
import { SessionProvider } from "next-auth/react";

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
        <UserContextProvider>
          <StateCtxProvider>
            <ThemeProvider>
              <body className={inter.className}>{children}</body>
            </ThemeProvider>
          </StateCtxProvider>
        </UserContextProvider>
      </SessionProvider>
    </html>
  );
}
