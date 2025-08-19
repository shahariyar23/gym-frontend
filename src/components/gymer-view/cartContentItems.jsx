import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteToCart,
  fetchToCartAccessories,
  updateToCart,
} from "@/store/gyn/cartSlice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // update quentity to cart
  const handelUpdateQuantity = (accessories, actionType) => {
    dispatch(
      updateToCart({
        userId: user?.id,
        accessoriesId: accessories?.accessoriesId,
        quantity:
          actionType === "plus"
            ? accessories?.quantity + 1
            : accessories?.quantity - 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchToCartAccessories({ userId: user?.id }));
      }
    });
  };

  // delete course to cart
  const handelDelete = (accessoriesId) => {
    dispatch(deleteToCart({ userId: user?.id, accessoriesId })).then((res) => {
      console.log("payload", res?.payload);
      if (res?.payload?.success) {
        dispatch(fetchToCartAccessories({ userId: user?.id }));
        toast({
          title: "Deleted Successfully!!",
        });
      }
    });
  };
  return (
    <div className="flex md:flex-row flex-col gap-4  items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-16 h-16 object-fill object-center rounded-lg"
      />
      <div className="flex flex-col flex-1 gap-4 w-full">
        <h2 className="font-extrabold text-center">{cartItem?.title}</h2>
        <div className="items-center md:justify-normal justify-between flex mt-1 gap-3 w-full px-5">
          <Button
            variant="outline"
            size="icon"
            className="shadow-md duration-700 transition-all"
            disabled={cartItem?.quantity === 1}
            onClick={() => handelUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4 cursor-pointer" />
            <span className="sr-only">decriese</span>
          </Button>
          <span className="font-semibold"> {cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="shadow-md duration-700 transition-all"
            onClick={() => handelUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4 cursor-pointer" />
            <span className="sr-only">incriese</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-row md:flex-col px-5 justify-between md:items-center gap-4 w-full">
        <Button
          variant="outline"
          size="icon"
          className="bg-red-500 text-white duration-700 shadow-md transition hover:bg-white hover:text-red-500"
          onClick={() => handelDelete(cartItem?.accessoriesId)}
        >
          <Trash2 className="w-4 h-4 cursor-pointer" />
          <span className="sr-only">delete</span>
        </Button>
        <div className="font-semibold">
          {cartItem?.offerPrice > 0 ? (
            <p>BDT {cartItem?.offerPrice.toFixed(2)}</p>
          ) : (
            <p>BDT {cartItem?.price?.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCartItemsContent;
