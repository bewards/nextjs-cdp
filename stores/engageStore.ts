import { Engage } from "@sitecore/engage";
import { createStore } from "zustand/vanilla";
import { init } from "@sitecore/engage";
import { StoreApi } from "zustand";

export type EngageState = {
  engage: Engage | null;
  createdAt?: Date;
};

export type EngageActions = {
  setEngage: (engage: Engage) => void;
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
      clientKey: process.env.ENGAGE_CLIENT_KEY || "",
      targetURL: process.env.ENGAGE_TARGET_URL || "",
      pointOfSale: process.env.ENGAGE_POS || "",
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
    setEngage: (engage) => set((state) => ({ engage: engage })),
  }));
};
