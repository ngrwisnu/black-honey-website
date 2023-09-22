import { toast } from "@/components/ui/use-toast";
import { ProductType } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItems {
  uid: string;
  qty: number;
  product: ProductType;
}

interface CartStore {
  items: CartItems[];
  addItem: (data: { uid: string; qty: number; product: ProductType }) => void;
  removeItem: (id: string) => void;
  removeAllItem: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === data.product.id,
        );

        if (existingItem) {
          return toast({
            variant: "destructive",
            title: "This item is already in cart",
          });
        }

        set({ items: [...get().items, data] });
        toast({ title: "Success added item to the cart" });
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.product.id !== id)],
        });
      },
      removeAllItem: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
