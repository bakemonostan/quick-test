// src/providers/createStoreProvider.tsx
'use client';

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
} from 'react';
import { useStore } from 'zustand';
import { type StoreApi } from 'zustand/vanilla';

export function createStoreProvider<T>(createStore: () => StoreApi<T>) {
  const StoreContext = createContext<StoreApi<T> | undefined>(undefined);

  const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<StoreApi<T> | undefined>(undefined);
    if (!storeRef.current) {
      storeRef.current = createStore();
    }

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    );
  };

  const useStoreHook = <U,>(selector: (state: T) => U): U => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('useStoreHook must be used within a StoreProvider');
    }
    return useStore(store, selector);
  };

  return { StoreProvider, useStoreHook };
}
