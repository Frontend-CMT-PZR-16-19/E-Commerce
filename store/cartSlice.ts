import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface CartState {
  productList: Product[];
}

const initialState: CartState = {
  productList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<{ product: Product; piece: number }>) => {
      const { product, piece } = action.payload;
      state.productList.push(...Array(piece).fill(product));
    },
    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.productList.findIndex((item) => item.id === product.id);
      if (index > -1) {
        state.productList.splice(index, 1);
      }
    },
    deleteCart: (state) => {
      state.productList = [];
    },
  },
});

export const { addProductToCart, removeProductFromCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
