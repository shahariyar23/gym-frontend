import {
  HomeIcon,
  LogOut,
  Menu,
  ShoppingCart,
  UserRoundIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { gymViewMenuItem } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import UserCartWraper from "./cartWraper";
import { fetchToCartAccessories } from "@/store/gyn/cartSlice";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const handelNavigate = (currentPath) => {
    sessionStorage.removeItem("filter");
    const currentFilterPath =
      currentPath.id !== "home" &&
      currentPath.id !== "gym" &&
      currentPath.id !== "accessories" &&
      currentPath.id !== "search"
        ? {
            Type: [currentPath.id],
          }
        : JSON.parse(sessionStorage.getItem("filter"))
        ? sessionStorage.removeItem("filter")
        : null;
    sessionStorage.setItem("filter", JSON.stringify(currentFilterPath));
    location.pathname.includes("listing") && currentFilterPath !== null
      ? setSearchParams(new URLSearchParams(`?Type=${currentPath.id}`))
      : navigate(currentPath.path);
  };
  // console.log(JSON.parse(sessionStorage.getItem("filter")));

  return (
    <nav className="flex flex-col lg:flex-row mb-3 lg:mb-0 lg:items-center gap-6">
      {gymViewMenuItem.map((menuItem) => (
        <Label
          className="text-sm font-medium cursor-pointer"
          // to={menuItem.path}
          key={menuItem.id}
          onClick={() => handelNavigate(menuItem)}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HandelRightContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [opneCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.gymCart);

  useEffect(() => {
    dispatch(fetchToCartAccessories({ userId: user?.id }));
  }, [dispatch]);
  return (
    <div>
      {user?.id ? (
        <div className="flex justify-between flex-row lg:items-center gap-4">
          <Sheet open={opneCartSheet} onOpenChange={setOpenCartSheet}>
            <Button
              onClick={() => setOpenCartSheet(true)}
              variant="outline"
              size="icon"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">card for user course</span>
              <Badge
                className={`${
                  user?.id
                    ? "absolute lg:top-4 lg:right-28 left-0 lg:left-auto shadow-2xl"
                    : "absolute lg:top-2 lg:right-36 left-0 lg:left-auto shadow-2xl"
                }`}
              >
                {cartItems?.items?.length ? cartItems?.items?.length : 0}
              </Badge>
            </Button>
            <UserCartWraper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0
                  ? cartItems.items
                  : []
              }
            />
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar>
                <AvatarFallback className="text-lg font-bold bg-black text-white">
                  {user?.userName?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" className="w-auto">
              <DropdownMenuLabel>Logged in {user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigate("/gym/account");
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <UserRoundIcon className="mr-2 h-6 w-6 " />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  dispatch(logoutUser()).then((res) => {
                    if (res?.payload?.success) {
                      toast({
                        title: `Logout`,
                      });
                    }
                  })
                }
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="mr-2 h-6 w-6 " />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button>
          <Link to="/auth/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

const GymHearder = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/gym/dashboard" className="flex items-center gap-2 ">
          <HomeIcon className="h-6 w-6" />
          <span className="font-bold text-xl">Fitness Plus</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle menu bar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <Link to="/gym/dashboard" className="flex items-center gap-2 mb-6">
              <HomeIcon className="h-6 w-6" />
              <span>GYM</span>
            </Link>
            <MenuItems />
            <HandelRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HandelRightContent />
        </div>
      </div>
    </header>
  );
};

export default GymHearder;
