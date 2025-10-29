import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BaseState } from './types';

export const baseStore = <T extends BaseState>(
  storeName: string,
  initialState: Partial<T>,
  createSlice: (
    set: (state: Partial<T>) => void,
    get: () => T
  ) => Partial<T>
) => {
  const baseState: BaseState = {
    status: 'idle',
    error: null
  };

  return create<T>()(
    devtools(
      (set, get) => ({
        ...baseState,
        ...initialState,
        ...createSlice(set, get),
      } as T),
      {
        name: storeName,
      }
    )
  );
};
