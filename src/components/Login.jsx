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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-base-300 dark:via-base-200 dark:to-base-300 px-4 py-8">
      <div className="bg-base-100/90 backdrop-blur-lg border border-base-300 shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition-all hover:shadow-3xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg">
            <span className="text-3xl">👋</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {isLoginForm ? "Welcome Back" : "Join DevTinder"}
          </h2>
          <p className="text-base-content/70 mt-2 text-sm">
            {isLoginForm ? "Sign in to continue your journey" : "Create your account to get started"}
          </p>
        </div>

        <div className="space-y-5">
          {!isLoginForm && (
            <>
              {/* First Name  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="input input-bordered w-full focus:input-primary transition-all"
                />
              </div>
              {/* Last Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="input input-bordered w-full focus:input-primary transition-all"
                />
              </div>
              {/* gender */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Gender</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full focus:select-primary transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="john@example.com"
              className="input input-bordered w-full focus:input-primary transition-all"
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input input-bordered w-full focus:input-primary transition-all"
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="alert alert-error shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              className="btn btn-primary btn-lg w-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          
          {/* Toggle Form */}
          <div className="text-center pt-4">
            <p className="text-base-content/70 text-sm">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLoginForm((value) => !value)}
                className="link link-primary font-semibold ml-2"
              >
                {isLoginForm ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
