import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

const OrderDetailsView = ({ orderDetails }) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <ScrollArea className="h-[600px] w-full rounded-md border p-4">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderDetails?._id}</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>{orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails?.paymentStatus === "paid"
                      ? "bg-green-800"
                      : "bg-black"
                  }`}
                >
                  {orderDetails?.paymentStatus}
                </Badge>
              </Label>
            </div>
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-800"
                      : "bg-black"
                  }`}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                {orderDetails && orderDetails?.cartItems?.length > 0
                  ? orderDetails?.cartItems.map((item) => (
                      <li
                        key={item?.productId}
                        className="flex items-center justify-between"
                      >
                        <span className="font-bold">{item?.title}</span>
                        <span className="font-bold">{item?.quantity}</span>
                        <span className="font-bold">${item?.price}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>{orderDetails?.addressInfo?.name}</span>
                <span>{orderDetails?.addressInfo?.address}</span>
                <span>{orderDetails?.addressInfo?.city}</span>
                <span>{orderDetails?.addressInfo?.distric}</span>
                <span>{orderDetails?.addressInfo?.phone}</span>
                <span>{orderDetails?.addressInfo?.notes}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default OrderDetailsView;
