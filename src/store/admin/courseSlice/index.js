import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  courses: [],
};

export const createCoures = createAsyncThunk(
  "/couser/createCourse",
  async (fromData) => {
    const res = await axios.post(
      "https://gym-backend-zeta.vercel.app/api/admin/course/create",
      fromData,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);
export const fetchAllCourse = createAsyncThunk(
  "/couser/fetchAllCours",
  async () => {
    const res = await axios.get(
      "https://gym-backend-zeta.vercel.app/api/admin/course/get",
      {},
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);
export const updateCourse = createAsyncThunk(
  "/couser/updateCourse",
  async ({ id, fromData }) => {
    console.log(id, fromData);
    const res = await axios.put(
      `https://gym-backend-zeta.vercel.app/api/admin/course/update/${id}`,
      fromData,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);
export const deleteCourse = createAsyncThunk(
  "/couser/deleteCourse",
  async (id) => {
    const res = await axios.delete(
      `https://gym-backend-zeta.vercel.app/api/admin/course/delete/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);

const AdminCourseSlice = createSlice({
  name: "adminCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.listOfCourse;
      })
      .addCase(fetchAllCourse.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default AdminCourseSlice.reducer;
