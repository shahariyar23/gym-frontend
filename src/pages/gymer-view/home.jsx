import { useEffect, useState } from "react";
import bannerOne from "../../assets/banner1.jpg";
import bannerTwo from "../../assets/banner2.jpg";
import bannerThree from "../../assets/banner3.jpg";
import bannerFour from "../../assets/banner4.jpg";
import bannerFive from "../../assets/banner5.jpg";
import bannerSix from "../../assets/banner6.jpg";
import bannerSeven from "../../assets/banner7.jpg";
import { Button } from "@/components/ui/button";
import { IoManSharp } from "react-icons/io5";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseDetails,
  fetchHomeCourse
} from "@/store/gyn/courseSlice";
import GymCourseTile from "@/components/gymer-view/courseTile";
import { Link, useNavigate } from "react-router-dom";
import CourseDetailsDialgo from "@/components/gymer-view/courseDetails";
import { addToCart, fetchToCartAccessories } from "@/store/gyn/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createCourseOrder } from "@/store/gyn/courseOrderSlice";
import {
  fetchAccessoriesDetails,
  fetchHomeAccessories,
} from "@/store/gyn/accessoriesSlice";
import { Separator } from "@/components/ui/separator";

const category = [
  { id: "Strength Training", label: "Strength Training", icon: IoManSharp },
  { id: "Cardio & Endurance", label: "Cardio & Endurance", icon: IoManSharp },
  {
    id: "Flexibility & Mobility",
    label: "Flexibility & Mobility",
    icon: IoManSharp,
  },
  { id: "Mind-Body", label: "Mind-Body", icon: IoManSharp },
];
const accessoriesCategoru = [
  {
    id: "Strength Training Accessories",
    label: "Strength Training Accessories",
    icon: IoManSharp,
  },
  {
    id: " Cardio Equipment Accessories",
    label: " Cardio Equipment Accessories",
    icon: IoManSharp,
  },
  {
    id: "Recovery and Mobility Tools",
    label: "Recovery and Mobility Tools",
    icon: IoManSharp,
  },
  {
    id: "Storage and Organization",
    label: "Storage and Organization",
    icon: IoManSharp,
  },
];

const GymHome = () => {
  const slides = [
    bannerOne,
    bannerTwo,
    bannerThree,
    bannerFour,
    bannerFive,
    bannerSix,
    bannerSeven,
  ];
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { homeAccessories, accessoriesDetails } = useSelector(
    (state) => state.gymAccessories
  );
  const { homeCourses, courseDetails } = useSelector(
    (state) => state.gymCourse
  );
  
  const { user } = useSelector((state) => state.auth);
  const [openDiagalog, setOpenDiagalog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handelNavigateListing = (currentItem, section) => {
    sessionStorage.removeItem("filter");
    const currentFilter = {
      [section]: [currentItem?.id],
    };

    sessionStorage.setItem("filter", JSON.stringify(currentFilter));
    navigate("/gym/listing");
  };
  const handelNavigateAccessoriesListing = (currentItem, section) => {
    sessionStorage.removeItem("accessories");
    const currentFilter = {
      [section]: [currentItem?.id],
    };
    sessionStorage.setItem("accessories", JSON.stringify(currentFilter));
    navigate("/gym/accessories");
  };

  // get course details
  const handelGetCourseDetails = (id) => {  
    dispatch(fetchCourseDetails(id));
    setOpenDiagalog(true)
  };




  console.log(courseDetails, "course details", openDiagalog);
  

  // handelCart
  const handelPayment = (id) => {
    // console.log(id);
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Can't Enroll",
        description: "First login please",
        action: (
          <ToastAction altText="Try again">
            <Link to="/auth/login">Login</Link>
          </ToastAction>
        ),
      });
      return;
    }
    setIsPaymentStart(true);
    // create order
    const orderData = {
      userId: user?.id,
      course: {
        productId: id?._id,
        title: id?.title,
        image: id?.image,
        price: id?.offerPrice > 0 ? id?.offerPrice : id?.price,
      },
      addressInfo: {
        name: user?.userName,
        email: user?.email,
      },
      orderStatus: "pending",
      paymentMethod: "online",
      paymentStatus: "cancel",
      totalAmount: id?.offerPrice > 0 ? id?.offerPrice : id?.price,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
    };
    dispatch(createCourseOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(false);
        window.location.href = data.payload.url;
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  const handelGetAccessoriesDetails = (id) => {
    dispatch(fetchAccessoriesDetails(id))
    setOpenDiagalog(true);
  };

  // handelCart
  const handelAddToCart = (id) => {
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Can't Buy",
        description: "First login please",
        action: (
          <ToastAction altText="Try again">
            <Link to="/auth/login">Login</Link>
          </ToastAction>
        ),
      });
      return;
    }
    dispatch(
      addToCart({
        userId: user?.id,
        accessoriesId: id,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchToCartAccessories({ userId: user?.id }));
        toast({
          title: "Add to cart",
        });
      }
    });
  };

  // auto change slide
  useEffect(() => {
   setInterval(() => {
      setCurrentBanner((previouseSlie) => (previouseSlie + 1) % slides.length);
    }, 3000);
  }, []);

  // fetch gym course & accessories data
  useEffect(() => {
    dispatch(fetchHomeCourse());
    dispatch(fetchHomeAccessories());
  }, []);

  // // course details and accessories dialog
  // useEffect(() => { 
  //   setOpenDiagalog((prev) => {
  //     const shouldOpen = Boolean(courseDetails || accessoriesDetails);
  //     return prev !== shouldOpen ? shouldOpen : prev;
  //   });
  // }, [courseDetails, accessoriesDetails]);
  
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* image slider container */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            className={`${
              index == currentBanner ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 h-auto lg:h-full w-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transfrom -translate-y-auto"
          onClick={() =>
            setCurrentBanner(
              (previousBanner) =>
                (previousBanner - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transfrom -translate-y-1/2"
          onClick={() =>
            setCurrentBanner(
              (previousBanner) => (previousBanner + 1) % slides.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* gym by category */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Gym by category
          </h2>
        </div>
        <div className="grid gap-16 grid-cols-1 md:grid-cols-4 mx-9">
          {category.map((categoryItem) => (
            <Card
              key={categoryItem.id}
              className="cursor-pointer py-9 hover:shadow-lg transition-shadow duration-700"
              onClick={() => handelNavigateListing(categoryItem, "Category")}
            >
              <CardContent className="flex px-5 flex-col items-center justify-between">
                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{categoryItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Separator />

      {/* gym course data */}
      <section className="bg-gray-100 pb-12">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mx-9">
          {homeCourses?.map((courseItem) => (
            <GymCourseTile
              handelGetCourseDetails={handelGetCourseDetails}
              accessories={false}
              key={courseItem?._id}
              course={courseItem}
              isPaymentStart={isPaymentStart}
              handelAddToCart={handelPayment}
            />
          ))}
        </div>
        <CourseDetailsDialgo
          courseDetails={courseDetails}
          accessories={false}
          open={openDiagalog}
          setOpen={setOpenDiagalog}
          handelAddToCart={handelPayment}
        />
      </section>
      <Separator className="bg-gray-400" />
      {/* accessories by category */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Accessories by category
          </h2>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4 mx-9">
          {accessoriesCategoru.map((gymTypeItem) => (
            <Card
              key={gymTypeItem.id}
              className="cursor-pointer py-9 hover:shadow-lg transition-shadow duration-700"
              onClick={() =>
                handelNavigateAccessoriesListing(gymTypeItem, "Category")
              }
            >
              <CardContent className="flex px-5 flex-col items-center justify-between">
                <gymTypeItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{gymTypeItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Accessories data */}
      <section className="bg-gray-100 pb-12">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mx-9">
          {homeAccessories?.map((courseItem) => (
            <GymCourseTile
              handelGetCourseDetails={handelGetAccessoriesDetails}
              key={courseItem?._id}
              accessories={true}
              course={courseItem}
              isPaymentStart={isPaymentStart}
              handelAddToCart={handelAddToCart}
            />
          ))}
        </div>
        <CourseDetailsDialgo
          courseDetails={accessoriesDetails}
          accessories={true}
          open={openDiagalog}
          setOpen={setOpenDiagalog}
          handelAddToCart={handelAddToCart}
        />
      </section>
    </div>
  );
};

export default GymHome;
