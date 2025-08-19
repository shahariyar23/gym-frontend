import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const AdminHeader = ({ setOpenSideBar }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);

  const handelLogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res?.payload?.success) {
        toast({
          title: `${res?.payload?.message}`,
        });
      }
    });
  };

  return (
    <header className="flex items-center border-b justify-between px-4 py-2">
      <h1 className="w-full text-lg font-extrabold hidden lg:block">
        {user?.userName}
      </h1>
      <p className="w-full text-lg font-bold hidden lg:block">
        Role: <span className="uppercase text-blue-800 ">{user?.role}</span>
      </p>
      <Button
        onClick={() => setOpenSideBar(true)}
        className="lg:hidden sm:blok"
      >
        <Menu />
        <span className="sr-only">Toggle</span>
      </Button>
      <div onClick={() => handelLogout()} className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 px-4 text-sm py-3 rounded-md shadow">
          <LogOut />
          <span>loguot</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
