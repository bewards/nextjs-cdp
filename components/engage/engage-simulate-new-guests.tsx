"use client";

import { useEngageStore } from "@/providers/engage-provider-store";
import { JSX, useEffect, useState } from "react";
import { Button } from "@/components/ui/button/button";
import Image from "next/image";

export default function EngageSimulateNewGuests(): JSX.Element {
  const { engage, simulateNewUserPageViews } = useEngageStore((state) => state);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // engagePageView();
  }, [engage]);

  return (
    <>
      <Button
        icon={<Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />}
        variant={"ghost"}
        isLoading={isLoading}
        onClick={async () => {
          console.log("engage-new-guest clicked");
          setLoading(true);
          simulateNewUserPageViews().then(() => {
            setLoading(false);
          });
        }}
      >
        {isLoading ? "Simulating..." : "Simulate 10 New Visitors"}
      </Button>
    </>
  );
}
