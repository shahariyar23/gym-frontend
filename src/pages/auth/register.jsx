import CommonFrom from "@/components/common/from";
import { motion } from "framer-motion";
import { registerFromControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { File, Loader, Lock, Mail, User, Variable } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/common/Input";
import PasswordStrengthMeter from "@/components/common/PasswordStrengthMeter";

const AuthRegister = () => {
  const initialstate = {
    userName: "",
    email: "",
    password: "",
    avatar: "",
  };

  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fromData, setFromData] = useState(initialstate);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const fromData = { userName, email, password };
    dispatch(registerUser(fromData)).then((res) => {
      if (res.payload?.success) {
        toast({
          title: `${res.payload?.message}`,
        });
        navigate("/auth/login");
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
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#909ebe] to-[#6f82bc] text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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

          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-[#909ebe] to-[#6f82bc] text-gray-800 font-bold rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:text-[#6f82bc]  transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-[#6f82bc] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthRegister;
