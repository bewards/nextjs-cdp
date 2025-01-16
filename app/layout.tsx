import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EngageStoreProvider } from "@/providers/engage-provider-store";
import EngagePageView from "@/components/engage/engage-page-view";
import MainHeader from "@/components/navigation/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sitecore CDP Generator",
  description: "A create next app built for generating Sitecore CDP data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <EngageStoreProvider>
          <MainHeader />
          {children}
          <EngagePageView />
        </EngageStoreProvider>
      </body>
    </html>
  );
}
