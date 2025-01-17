"use client";

import { useEngageStore } from "@/providers/engage-provider-store";
import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { GrTest } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";

export default function EngageSimulateNewGuests(): JSX.Element {
  const { simulateNewUserPageViews } = useEngageStore((state) => state);
  const [isLoading, setLoading] = useState(false);

  // toast
  const notify = (msg: string) => toast(msg);

  return (
    <>
      <Button
        icon={<GrTest size={18} />}
        variant={"outline"}
        size={"xlg"}
        className="rounded-full"
        isLoading={isLoading}
        onClick={async () => {
          console.log("engage-new-guest clicked");
          setLoading(true);
          return;

          try {
            simulateNewUserPageViews().then(() => {
              setLoading(false);
            });
          } catch (error) {
            const message = (error as Error)?.message || "An error occurred";
            notify(message);
            setLoading(false);
          }
        }}
      >
        {isLoading ? "Simulating..." : "Simulate 10 New Visitors"}
      </Button>
      <ToastContainer />
    </>
  );
}
