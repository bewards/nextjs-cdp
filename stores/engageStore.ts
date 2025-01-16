import { Engage, ICdpResponse } from "@sitecore/engage";
import { createStore } from "zustand/vanilla";
import { init } from "@sitecore/engage";
import { StoreApi } from "zustand";

export type EngageState = {
  engage: Engage | null;
  createdAt?: Date;
};

export type EngageActions = {
  setEngage: (engage: Engage) => void;

  // direct HTTPS actions:
  simulateNewUserPageViews: () => Promise<void>;
};

export type EngageStore = EngageState & EngageActions;

export const defaultEngageState: EngageState = {
  engage: null,
};

export const initEngageStore = (): EngageState => {
  return {
    engage: null,
    createdAt: new Date(),
  };
};

export const updateEngageStore = async () => {
  try {
    const engageSettings = {
      clientKey: process.env.NEXT_PUBLIC_ENGAGE_CLIENT_KEY || "",
      targetURL: process.env.NEXT_PUBLIC_ENGAGE_TARGET_URL || "",
      pointOfSale: process.env.NEXT_PUBLIC_ENGAGE_POS || "",
      forceServerCookieMode: true,
      includeUTMParameters: true,
      webPersonalization: false /* boolean or object. See Settings object for all options. Default: false */,
    };
    // Load Engage API
    console.log("Loading Engage API via initEngageStore...");
    const engage = await init(engageSettings);
    return { engage, createdAt: new Date() };
  } catch (error) {
    console.error("Error fetching Engage data", error);
    return defaultEngageState;
  }
};

export const createEngageStore = (initState: EngageState = defaultEngageState): StoreApi<EngageStore> => {
  return createStore<EngageStore>((set) => ({
    ...initState,
    setEngage: (engage) => set((_state) => ({ engage: engage })),

    // Simulates 10 new Visitor guests all with page views
    simulateNewUserPageViews: async (): Promise<void> => {
      console.log("simulateNewUserPageViews");

      try {
        for (let i = 0; i < 10; i++) {
          const res = await fetch(`/api/guest/new`);
          const data = (await res.json()) as ICdpResponse | null;
          if (!data || data.status !== "OK") return;
          const browserId = data.ref;

          const pageViewEventResponse = await fetch(
            "/api/guest/event?" +
              new URLSearchParams({
                bid: browserId,
                type: "VIEW",
              })
          );
          const pageViewEventData = (await pageViewEventResponse.json()) as ICdpResponse | null;
          console.log(pageViewEventData);
        }
      } catch (error) {
        console.error("Error simulating new user page views", error);
      }
    },
  }));
};
