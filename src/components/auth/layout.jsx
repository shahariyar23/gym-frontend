import React from "react";
import { Outlet } from "react-router-dom";
import FloatingShape from "../common/FloatingShape";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br
    from-[#0f1729a6] via-[#121c32] to-[#060b18] w-full flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-white"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-gray-300"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-white"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
