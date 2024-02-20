import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
/* import type { RootState } from "./store"; */
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
    deleteItem: (state, action: PayloadAction<number>) => {
      const rowIndex = action.payload;
      state.products = state.products.filter((_el, i) => i != rowIndex);
    },
    updateField: {
      prepare(index: number, prop: string, value: string) {
        return { payload: { index, prop, value } };
      },
      reducer(
        state,
        action: PayloadAction<{ index: number; prop: string; value: string }>
      ) {
        const { index, prop, value } = action.payload;
        const shouldConvertToNumber = [
          "discountPercentage",
          "price",
          "rating",
          "stock",
        ].includes(prop);
        const newVal = shouldConvertToNumber ? Number(value) : value;
        state.products[index] = { ...state.products[index], [prop]: newVal };
      },
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

export const { addItem, updateField, deleteItem } = tableSlice.actions;

export default tableSlice.reducer;
