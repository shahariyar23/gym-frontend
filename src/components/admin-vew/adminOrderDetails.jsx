import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonFrom from "../common/from";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { useDispatch } from "react-redux";
import {
  getAllOrdersByAllUser,
  updateOrderStatus,
} from "@/store/admin/orderSlice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};

const AdminOrderDetails = ({ orderDetails, setOpenDetailsDialog }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // console.log(orderDetails?.cartItems, "cart");

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const { status } = formData;
    console.log(formData);
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((res) => {
      if (res?.payload?.success) {
        toast({
          title: res?.payload?.message,
        });
        dispatch(getAllOrdersByAllUser());
        setOpenDetailsDialog(false);
      }
    });
  };

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
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-800"
                      : orderDetails?.orderStatus === "Rejected"
                      ? "bg-red-600"
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

              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails && orderDetails?.cartItems?.length > 0
                    ? orderDetails?.cartItems?.map((item) => (
                        <TableRow key={item?._id}>
                          <TableCell className="font-medium">
                            {item?.title}
                          </TableCell>
                          <TableCell className="text-center">
                            {item?.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item?.price}
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
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
          <div>
            <CommonFrom
              fromControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "rejected", label: "Rejected" },
                    { id: "delevered", label: "Delevered" },
                  ],
                },
              ]}
              fromData={formData}
              setFromData={setFormData}
              buttonText={"Update order status"}
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default AdminOrderDetails;
