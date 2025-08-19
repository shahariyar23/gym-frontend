import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearcResults = createAsyncThunk(
  "api/search",
  async (keyword) => {
    const res = await axios.get(`https://gym-backend-zeta.vercel.app/api/search/${keyword}`);
    return res.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearcResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearcResults.fulfilled, (state, action) => {
        (state.isLoading = false), (state.searchResults = action.payload.data);
      })
      .addCase(getSearcResults.rejected, (state) => {
        (state.isLoading = false), (state.searchResults = []);
      });
  },
});
export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
