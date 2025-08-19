import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, accessoriesId, quantity }) => {
    const res = await axios.post("http://localhost:5000/api/gym/cart/add", {
      userId,
      accessoriesId,
      quantity,
    });
    fetchToCartAccessories();
    return res?.data;
  }
);

export const fetchToCartAccessories = createAsyncThunk(
  "/cart/fetchAccessories",
  async ({ userId }) => {
    const res = await axios.get(
      `http://localhost:5000/api/gym/cart/fetchAccessories/${userId}`,
      {}
    );
    return res?.data;
  }
);
export const updateToCart = createAsyncThunk(
  "/cart/updateToCart",
  async ({ userId, accessoriesId, quantity }) => {
    const res = await axios.put("http://localhost:5000/api/gym/cart/update", {
      userId,
      accessoriesId,
      quantity,
    });
    return res?.data;
  }
);
export const deleteToCart = createAsyncThunk(
  "/cart/deleteToCart",
  async ({ userId, accessoriesId }) => {
    console.log(userId, accessoriesId);
    const res = await axios.delete(
      `http://localhost:5000/api/gym/cart/delete/${userId}/${accessoriesId}`,
      {}
    );
    console.log(res?.data);
    return res?.data;
  }
);
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchToCartAccessories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchToCartAccessories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchToCartAccessories.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload, "payload");
        state.cartItems = action.payload.data;
      })
      .addCase(deleteToCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default shoppingCartSlice.reducer;
