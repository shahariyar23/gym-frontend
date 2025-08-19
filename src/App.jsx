import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-vew/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import GymLayOut from "./components/gymer-view/layout";
import NotFound from "./pages/notfound";
import GymHome from "./pages/gymer-view/home";
import GymAccount from "./pages/gymer-view/account";
import GymCheckOut from "./pages/gymer-view/checkout";
import GymListing from "./pages/gymer-view/listing";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import AdminGymCourse from "./pages/admin-view/gym";
import PaymentFail from "./pages/gymer-view/paymentFail";
import PaymentCancel from "./pages/gymer-view/PaymentCancel";
import CaptureOrder from "./pages/gymer-view/captureCourseOrder";
import OrderSuccess from "./pages/gymer-view/orderSuccess";
import SearchResult from "./pages/gymer-view/search";
import Accessories from "./pages/gymer-view/accessories";
import AdminAccessories from "./pages/admin-view/accessories";
import CaptureCourseOrder from "./pages/gymer-view/captureCourseOrder";
import CaptureAccessoriesOrder from "./pages/gymer-view/captureAccessoriesOrder";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import { Loader } from "lucide-react";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader className="text-gray-500 animate-spin text-5xl flex items-center justify-center " />
      </div>
    );
  }
  return (
    <div className="flex flex-col  bg-white">
      {/* common pages */}
      <Routes path>
        <Route path="/" element={<GymLayOut />}>
          <Route path="/gym/dashboard" element={<GymHome />} />
          <Route path="/gym/listing" element={<GymListing />} />
          <Route path="/gym/accessories" element={<Accessories />} />
          <Route path="/gym/search" element={<SearchResult />} />
        </Route>
        <Route path="/gym" element={<GymLayOut />}>
          <Route path="/gym/dashboard" element={<GymHome />} />
          <Route path="/gym/listing" element={<GymListing />} />
          <Route path="/gym/accessories" element={<Accessories />} />
          <Route path="/gym/search" element={<SearchResult />} />
        </Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="product" element={<AdminFeatures />} />
          <Route path="course" element={<AdminGymCourse />} />
          <Route path="accessories" element={<AdminAccessories />} />
        </Route>

        <Route
          path="/gym"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <GymLayOut />
            </CheckAuth>
          }
        >
          <Route path="checkout" element={<GymCheckOut />} />
          <Route path="account" element={<GymAccount />} />
          <Route
            path="payment/success/:trnID"
            element={<CaptureCourseOrder />}
          />
          <Route
            path="payment/accessories/success/:trnID"
            element={<CaptureAccessoriesOrder />}
          />
          <Route path="payment/fail/:trnID" element={<PaymentFail />} />
          <Route path="payment/cancel" element={<PaymentCancel />} />
          <Route path="order/success" element={<OrderSuccess />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
