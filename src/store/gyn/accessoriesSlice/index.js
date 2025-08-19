import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  accessories: [],
  homeAccessories: [],
  accessoriesDetails: null,
  // averageReview: 0,
};

export const fetchFilterAccessories = createAsyncThunk(
  "/couser/fetchFilterAccessories",
  async ({ filterParams, sortParams }) => {
    // console.log(filterParams, sortParams);
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const res = await axios.get(
      `https://gym-backend-zeta.vercel.app/api/gym/accessories/get?${query}`,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);
export const fetchHomeAccessories = createAsyncThunk(
  "/couser/fetchHomeAccessories",
  async () => {
    const res = await axios.get(
      "https://gym-backend-zeta.vercel.app/api/gym/accessories/fetch-home",
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);
export const fetchAccessoriesDetails = createAsyncThunk(
  "/couser/fetchAccessoriesDetails",
  async (id) => {
    const res = await axios.get(
      `https://gym-backend-zeta.vercel.app/api/gym/accessories/getDetails/${id}`,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);

const GymAccessoriesSlice = createSlice({
  name: "gymCourse",
  initialState,
  reducers: {
    setAccessoriesDetails: (state) => {
      state.accessoriesDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterAccessories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilterAccessories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessories = action.payload?.accessories;
      })
      .addCase(fetchFilterAccessories.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAccessoriesDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAccessoriesDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessoriesDetails = action.payload?.accessories;
      })
      .addCase(fetchAccessoriesDetails.rejected, (state) => {
        state.isLoading = false;
        state.accessoriesDetails = null;
      })
      .addCase(fetchHomeAccessories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHomeAccessories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.homeAccessories = action?.payload?.data;
      })
      .addCase(fetchHomeAccessories.rejected, (state) => {
        state.isLoading = false;
        state.homeAccessories = null;
      });
  },
});
export const { setAccessoriesDetails } = GymAccessoriesSlice.actions;

export default GymAccessoriesSlice.reducer;
