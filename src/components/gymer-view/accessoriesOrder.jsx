import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import {
  getAllAccessoriesOrdersByUserId,
  getAccessoriesOrderDetails,
  resetOrderDetails,
} from "@/store/gyn/accessoriesOrderSlice";
import OrderDetailsView from "./orderDetailsView";

const GymAccessoriesOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.gymOrder);
  console.log(orderDetails, "from accessoris");

  function handleFetchOrderDetails(getId) {
    dispatch(getAccessoriesOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllAccessoriesOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // console.log(orderDetails);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          order?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : order?.orderStatus === "Rejected"
                            ? "bg-red-500"
                            : order?.orderStatus === "Delevered"
                            ? "bg-green-800"
                            : "bg-black"
                        }`}
                      >
                        {order?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{order?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={!!orderDetails}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            dispatch(resetOrderDetails());
                          }
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(order?._id)}
                        >
                          View Details
                        </Button>
                        <OrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GymAccessoriesOrders;
