import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { ProductType } from "../types/Product.types";

interface CartState {
  data: ProductType[];
}

const initialState: CartState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addProduct } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.data;

export default cartSlice.reducer;
