import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";

const AdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* side bar */}
      <AdminSideBar open={openSideBar} setOpen={setOpenSideBar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpenSideBar={setOpenSideBar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
