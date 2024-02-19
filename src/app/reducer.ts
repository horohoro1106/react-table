import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Product, type TableState } from "../lib/types";

const initialState: TableState = {
  products: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "table/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  }
);

export const tableSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addItem } = tableSlice.actions;

export default tableSlice.reducer;
