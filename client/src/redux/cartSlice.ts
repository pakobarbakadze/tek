import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { CartProductType } from "../types/Product.types";

interface CartState {
  product: CartProductType[];
  totalQuantity: number;
}

const initialState: CartState = {
  product: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProductType>) => {
      const itemIndex = getItemIndex(state, action);
      if (itemIndex === -1) state.product.push(action.payload);
      else state.product[itemIndex].cartQuantity++;
    },
  },
});

const getItemIndex = (state: CartState, action: any) => {
  return state.product.findIndex((item) => (item._id === action.payload._id));
};

export const { addProduct } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
