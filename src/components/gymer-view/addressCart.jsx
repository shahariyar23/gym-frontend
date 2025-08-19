import { FileSliders, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCart = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  selectedId,
  setCurrentSelectedAddress,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid gap-4 p-3">
        <Label>
          <span className="font-bold text-[#0f1729]">Name: </span>
          {addressInfo?.name}
        </Label>
        <Label>
          <span className="font-bold text-[#0f1729]">Email: </span>
          {addressInfo?.email}
        </Label>
        <Label>
          <span className="font-bold text-[#0f1729]">Address: </span>
          {addressInfo?.address}
        </Label>
        <Label>
          <span className="font-bold text-[#0f1729]">City: </span>{" "}
          {addressInfo?.city}
        </Label>
        <Label>
          <span className="font-bold text-[#0f1729]">Distric: </span>{" "}
          {addressInfo?.distric}
        </Label>
        <Label>
          <span className="font-bold text-[#0f1729]">Phone: </span>{" "}
          {addressInfo?.phone}
        </Label>
        <Label>
          <span className="font-bold text-[#0f1729]">Notes </span>{" "}
          {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="flex md:flex-row flex-col gap-3 mt-2 justify-between px-3">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="flex gap-2 w-full bg-green-700"
        >
          <FileSliders />
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="flex gap-2 bg-red-700 w-full"
        >
          <Trash2 />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCart;
