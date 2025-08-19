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
  getAllCourseOrdersByUserId,
  getCourseOrderDetails,
  resetCourseOrderDetails,
} from "@/store/gyn/courseOrderSlice";
import OrderDetailsView from "./orderDetailsView";

const GymOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderCourseDetails } = useSelector(
    (state) => state.gymCourseOrder
  );
  console.log(orderCourseDetails, "from course");

  function handleFetchOrderDetails(getId) {
    dispatch(getCourseOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllCourseOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderCourseDetails !== null) setOpenDetailsDialog(true);
  }, [orderCourseDetails]);

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
            {orderList && orderList?.length > 0
              ? orderList?.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          order?.orderStatus === "Confirmed"
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
                        open={!!orderCourseDetails}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            dispatch(resetCourseOrderDetails());
                          }
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(order?._id)}
                        >
                          View Details
                        </Button>
                        <OrderDetailsView orderDetails={orderCourseDetails} />
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

export default GymOrders;
