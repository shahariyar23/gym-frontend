import CourseImageUploader from "@/components/admin-vew/image-uploader";
import CommonFrom from "@/components/common/from";
import { Button } from "@/components/ui/button";
import { addAccessoriesFromElement } from "@/config";
import React, { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoures,
  deleteCourse,
  fetchAllCourse,
  updateCourse,
} from "@/store/admin/courseSlice";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteIcon, Loader, Pencil, Trash2 } from "lucide-react";
import CourseTile from "@/components/admin-vew/courseTile";
import {
  createAccessories,
  deleteAccessories,
  fetchAllAccessories,
  updateAccessories,
} from "@/store/admin/accessorisSlice";

const AdminAccessories = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const initialFromData = {
    image: "",
    title: "",
    type: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
    totalStock: "",
    brand: "",
  };

  const [openCoursDialog, setOpenCoursDialog] = useState(false);
  const [fromData, setFromData] = useState(initialFromData);
  const [imagefile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [courseUpdatedId, setCourseUpdatedId] = useState(null);
  const { accessories } = useSelector((state) => state.adminAccessoris);

  // console.log(accessories);

  //  cloudinary function
  const uploadImageCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("accessories", imagefile);
    console.log(data);
    const res = await axios
      .post("http://localhost:5000/api/admin/accessories/upload", data)
      .then((res) => {
        if (res?.data.success) {
          // console.log(res.data.result.url);
          setImageLoadingState(false);
          return res.data.result.url;
        } else {
          setImageLoadingState(false);
        }
      });

    return res;
  };

  // add and updated course button
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (courseUpdatedId !== null) {
      dispatch(updateAccessories({ id: courseUpdatedId, fromData })).then(
        (res) => {
          if (res?.payload?.succes) {
            setFromData(initialFromData);
            setCourseUpdatedId(null);
            setOpenCoursDialog(false);
            dispatch(fetchAllAccessories());
            toast({
              title: `${res?.payload?.message}`,
            });
            setIsLoading(false);
          } else {
            setFromData(initialFromData);
            setCourseUpdatedId(null);
            setOpenCoursDialog(false);
            toast({
              title: `${res?.payload?.message}`,
            });
            setIsLoading(false);
          }
        }
      );
    } else {
      const uploadedImageURL = await uploadImageCloudinary();
      fromData.image = uploadedImageURL;
      dispatch(createAccessories(fromData)).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAllAccessories());
          setOpenCoursDialog(false);
          setImageLoadingState(false);
          setFromData(initialFromData);
          setImageFile(null);
          toast({
            title: `${res?.payload?.message}`,
          });
          setIsLoading(false);
        } else {
          setImageLoadingState(false);
          toast({
            title: `${res?.payload?.message}`,
          });
          setIsLoading(false);
        }
      });
    }
  };

  // fetch all data
  useEffect(() => {
    dispatch(fetchAllAccessories());
  }, [dispatch]);

  // delete course
  const handelDelete = (id) => {
    toast({
      title: `please wait`,
    });
    dispatch(deleteAccessories(id)).then((res) => {
      if (res?.payload?.succes) {
        dispatch(fetchAllAccessories());
        toast({
          title: `${res?.payload?.message}`,
        });
      }
    });
  };
  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button
          onClick={() => {
            setOpenCoursDialog(true);
            setFromData(initialFromData);
            setCourseUpdatedId(null);
          }}
          className="text-md px-4 py-2 rounded-md"
        >
          Add new Accessories
        </Button>
      </div>
      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {accessories?.map((courseItem) => (
          <CourseTile
            key={courseItem._id}
            courseItem={courseItem}
            setCourseUpdatedId={setCourseUpdatedId}
            handelDelete={handelDelete}
            setFromData={setFromData}
            setOpenCoursDialog={setOpenCoursDialog}
            accessories={true}
          />
        ))}
      </div>

      <Sheet
        open={openCoursDialog}
        onOpenChange={() => {
          setOpenCoursDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="border-b my-2 text-2xl pb-2">
              {courseUpdatedId ? "Update accessoris" : "Add new Accessories"}
            </SheetTitle>
          </SheetHeader>
          <CourseImageUploader
            imagefile={imagefile}
            setImageFile={setImageFile}
            imageLoadingState={imageLoadingState}
            isUpdatedMode={courseUpdatedId !== null}
          />
          <div className="py-6">
            <CommonFrom
              fromControls={addAccessoriesFromElement}
              fromData={fromData}
              setFromData={setFromData}
              onSubmit={onSubmit}
              buttonText={
                imageLoadingState ? (
                  <Loader className="text-center animate-spin" />
                ) : courseUpdatedId ? (
                  "Update"
                ) : isLoading ? (
                  <Loader className="text-center animate-spin" />
                ) : (
                  "Create Accessories"
                )
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminAccessories;
