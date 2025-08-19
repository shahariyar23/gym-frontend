import CommonFrom from "@/components/common/from";
import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import { loginFromControls } from "@/config";
import { toast, useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "@/components/common/Input";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const fromData = { email, password };
    dispatch(loginUser(fromData)).then((res) => {
      if (res?.payload?.success) {
        toast({
          title: `${res?.payload?.message}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: `${res?.payload?.message}`,
        });
      }
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#909ebe] to-[#6f82bc] text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-[#6f82bc] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#909ebe] to-[#6f82bc] text-gray-800 font-bold rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:text-[#6f82bc]  transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-start text-gray-400">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-[#6f82bc] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthLogin;
