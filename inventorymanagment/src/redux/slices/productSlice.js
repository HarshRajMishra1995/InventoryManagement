import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    updateProduct: (state, action) => {
      const { name, updatedData } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.name === name
      );
      if (productIndex !== -1) {
        state.products[productIndex] = updatedData;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload
      );
    },
  },
});

export const { setProducts, updateProduct, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
