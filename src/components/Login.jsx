import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("ujjwal@gmail.com");
  const [password, setPassword] = useState("Ujjwal@12345");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-sm text-white">
        <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Welcome Back 👋
        </h2>

        <div className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Login Btn */}
          <button
            className="w-full py-3 mt-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.03] transition-all shadow-lg"
            onClick={handleLogin}
          >
            Login
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a className="text-blue-400 hover:text-blue-300 cursor-pointer">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
