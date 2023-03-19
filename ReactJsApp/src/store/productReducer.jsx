import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const STATUSES = {
//   IDLE: "idle",
//   LOADING: "loading",
//   ERROR: "error",
// };

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    // status: STATUSES,
  },

  extraReducers: (builder, initialState) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      //   state.status = STATUSES.LOADING;
      console.log(action);
    });
    // builder.addCase(fetchProduct.rejected, (state, action) => {
    //   state.status = STATUSES.ERROR;
    // });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      console.log("AHMED");
      console.log(action.payload);
      //   state.status = STATUSES.IDLE;
      state.data = action.payload;
      console.log(state.data);
    });
  },
});

const fetchProduct = createAsyncThunk("products/fetch", async () => {
  const data = await fetch("http://localhost:5000/api/get/product");
  const productData = await data.json();
  console.log(productData);
  return productData;
});

const { reducer } = productSlice;
export { fetchProduct };
export default reducer;
