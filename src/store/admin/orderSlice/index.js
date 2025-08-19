import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersByAllUser = createAsyncThunk(
  "/order/getAllOrdersByAllUser",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/order/list/`
    );

    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/order/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.post(
      `http://localhost:5000/api/admin/order/orderStatus/${id}`,
      {
        orderStatus,
      }
    );
    return response.data;
  }
);

const AdminOrderSlice = createSlice({
  name: "AdminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetailsForAdmin: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersByAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByAllUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});
export const { resetOrderDetailsForAdmin } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
