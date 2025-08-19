import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createAccessoriesOrder = createAsyncThunk(
  "/order/payment",
  async (orderData) => {
    const response = await axios.post(
      "https://gym-backend-zeta.vercel.app/api/gym/accessories/order/payment",
      orderData
    );
    return response.data;
  }
);
export const captureAccessoriesOrder = createAsyncThunk(
  "/order/captureOrder",
  async ({ orderId }) => {
    console.log(orderId, "orderID");
    const res = await axios.post(
      "https://gym-backend-zeta.vercel.app/api/gym/accessories/order/captureOrder",
      { orderId }
    );
    console.log(res.data);
    return res.data;
  }
);

export const getAllAccessoriesOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `https://gym-backend-zeta.vercel.app/api/gym/accessories/order/list/${userId}`
    );

    return response.data;
  }
);

export const getAccessoriesOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `https://gym-backend-zeta.vercel.app/api/gym/accessories/order/details/${id}`
    );

    return response.data;
  }
);

const gymAccessoriesOrderSlice = createSlice({
  name: "gymOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      sessionStorage.removeItem("currentAccessoriesOrderID");
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccessoriesOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccessoriesOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentAccessoriesOrderID",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createAccessoriesOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })
      .addCase(captureAccessoriesOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(captureAccessoriesOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
      })
      .addCase(captureAccessoriesOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })
      .addCase(getAllAccessoriesOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAccessoriesOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllAccessoriesOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getAccessoriesOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccessoriesOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getAccessoriesOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = gymAccessoriesOrderSlice.actions;
export default gymAccessoriesOrderSlice.reducer;
