import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cartContentItems";
import { useNavigate } from "react-router-dom";

const UserCartWraper = ({ cartItems, setOpenCartSheet }) => {
  const totalPrice =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.offerPrice > 0
              ? currentItem?.offerPrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const navigate = useNavigate();

  return (
    <SheetContent className="sm:max-w-md overflow-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 ">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent cartItem={item} key={item?.image} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">BDT {totalPrice}</span>
        </div>
      </div>
      {totalPrice > 0 ? (
        <Button
          onClick={() => {
            navigate("/gym/checkout"), setOpenCartSheet(false);
          }}
          className="w-full mt-8 text-md"
        >
          Checkout
        </Button>
      ) : null}
    </SheetContent>
  );
};

export default UserCartWraper;
