"use client";

import { type ReactNode, createContext, useRef, useContext, useEffect } from "react";
import { useStore } from "zustand";

import { type EngageStore, updateEngageStore, initEngageStore, createEngageStore } from "@/stores/engageStore";

export type EngageStoreApi = ReturnType<typeof createEngageStore>;

export const EngageStoreContext = createContext<EngageStoreApi | null>(null);

export interface EngageStoreProviderProps {
  children: ReactNode;
}

export const EngageStoreProvider = ({ children }: EngageStoreProviderProps) => {
  const storeRef = useRef<EngageStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createEngageStore(initEngageStore());
  }

  // engage has to be initialized client-side
  useEffect(() => {
    updateEngageStore().then((state) => {
      storeRef.current?.setState(state);

      
    });
  });

  return <EngageStoreContext.Provider value={storeRef.current}>{children}</EngageStoreContext.Provider>;
};

export const useEngageStore = <T,>(selector: (store: EngageStore) => T): T => {
  const engageStoreContext = useContext(EngageStoreContext);

  if (!engageStoreContext) {
    throw new Error("useEngageStore must be used within an EngageStoreProvider");
  }

  return useStore(engageStoreContext, selector);
};
