import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Edit, Loader, Trash } from "lucide-react";
import { Button } from "../ui/button";

const CourseTile = ({
  accessories,
  isLoading,
  courseItem,
  handelDelete,
  setFromData,
  setOpenCoursDialog,
  setCourseUpdatedId,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="relative w-full">
        <div className="w-full">
          <img
            className="w-full rounded h-[400px] object-cover rounded-t-lg"
            src={courseItem.image}
            alt={courseItem.title}
          />
        </div>
        <CardContent>
          <h1 className="text-xl font-bold mb-2 text-center">
            {courseItem.title}
          </h1>
          {accessories ? (
            <p className="text-xl font-bold mb-2">
              Stock: {courseItem.totalStock}
            </p>
          ) : null}
          <div className="flex justify-between items-center">
            <span
              className={`text-lg text-primary font-bold ${
                courseItem?.offerPrice > 0 && courseItem?.offerPrice !== null
                  ? "line-through"
                  : ""
              }`}
            >
              BDT{courseItem.price}
            </span>
            <span className="text-lg font-bold text-primary">
              {courseItem?.offerPrice > 0 &&
                courseItem?.offerPrice !== null &&
                `
                BDT
                ${courseItem.offerPrice}`}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setCourseUpdatedId(courseItem?._id);
              setFromData(courseItem);
              setOpenCoursDialog(true);
            }}
            className="flex items-center gap-2"
          >
            <Edit />
            <span>Edit</span>
          </Button>
          <Button
            onClick={() => handelDelete(courseItem._id)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
          >
            <Trash />
            <span>Delete</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CourseTile;
