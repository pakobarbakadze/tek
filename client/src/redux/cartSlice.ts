import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { CartProductType } from "../types/Product.types";

interface CartState {
  product: CartProductType[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState: CartState = {
  product: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProductType>) => {
      const itemIndex = getItemIndex(state, action.payload._id);
      if (itemIndex === -1) state.product.push(action.payload);
      else state.product[itemIndex].cartQuantity++;
      state.totalPrice += action.payload.price;
      state.totalQuantity++;
    },
    changeProductQuantity: (
      state,
      action: PayloadAction<{ quantity: number; cartItem: CartProductType }>
    ) => {
      const itemIndex = getItemIndex(state, action.payload.cartItem._id);
      if (state.product[itemIndex].cartQuantity > 1 || action.payload.cartItem.cartQuantity > 0) {
        state.product[itemIndex].cartQuantity += action.payload.quantity;
      }

      if (action.payload.quantity > 0) {
        state.totalPrice += action.payload.cartItem.price;
        state.totalQuantity++;
      } else {
        state.totalPrice -= action.payload.cartItem.price;
        state.totalQuantity--;
      }
    },
    removeProduct: (state, action: PayloadAction<CartProductType>) => {
      const itemIndex = getItemIndex(state, action.payload._id);
      state.product.splice(itemIndex, 1);
    },
  },
});

const getItemIndex = (state: CartState, _id: string) => {
  return state.product.findIndex((item) => item._id === _id);
};

export const { addProduct, changeProductQuantity, removeProduct } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
