import { formatGram, formatRial } from '@/utils/formatters';
import { Decimal } from 'decimal.js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -7,
  toExpPos: 21,
});

interface UserStore {
  // ----- State -----
  balance: Decimal;
  gold: Decimal;
  // ----- Balance (Rial) methods -----
  updateBalance: (amount: number | string | Decimal) => void;
  addBalance: (amount: number | string | Decimal) => void;
  subtractBalance: (amount: number | string | Decimal) => void;
  formatBalance: () => string;
  // ----- Gold methods -----
  updateGold: (weight: number | string | Decimal) => void;
  addGold: (weight: number | string | Decimal) => void;
  subtractGold: (weight: number | string | Decimal) => void;
  formatGold: () => string;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      balance: new Decimal(100000000),
      gold: new Decimal(10),

      // Balance methods
      updateBalance: (amount) =>
        set({
          balance: new Decimal(amount),
        }),

      addBalance: (amount) =>
        set({
          balance: get().balance.plus(new Decimal(amount)),
        }),

      subtractBalance: (amount) =>
        set({
          balance: get().balance.minus(new Decimal(amount)),
        }),

      formatBalance: () => {
        return formatRial(get().balance);
      },

      // Gold methods
      updateGold: (weight) =>
        set({
          gold: new Decimal(weight),
        }),

      addGold: (weight) =>
        set({
          gold: get().gold.plus(new Decimal(weight)),
        }),

      subtractGold: (weight) =>
        set({
          gold: get().gold.minus(new Decimal(weight)),
        }),

      formatGold: () => {
        return formatGram(get().gold);
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        ...state,
        balance: state.balance.toString(),
        gold: state.gold.toString(),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.balance = new Decimal(state.balance);
          state.gold = new Decimal(state.gold);
        }
      },
    }
  )
);

export default useUserStore;
