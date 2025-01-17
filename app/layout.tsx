import type { Metadata } from "next";
import Head from "next/head";
import { ColorSchemeScript, createTheme, DEFAULT_THEME, MantineProvider, mergeMantineTheme } from "@mantine/core";
import localFont from "next/font/local";
import { EngageStoreProvider } from "@/providers/engage-provider-store";
import EngagePageView from "@/components/features/engage/engage-page-view";
import MainHeader from "@/components/features/navigation/header";
import "./globals.css";
import { breakpoints, colors } from "./theme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sitecore CDP Generator",
  description: "A create next app built for generating Sitecore CDP data",
};

// Mantine UI theme
const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    fontFamily: geistSans.style.fontFamily,
    fontFamilyMonospace: geistMono.style.fontFamily,
    breakpoints,
    colors,
  })
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body className={`antialiased`}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <EngageStoreProvider>
            <MainHeader />
            {children}
            <EngagePageView />
          </EngageStoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
