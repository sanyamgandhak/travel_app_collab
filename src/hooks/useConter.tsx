import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  logCount: () => void;
};

const useCounter = create<CounterState>()(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      logCount: () => toast.success(`The current count is ${get().count}`),
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCounter;
