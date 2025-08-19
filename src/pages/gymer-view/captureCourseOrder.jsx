import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  captureCourseOrder,
  getAllCourseOrdersByUserId,
} from "@/store/gyn/courseOrderSlice";
import { useParams } from "react-router-dom";

const CaptureCourseOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { trnID } = useParams();
  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentCourseOrderId"));
    dispatch(captureCourseOrder({ orderId })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Course Enrollment successfully",
        });
        sessionStorage.removeItem("currentCourseOrderId");
        setTimeout(() => {
          window.location.href = "/gym/account";
        }, 2000);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center text-3xl">Your transition ID: {trnID}</h1>
      <p>Please wait!!! Order processing...</p>
    </div>
  );
};

export default CaptureCourseOrder;
