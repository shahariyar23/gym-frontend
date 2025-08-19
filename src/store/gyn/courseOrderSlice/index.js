import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderList: [],
  orderCourseDetails: null,
};

export const createCourseOrder = createAsyncThunk(
  "/order/payment",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/gym/course/order/payment",
      orderData
    );
    return response.data;
  }
);
export const captureCourseOrder = createAsyncThunk(
  "/order/captureOrder",
  async ({ orderId }) => {
    const response = await axios.post(
      "http://localhost:5000/api/gym/course/order/captureOrder",
      { orderId }
    );
    return response.data;
  }
);

export const getAllCourseOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/gym/course/order/list/${userId}`
    );

    return response.data;
  }
);

export const getCourseOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/gym/course/order/details/${id}`
    );

    return response.data;
  }
);

const gymCourseOrderSlice = createSlice({
  name: "gymCourseOrderSlice",
  initialState,
  reducers: {
    resetCourseOrderDetails: (state) => {
      sessionStorage.removeItem("currentCourseOrderId");
      state.orderCourseDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourseOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourseOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentCourseOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createCourseOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })
      .addCase(getAllCourseOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourseOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllCourseOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getCourseOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderCourseDetails = action.payload.data;
      })
      .addCase(getCourseOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderCourseDetails = null;
      });
  },
});

export const { resetCourseOrderDetails } = gymCourseOrderSlice.actions;
export default gymCourseOrderSlice.reducer;
