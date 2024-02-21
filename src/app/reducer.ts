import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
/* import type { RootState } from "./store"; */
import { Product, type TableState } from "../lib/types";

const initialState: TableState = {
  products: [],
  revertCopy: [],
  editedRows: {},
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
    editItems: (state, action: PayloadAction<number>) => {
      state.editedRows[action.payload] = !state.editedRows[action.payload];
    },
    removeSelectedItems: (state, action: PayloadAction<number[]>) => {
      state.products = state.products.filter(
        (_el, i) => !action.payload.includes(i)
      );
      state.revertCopy = state.revertCopy.filter(
        (_el, i) => !action.payload.includes(i)
      );
    },
    revertItem: {
      prepare(index: number, revert: boolean) {
        return { payload: { index, revert } };
      },
      reducer(
        state,
        action: PayloadAction<{ index: number; revert: boolean }>
      ) {
        const { index, revert } = action.payload;
        revert ///If true you revert changes in original array from revertCopy array,
          ? (state.products = state.products.map((row, i) =>
              i === index ? state.revertCopy[index] : row
            ))
          : //if false you synch changes in revertCopy row from original array
            (state.revertCopy = state.revertCopy.map((row, i) =>
              i === index ? state.products[index] : row
            ));
      },
    },
    updateField: {
      prepare(index: number, prop: string, value: string | number) {
        return { payload: { index, prop, value } };
      },
      reducer(
        state,
        action: PayloadAction<{
          index: number;
          prop: string;
          value: string | number;
        }>
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
        state.revertCopy = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  addItem,
  updateField,
  deleteItem,
  editItems,
  revertItem,
  removeSelectedItems,
} = tableSlice.actions;

export default tableSlice.reducer;
