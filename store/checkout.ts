import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CheckoutDetail {
  address_id?: string;
  payment_id?: number;
  qty?: number;
  product_id?: string;
  payment_proof?: string;
}

interface CheckoutStore {
  items: CheckoutDetail[];
  addItem: (data: CheckoutDetail[]) => void;
  clearItems: () => void;
}

const useCheckout = create(
  persist<CheckoutStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CheckoutDetail[]) => {
        const isCheckoutEmpty = get().items.length === 0;

        if (isCheckoutEmpty) {
          set({ items: [...data] });
        }
      },
      clearItems: () => {
        set({ items: [] });
      },
    }),
    {
      name: "checkout-items",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCheckout;
