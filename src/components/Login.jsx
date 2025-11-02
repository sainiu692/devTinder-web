import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Profile from "./Profile";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          gender,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));

      return navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-start pt-[10vh] min-h-screen bg-base-100 px-4">
      <div className="bg-base-300 border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-white">
          {isLoginForm ? "Login" : "Sign Up"} 👋
        </h2>

        <div className="mt-8 space-y-6">
          {!isLoginForm && (
            <>
              {/* First Name  */}
              <div>
                <label className="block mb-1 font-medium text-gray-200">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-base-200 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
              {/* Last Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-200">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-base-200 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
              {/* gender */}
              <div>
                <label className="block mb-1 font-medium text-gray-200">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-base-200 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-base-200 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
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
              className="w-full px-4 py-3 rounded-xl bg-base-200 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
          {/* Login Btn */}
          <div>
            <p className="text-red-500">{error}</p>

            <button
              className="w-full py-3 mt-4 text-lg font-semibold rounded-xl bg-primary hover:bg-primary-focus cursor-pointer transition-all shadow-lg text-white"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          {/* Footer */}
          <div
            className="text-center text-sm text-gray-400"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "Don't have an account?" : "Existing User!!"}
            <a className="text-primary hover:text-primary-focus cursor-pointer">
              {isLoginForm ? "Sign Up" : "Login"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
