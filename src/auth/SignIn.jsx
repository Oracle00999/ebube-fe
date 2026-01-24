// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import logoImage from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ type: "", message: "" });

    try {
      const response = await fetch(
        "https://ebube-be.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setNotification({
          type: "success",
          message: "Login successful! Redirecting...",
        });

        if (data.data?.token) {
          localStorage.setItem("token", data.data.token);
        }

        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          setTimeout(() => {
            if (data.data.user.role === "admin") {
              navigate("/admindashboard");
            } else {
              navigate("/dashboard");
            }
          }, 1500);
        } else {
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }
      } else {
        setNotification({
          type: "error",
          message:
            data.message || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Network error. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-[#7FA6C9] hover:text-[#1EC9E8] transition-colors group"
            >
              <div className="h-8 w-8 rounded-full bg-[#112E4A] flex items-center justify-center mr-2 group-hover:bg-[#163E63] transition-colors">
                <ArrowLeftIcon className="h-4 w-4 text-[#7FA6C9] group-hover:text-[#1EC9E8]" />
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Logo at top */}
          <div className="flex justify-center mb-6">
            <img
              src={logoImage}
              alt="QFS WorldWide Ledger Logo"
              className="h-20 w-auto rounded-full border-4 border-[#112E4A] bg-[#112E4A] p-2"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `
                  <div class="h-20 w-20 rounded-full bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center border-4 border-[#112E4A]">
                    <span class="font-bold text-2xl text-white">Q</span>
                  </div>
                `;
              }}
            />
          </div>

          {/* Login Card */}
          <div className="bg-[#112E4A] rounded-2xl border border-[#163E63] overflow-hidden shadow-lg">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-[#7FA6C9]">Access your account</p>
              </div>

              {/* Notification */}
              {notification.message && (
                <div
                  className={`mb-6 p-4 rounded-xl ${
                    notification.type === "success"
                      ? "bg-gradient-to-r from-[#112E4A] to-[#163E63] text-[#1EC9E8] border border-[#1EC9E8]/30"
                      : "bg-gradient-to-r from-[#112E4A] to-[#163E63] text-[#FF6B6B] border border-[#FF6B6B]/30"
                  }`}
                >
                  <div className="flex items-center">
                    {notification.type === "success" ? (
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 mr-2" />
                    )}
                    <span className="text-sm font-medium">
                      {notification.message}
                    </span>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#D1D9E0] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-[#7FA6C9]" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 bg-[#0B1F3A] border border-[#163E63] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EC9E8] focus:border-transparent transition-all text-white placeholder-[#7FA6C9]"
                      placeholder="user@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-[#D1D9E0]">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#1EC9E8] hover:text-[#2F8CFF] font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-[#7FA6C9]" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-12 w-full px-4 py-3 bg-[#0B1F3A] border border-[#163E63] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EC9E8] focus:border-transparent text-white placeholder-[#7FA6C9]"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7FA6C9] hover:text-[#1EC9E8] transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#1EC9E8] focus:ring-[#1EC9E8] border-[#163E63] rounded bg-[#0B1F3A]"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-[#D1D9E0]"
                  >
                    Remember this device
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                    loading
                      ? "bg-[#163E63] cursor-not-allowed"
                      : "bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] hover:shadow-[0_0_30px_rgba(30,201,232,0.3)]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In to Your Account"
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 pt-8 border-t border-[#163E63]">
                <p className="text-center text-[#7FA6C9] text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-[#1EC9E8] hover:text-[#2F8CFF] transition-colors"
                  >
                    Create account here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
