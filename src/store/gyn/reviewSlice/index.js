import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviewList: [],
};

export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ productId, userId, userName, reviewMessage, reviewValue }) => {
    const response = await axios.post(
      "https://gym-backend-zeta.vercel.app/api/gym/review/add",
      { productId, userId, userName, reviewMessage, reviewValue }
    );
    return response.data;
  }
);

export const getReview = createAsyncThunk(
  "review/getReview",
  async (productId) => {
    const res = await axios.get(
      `https://gym-backend-zeta.vercel.app/api/gym/review/review/${productId}`
    );
    return res.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        // state.reviewList =
      })
      .addCase(getReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewList = action.payload.data;
      })
      .addCase(getReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewList = [];
      });
  },
});

export default reviewSlice.reducer;
