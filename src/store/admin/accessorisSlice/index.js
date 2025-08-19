import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  accessories: [],
};

export const createAccessories = createAsyncThunk(
  "/accessories/createAccessories",
  async (fromData) => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/accessories/create",
      fromData,
      {
        withCredentials: true,
      }
    );
    console.log(res);
    return res?.data;
  }
);
export const fetchAllAccessories = createAsyncThunk(
  "/accessories/fetchAllAccessories",
  async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/accessories/get",
      {},
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);

export const updateAccessories = createAsyncThunk(
  "/couser/updateAccessories",
  async ({ id, fromData }) => {
    console.log(id, fromData);
    const res = await axios.put(
      `http://localhost:5000/api/admin/accessories/update/${id}`,
      fromData,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);

export const deleteAccessories = createAsyncThunk(
  "/couser/deleteAccessories",
  async (id) => {
    const res = await axios.delete(
      `http://localhost:5000/api/admin/accessories/delete/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);

const AdminAccessoriesSlice = createSlice({
  name: "adminAccessories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccessories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccessories.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createAccessories.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAccessories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAccessories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessories = action.payload.listOfAccessories;
      })
      .addCase(fetchAllAccessories.rejected, (state) => {
        state.isLoading = false;
        state.accessories = [];
      });
  },
});

export default AdminAccessoriesSlice.reducer;
