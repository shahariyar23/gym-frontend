import { useToast } from "@/hooks/use-toast";
import { captureAccessoriesOrder } from "@/store/gyn/accessoriesOrderSlice";
import { fetchToCartAccessories } from "@/store/gyn/cartSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CaptureAccessoriesOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { trnID } = useParams();
  useEffect(() => {
    const orderId = JSON.parse(
      sessionStorage.getItem("currentAccessoriesOrderID")
    );
    console.log(orderId, "order id");
    dispatch(captureAccessoriesOrder({ orderId })).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: "Your order successfull done",
        });
        sessionStorage.removeItem("currentAccessoriesOrderID");
        dispatch(fetchToCartAccessories({ userId: user?.id }));
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

export default CaptureAccessoriesOrder;
