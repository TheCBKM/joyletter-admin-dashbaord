import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppShell } from "@/components/ui/app-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Joyletter Admin",
  description: "Modern purple-themed admin dashboard for managing groups, sankalps, and members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-accent-100 text-gray-900">
        <div className="gradient-ring pointer-events-none fixed inset-0" />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

