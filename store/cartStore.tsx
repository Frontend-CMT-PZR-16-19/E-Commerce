import { Product } from "@/types";
import { create } from "zustand";

interface CartState {
  productList: Product[];
  addProductToCart: (product: Product, piece: number) => void;
  removeProductFromCart: (product: Product) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  productList: [],
  addProductToCart: (product, piece) =>
    set((state) => ({
      productList: [...state.productList, ...Array(piece).fill(product)],
    })),
  removeProductFromCart: (product) =>
    set((state) => {
      const index = state.productList.findIndex(
        (item) => item.id === product.id
      );
      if (index > -1) {
        const newProductList = [...state.productList];
        newProductList.splice(index, 1);
        return { productList: newProductList };
      }
      return state;
    }),
  deleteCart: () => set((state) => ({ productList: [] })),
}));
