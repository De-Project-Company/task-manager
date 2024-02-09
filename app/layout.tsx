import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import StateCtxProvider from "@/context/StateCtx";
import ThemeProvider from "@/context/ThemeCtx";

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
      <StateCtxProvider>
        <ThemeProvider>
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </StateCtxProvider>
    </html>
  );
}
