import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Dark Glass Container */}
      <div className="w-96 p-8 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>

        <form className="space-y-4">
          {/* Username */}
          <div>
            <label className="label">
              <span className="text-gray-200 font-medium">Username</span>
            </label>
            <input
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
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-black/30 text-white placeholder-gray-400 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Log In
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-300 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-500 hover:underline transition-all"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
