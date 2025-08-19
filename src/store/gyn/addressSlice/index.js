import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/address/addAddress",
  async (fromData) => {
    const response = await axios.post(
      "https://gym-backend-zeta.vercel.app/api/gym/address/add",
      fromData
    );

    return response.data;
  }
);
export const fetchAddress = createAsyncThunk(
  "/address/fetchAddress",
  async (userId) => {
    const response = await axios.get(
      `https://gym-backend-zeta.vercel.app/api/gym/address/fetch/${userId}`
    );

    return response.data;
  }
);
export const updateAddress = createAsyncThunk(
  "/address/updateAddress",
  async ({ fromData, userId, addressId }) => {
    const response = await axios.put(
      `https://gym-backend-zeta.vercel.app/api/gym/address/update/${userId}/${addressId}`,
      fromData
    );

    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `https://gym-backend-zeta.vercel.app/api/gym/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        (state.isLoading = false), (state.addressList = action.payload.data);
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
