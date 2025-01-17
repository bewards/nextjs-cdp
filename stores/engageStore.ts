import { Engage, ICdpResponse } from "@sitecore/engage";
import { createStore } from "zustand/vanilla";
import { init } from "@sitecore/engage";
import { StoreApi } from "zustand";
import { CartProduct } from "@/types/cart";
import { ApiProduct } from "@/types/api";

export type EngageState = {
  engage: Engage | null;
  createdAt?: Date;
  searches: string[];
};

export type CartState = {
  cartItems: CartProduct[];
};

export type EngageActions = {
  setEngage: (engage: Engage) => void;

  // direct HTTPS actions:
  simulateNewUserPageViews: () => Promise<void>;

  // misc actions
  addSearchQuery: (search: string) => void;

  // cart actions
  addItemToCart: (item: ApiProduct) => void;
};

export type EngageStore = EngageState & EngageActions & CartState;

export const defaultEngageState: EngageState & CartState = {
  engage: null,
  searches: [],
  cartItems: [],
};

export const initEngageStore = (): EngageState & CartState => {
  return {
    engage: null,
    createdAt: new Date(),
    searches: [],
    cartItems: [],
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

export const createEngageStore = (initState: EngageState & CartState = defaultEngageState): StoreApi<EngageStore> => {
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

    addSearchQuery: (search) => set((state) => ({ searches: [...state.searches, search] })),

    addItemToCart: (item: ApiProduct) =>
      set((state) => {
        let itemExists = state.cartItems.find((cartItem) => cartItem.productId === item.productId);
        let newState = null;

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }
          newState = { cartItems: [...state.cartItems] };
        } else {
          itemExists = { ...item, quantity: 1, dateAdded: new Date() };
          newState = { cartItems: [...state.cartItems, itemExists] };
        }
        state.engage
          ?.event("ADD", {
            channel: "WEB",
            currency: "USD",
            language: "EN",
            page: "SHOP",
            product: {
              name: itemExists.name,
              type: itemExists.category,
              item_id: itemExists.sku,
              productId: itemExists.productId,
              referenceId: itemExists.sku,
              orderedAt: itemExists.dateAdded.toISOString(),
              quantity: itemExists.quantity,
              price: itemExists.price,
              currency: "USD",
            },
          })
          .then((response) => {
            console.log("Engage event ADD success", response);
          });
        return newState;
      }),
  }));
};
