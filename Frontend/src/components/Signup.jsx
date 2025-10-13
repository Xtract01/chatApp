import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { fullname, username, password, confirmPassword, gender } = user;

    // Frontend validation
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      alert("Please fill in all fields.");
      return;
    }
    // Handle form submission logic here
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        navigate("/login");
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || "An error occurred. Please try again."
      );
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
        alert(`Error: ${JSON.stringify(err.response.data)}`);
      } else {
        console.error("Error:", err.message);
      }
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Dark Glass Container */}
      <div className="w-96 p-8 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Signup
        </h1>

        <form onSubmit={onSubmit} className="space-y-3">
          {/* Full Name */}
          <div>
            <label className="label">
              <span className="text-gray-200 font-medium">Full Name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered w-full bg-black/30 text-white placeholder-gray-400 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Username */}
          <div>
            <label className="label">
              <span className="text-gray-200 font-medium">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full bg-black/30 text-white placeholder-gray-400 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="text-gray-200 font-medium">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-black/30 text-white placeholder-gray-400 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="text-gray-200 font-medium">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirm your password"
              className="input input-bordered w-full bg-black/30 text-white placeholder-gray-400 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gender */}
          <div className="mt-4">
            <span className="text-gray-200 font-medium">Gender</span>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center text-gray-200">
                <input
                  type="radio"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckBox("male")}
                  name="gender"
                  value="male"
                  className="radio radio-sm mr-2"
                />
                Male
              </label>
              <label className="flex items-center text-gray-200">
                <input
                  type="radio"
                  checked={user.gender === "female"}
                  name="gender"
                  value="female"
                  className="radio radio-sm mr-2"
                  onChange={() => handleCheckBox("female")}
                />
                Female
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 hover:underline transition-all"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
