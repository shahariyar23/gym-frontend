import {
  BaggageClaim,
  BookOpenCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  Slack,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

const adminSidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "gymCouser",
    label: "Gym Course",
    path: "/admin/course",
    icon: <BookOpenCheck />,
  },
  {
    id: "oders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BaggageClaim />,
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/admin/accessories",
    icon: <Slack />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenu.map((menuItem) => (
        <div
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex text-lg items-center cursor-pointer gap-3 mt-3"
          key={menuItem.id}
        >
          {menuItem.icon}
          <span className="font-bold">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-65">
          <div className="flex flex-col h-full gap-3">
            <SheetHeader className="flex flex-row mt-5 border-b items-center gap-2">
              <ChartNoAxesCombined className="w-8 h-8" />
              <span className="text-xl font-extrabold">Admin Panel</span>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined className="w-8 h-8" />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
