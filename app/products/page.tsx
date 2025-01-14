"use client";
import { useEffect } from "react";
import { init } from "@sitecore/engage";
import Image from "next/image";

export default function Home() {
  const engageSettings = {
    clientKey: "pqsgpjgk83albxu3gw5k31mh2k1tk6uq",
    targetURL: "https://api-engage-eu.sitecorecloud.io",
    pointOfSale: "BensDepot",
    forceServerCookieMode: true,
    includeUTMParameters: true,
    webPersonalization: false /* boolean or object. See Settings object for all options. Default: false */,
  };

  const loadEngage = async () => {
    console.log("Loading Engage API...");
    // Load Engage API
    const engage = await init(engageSettings);
    
    // Send VIEW events
    engage.pageView({
      channel: "WEB",
      currency: "USD"
    });

    // For testing and debugging purposes only
    console.log("Copy-paste the following line into Sitecore CDP > Guests > Search field:");
    console.log("bid:", engage.getBrowserId());
  };

  useEffect(() => {
    loadEngage();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <h1>Products Landing Page</h1>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
