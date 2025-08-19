import React from "react";
import { Outlet } from "react-router-dom";
import GymHearder from "./header";

const GymLayOut = () => {
  return (
    <div className="flex flex-col bg-white w-full">
      {/* common header */}
      <GymHearder />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default GymLayOut;
