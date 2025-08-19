import CourseImageUploader from "@/components/admin-vew/image-uploader";
import CommonFrom from "@/components/common/from";
import { Button } from "@/components/ui/button";
import { addCourseFromElement } from "@/config";
import { Fragment, useEffect, useState } from "react";
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

const AdminGymCourse = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const initialFromData = {
    image: null,
    title: "",
    description: "",
    category: "",
    gymType: "",
    price: "",
    offerPrice: "",
  };

  const [openCoursDialog, setOpenCoursDialog] = useState(false);
  const [fromData, setFromData] = useState(initialFromData);
  const [imagefile, setImageFile] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [courseUpdatedId, setCourseUpdatedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { courses } = useSelector((state) => state.adminCourse);

  //  cloudinary function
  const uploadImageCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("course", imagefile);
    const res = await axios
      .post("http://localhost:5000/api/admin/course/upload", data)
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
    setIsLoading(true);
    e.preventDefault();
    if (courseUpdatedId !== null) {
      dispatch(updateCourse({ id: courseUpdatedId, fromData })).then((res) => {
        if (res?.payload?.succes) {
          setFromData(initialFromData);
          setCourseUpdatedId(null);
          setOpenCoursDialog(false);
          dispatch(fetchAllCourse());
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
      });
    } else {
      const uploadedImageURL = await uploadImageCloudinary();
      fromData.image = uploadedImageURL;
      dispatch(createCoures(fromData)).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAllCourse());
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
    dispatch(fetchAllCourse());
  }, [dispatch]);

  // delete course
  const handelDelete = (id) => {
    toast({
      title: `please wait!!!`,
    });
    dispatch(deleteCourse(id)).then((res) => {
      if (res?.payload?.succes) {
        dispatch(fetchAllCourse());
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
          Add new Course
        </Button>
      </div>
      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses?.map((courseItem) => (
          <CourseTile
            key={courseItem._id}
            courseItem={courseItem}
            setCourseUpdatedId={setCourseUpdatedId}
            handelDelete={handelDelete}
            setFromData={setFromData}
            setOpenCoursDialog={setOpenCoursDialog}
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
              {courseUpdatedId ? "Update course" : "Add new course"}
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
              fromControls={addCourseFromElement}
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
                  "Create Course"
                )
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminGymCourse;
