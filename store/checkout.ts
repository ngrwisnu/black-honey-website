import { ProductType } from "@/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CheckoutDetail {
  address_id?: string;
  payment_id?: number;
  qty?: number;
  product_id?: string;
  payment_proof?: string;
  product?: ProductType;
}

interface CheckoutStore {
  items: CheckoutDetail[];
  addItem: (data: CheckoutDetail[]) => void;
  clearItems: () => void;
}

const useCheckout = create(
  persist<CheckoutStore>(
    (set) => ({
      items: [],
      addItem: (data: CheckoutDetail[]) => {
        set({ items: [...data] });
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
