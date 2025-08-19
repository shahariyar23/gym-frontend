import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  courses: [],
  homeCourses: [],
  courseDetails: null,
  // averageReview: 0,
};

export const fetchFilterCourse = createAsyncThunk(
  "/couser/fetchFilterCourse",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const res = await axios.get(
      `http://localhost:5000/api/gym/course/get?${query}`,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);
export const fetchHomeCourse = createAsyncThunk(
  "/couser/fetchHomeCourse",
  async () => {
    const res = await axios.get(
      "http://localhost:5000/api/gym/course/fetch-home",
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);
export const fetchCourseDetails = createAsyncThunk(
  "/couser/fetchCourseDetails",
  async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/gym/course/get/${id}`,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);

const GymCourseSlice = createSlice({
  name: "gymCourse",
  initialState,
  reducers: {
    setCourseDetails: (state) => {
      state.courseDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilterCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload?.courses;
      })
      .addCase(fetchFilterCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetails = action.payload?.course;
      })
      .addCase(fetchCourseDetails.rejected, (state) => {
        state.isLoading = false;
        state.courseDetails = null;
      })
      .addCase(fetchHomeCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHomeCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.homeCourses = action?.payload?.data;
      })
      .addCase(fetchHomeCourse.rejected, (state) => {
        state.isLoading = false;
        state.homeCourses = null;
      });
  },
});
export const { setCourseDetails } = GymCourseSlice.actions;

export default GymCourseSlice.reducer;
