"use client";

import { useEngageStore } from "@/providers/engage-provider-store";
import { JSX, useEffect } from "react";

export default function EngagePageView(): JSX.Element {
  const { engage } = useEngageStore((state) => state);

  const engagePageView = () => {
    if (!engage) {
      console.log("Engage API not ready yet.");
      return;
    }

    // Send VIEW events
    engage.pageView({
      channel: "WEB",
      currency: "USD",
    });

    // For testing and debugging purposes only
    console.log("Copy-paste the following line into Sitecore CDP > Guests > Search field:");
    console.log("bid:", engage.getBrowserId());
  };

  useEffect(() => {
    engagePageView();
  }, [engage]);

  return <></>;
}
