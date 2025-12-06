import "@/src/lib/fix-radix-ssr";
import { QueryProvider } from "../components/queryProvider";
import { ReactNode } from "react";

import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../components/Theme/themeProvider";



export const metadata: Metadata = {
  title: "ref | app",
  description: "A simple apps using supabase as identity providers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased transition-colors duration-500`}
      >
        <QueryProvider>
          <ThemeProvider>
              {children}
          </ThemeProvider>
        </QueryProvider>
          
      </body>
    </html>
  );
}
