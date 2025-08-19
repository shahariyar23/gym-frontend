import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminCouserSlice from "./admin/courseSlice";
import adminOrderSlice from "./admin/orderSlice";
import adminAccessoriesSlice from "./admin/accessorisSlice";

import gymCourseSlice from "./gyn/courseSlice";
import gymAccessoriesSlice from "./gyn/accessoriesSlice";
import gymCartSlice from "./gyn/cartSlice";
import gymAddressSlice from "./gyn/addressSlice";
import gymAccessoriesOrderSlice from "./gyn/accessoriesOrderSlice";
import gymCourseOrderSlice from "./gyn/courseOrderSlice";
import gymSearchSlice from "./gyn/searchSlice";
import gymSliceSlice from "./gyn/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminCourse: adminCouserSlice,
    adminOrder: adminOrderSlice,
    adminAccessoris: adminAccessoriesSlice,

    gymCourse: gymCourseSlice,
    gymAccessories: gymAccessoriesSlice,
    gymCart: gymCartSlice,
    gymAddress: gymAddressSlice,
    gymOrder: gymAccessoriesOrderSlice,
    gymCourseOrder: gymCourseOrderSlice,
    gymSearch: gymSearchSlice,
    gymReview: gymSliceSlice,
  },
});

export default store;
