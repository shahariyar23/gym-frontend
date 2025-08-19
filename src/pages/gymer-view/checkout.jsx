import Address from "@/components/gymer-view/address";
import img from "../../assets/checkout.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/gymer-view/cartContentItems";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createAccessoriesOrder } from "@/store/gyn/accessoriesOrderSlice";

const GymCheckOut = () => {
  const { cartItems } = useSelector((state) => state.gymCart);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.gymAddress);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const totalPrice =
    cartItems && cartItems?.items?.length > 0
      ? cartItems?.items?.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.offerPrice > 0
              ? currentItem?.offerPrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // handleInitiatePayment funtion
  const handleInitiatePayment = () => {
    if (cartItems?.items?.length === 0) {
      return toast({
        title: "Your cart is empty!!",
        variant: "destructive",
      });
    }
    if (addressList?.length === 0) {
      return toast({
        title: "You are not add any address.",
        variant: "destructive",
      });
    }
    if (currentSelectedAddress === null) {
      return toast({
        title: "You are not selected any address",
        variant: "destructive",
      });
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items.map((item) => ({
        accessoriesId: item?.accessoriesId,
        title: item?.title,
        image: item?.image,
        price: item?.price > 0 ? item?.price : item?.offerPrice,
        quantity: item?.quantity,
      })),
      addressInfo: {
        name: currentSelectedAddress?.name,
        email: currentSelectedAddress?.email,
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        distric: currentSelectedAddress?.distric,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "online",
      paymentStatus: "cancel",
      totalAmount: totalPrice,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
    };

    dispatch(createAccessoriesOrder(orderData)).then((data) => {
      console.log(data.payload);
      if (data?.payload?.success) {
        setIsPaymentStart(true);
        window.location.href = data.payload.url;
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="check out page"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          selectedId={currentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems?.items?.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent
                  key={item?.accessoriesId}
                  cartItem={item}
                />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">$ {totalPrice}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={() => handleInitiatePayment()} className="w-full">
              CheckOut with
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymCheckOut;
