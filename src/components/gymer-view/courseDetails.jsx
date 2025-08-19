import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setCourseDetails } from "@/store/gyn/courseSlice";
import { Label } from "../ui/label";
import { StarRating } from "../common/star-rating";
import { addReview, getReview } from "@/store/gyn/reviewSlice";
import { useToast } from "@/hooks/use-toast";
import { setAccessoriesDetails } from "@/store/gyn/accessoriesSlice";

const CourseDetailsDialgo = ({
  accessories,
  open,
  courseDetails,
  setOpen,
  handelAddToCart,
}) => {
  
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { reviewList } = useSelector((state) => state.gymReview);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getReview(courseDetails?._id));
  }, [courseDetails]);

  const handelratingChange = (getRating) => {
    setRating(getRating);
  };

  const handelOpenClose = () => {
    setOpen(false);
    dispatch(setCourseDetails());
    dispatch(setAccessoriesDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handelAddReview = () => {
    dispatch(
      addReview({
        productId: courseDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(getReview(courseDetails?._id));
        setRating(0);
        setReviewMsg("");
        toast({
          title: "Review Added",
        });
      } else {
        toast({
          title: "You review previously or didn't buy it",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handelOpenClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={courseDetails?.image}
            alt={courseDetails?.title}
            className="w-full h-full object-cover aspect-square"
          />
          {courseDetails?.offerPrice !== null ? (
            <Badge
              className="
                             absolute top-2 left-2 bg-red-500 hover:bg-red-600 shadow-2xl"
            >
              Offer Price
            </Badge>
          ) : null}
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold">{courseDetails?.title}</h1>
            <p className="text-muted-foreground mt-2">
              {courseDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {courseDetails?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {courseDetails?.gymType}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                courseDetails?.offerPrice > 0
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              } text-xl font-bold `}
            >
              BDT{courseDetails?.price}
            </span>
            {courseDetails?.offerPrice === null ? null : (
              <span className="text-xl font-bold text-primary">
                BDT{courseDetails?.offerPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarRating
                rating={
                  courseDetails?.averageReview
                    ? courseDetails?.averageReview
                    : 0
                }
              />
            </div>
            <span className="text-muted-foreground">
              {courseDetails?.averageReview ? courseDetails?.averageReview : 0}
            </span>
          </div>
          <div>
            <Button
              onClick={() => handelAddToCart(courseDetails?._id)}
              className="w-full mt-3 mb-5"
            >
              {accessories ? "Add to cart" : "Course Enrollment"}
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto mt-3">
            <h2 className="text-xl font-bold mb-4">Review</h2>
            <div className="grid gap-6">
              {reviewList && reviewList.length > 0
                ? reviewList.map((review) => (
                    <div className="flex gap-4" key={review?._id}>
                      <Avatar className="w-10 h-10 bg-black  border-black ">
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{review?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRating rating={review?.reviewValue} />
                        </div>
                        <p className="text-muted-foreground">
                          {review?.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <div className="mt-5 flex-col flex gap-2 mx-1">
              <Label>Write a review</Label>
              <div className="flex">
                <StarRating
                  rating={rating}
                  handelratingChange={handelratingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="write a review...."
              />
              <Button
                onClick={handelAddReview}
                disabled={reviewMsg.trim() === ""}
                className="px-6 py-4"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailsDialgo;
