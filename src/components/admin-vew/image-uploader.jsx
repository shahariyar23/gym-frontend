import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Ban, Image, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const CourseImageUploader = ({
  imagefile,
  setImageFile,
  imageLoadingState,
  isUpdatedMode,
}) => {
  const inputRef = useRef(null);

  const handelRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // drap configaration
  const handelDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  const handelDrageOver = (e) => {
    e.preventDefault();
  };

  const handelImageFileChange = (e) => {
    const seletedFile = e.target.files?.[0];
    if (seletedFile) {
      setImageFile(seletedFile);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-bold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handelDrageOver}
        onDrop={handelDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handelImageFileChange}
          className="hidden"
          disabled={isUpdatedMode}
        />
        {!imagefile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            {isUpdatedMode ? (
              <>
                <Ban className="w-10 h-10 text-muted-foreground mb-2" />
                <span className="text-red-500">you can't update image </span>
              </>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                <span>Drag & drop or click to upload icon</span>
              </>
            )}
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex justify-between items-center w-full">
            <div>
              <Image />
              <span className="sr-only">file icon</span>
            </div>
            <div>{imagefile.name}</div>
            <Button
              onClick={handelRemoveImage}
              size="icon"
              className="text-muted-foreground w-6 h-6 bg-white hover:text-red-500 hover:bg-white"
            >
              <XIcon />
              <span className="sr-only">remove icone</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseImageUploader;
