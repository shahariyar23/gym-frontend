import { useEffect, useState } from "react";
import CommonFrom from "../common/from";
import { Card, CardContent, CardHeader } from "../ui/card";
import { addressFromControll } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from "@/store/gyn/addressSlice";
import { useToast } from "@/hooks/use-toast";
import AddressCart from "./addressCart";

const initialFormData = {
  name: "",
  email: "",
  address: "",
  city: "",
  distric: "",
  phone: "",
  notes: "",
};

const Address = ({ selectedId, setCurrentSelectedAddress }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [editedId, setEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.gymAddress);

  // load all address
  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);

  //   from data control button
  const handelManageAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && editedId == null) {
      setFormData(initialFormData);
      toast({
        title: "You can add maximun 3 Address",
        variant: "destructive",
      });
      return;
    }

    editedId
      ? dispatch(
          updateAddress({
            fromData: formData,
            userId: user?.id,
            addressId: editedId,
          })
        ).then((data) => {
          setEditedId(null);
          setFormData(initialFormData);
          if (data?.payload?.success) {
            dispatch(fetchAddress(user?.id));

            toast({
              title: data?.payload?.message,
            });
          }
        })
      : dispatch(addAddress({ ...formData, userId: user?.id })).then((data) => {
          if (data?.payload?.success) {
            setFormData(initialFormData);
            dispatch(fetchAddress(user?.id));
            toast({
              title: data?.payload?.message,
            });
          }
        });
  };

  //   form data validation
  const isValidFormData = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  // edit address
  const handleEditAddress = (getCurrentAddress) => {
    setEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      name: getCurrentAddress?.name,
      email: getCurrentAddress?.email,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      distric: getCurrentAddress?.distric,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  };

  // delete address
  const handleDeleteAddress = (getCurrentAddress) => {
    // console.log(getCurrentAddress);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id));
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0 ? (
          addressList.map((address) => (
            <AddressCart
              key={address?._id}
              selectedId={selectedId}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              addressInfo={address}
            />
          ))
        ) : (
          <div className="font-bold text-xl text-gray-500">
            Please add address!!
          </div>
        )}
      </div>
      <CardHeader className="font-bold text-xl">
        {editedId ? "Edit Address" : "Add new address"}
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonFrom
          fromControls={addressFromControll}
          fromData={formData}
          setFromData={setFormData}
          buttonText={editedId ? "Edit Address" : "Add Address"}
          onSubmit={handelManageAddress}
          isButtonDisable={!isValidFormData()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
