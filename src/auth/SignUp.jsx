// pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  UserIcon,
  KeyIcon,
  PhoneIcon,
  GlobeAltIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import logoImage from "../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
  });

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = (strength) => {
    if (strength < 25) return "bg-[#FF6B6B]";
    if (strength < 50) return "bg-[#F5B400]";
    if (strength < 75) return "bg-[#1EC9E8]";
    return "bg-[#2F8CFF]";
  };

  const getStrengthText = (strength) => {
    if (strength < 25) return "Very Weak";
    if (strength < 50) return "Weak";
    if (strength < 75) return "Fair";
    if (strength < 100) return "Strong";
    return "Very Strong";
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      country: "",
    };

    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation - made less strict
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (formData.phone.trim().length < 5) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Country validation - FIXED: Check for empty string
    if (!formData.country || formData.country === "") {
      newErrors.country = "Country is required";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (passwordStrength < 50) {
      newErrors.password =
        "Password is too weak. Please use a stronger password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please fill all required fields correctly",
      });
      return;
    }

    setLoading(true);
    setNotification({ type: "", message: "" });

    try {
      // Prepare data for backend - only send fields that backend expects
      const submissionData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        // Only include phone and country if your backend supports them
        phone: formData.phone,
        country: formData.country,
      };

      const response = await fetch(
        "https://ebube-be.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          message: "Account created successfully! Redirecting to login...",
        });

        // Clear form
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phone: "",
          country: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setNotification({
          type: "error",
          message: data.message || "Registration failed. Please try again.",
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

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    { label: "Contains number", met: /[0-9]/.test(formData.password) },
    {
      label: "Contains special character",
      met: /[^A-Za-z0-9]/.test(formData.password),
    },
  ];

  // List of countries for dropdown
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
    "Mexico",
    "South Africa",
    "United Arab Emirates",
    "Singapore",
    "Switzerland",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "New Zealand",
    "South Korea",
    "Italy",
    "Spain",
    "Portugal",
    "Ireland",
    "Belgium",
    "Austria",
    "Poland",
    "Russia",
    "Saudi Arabia",
    "Turkey",
    "Israel",
    "Egypt",
    "Nigeria",
    "Kenya",
    "Ghana",
    "Argentina",
    "Chile",
    "Colombia",
    "Peru",
    "Venezuela",
    "Costa Rica",
    "Panama",
    "Dominican Republic",
    "Jamaica",
    "Bahamas",
    "Barbados",
    "Trinidad and Tobago",
    "Qatar",
    "Kuwait",
    "Oman",
    "Bahrain",
    "Jordan",
    "Lebanon",
    "Malaysia",
    "Thailand",
    "Vietnam",
    "Philippines",
    "Indonesia",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Nepal",
    "Bhutan",
    "Maldives",
    "Mauritius",
    "Seychelles",
    "Other",
  ];

  // Check if all required fields are filled (for button state)
  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.country &&
      formData.password.length >= 8 &&
      passwordStrength >= 50
    );
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

          {/* Signup Card */}
          <div className="bg-[#112E4A] rounded-2xl border border-[#163E63] overflow-hidden shadow-lg">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Join Web3Global Ledger
                </h2>
                <p className="text-[#7FA6C9]">Create your account</p>
                <p className="text-xs text-[#7FA6C9] mt-2">
                  All fields are required
                </p>
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
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#D1D9E0] mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon
                          className={`h-5 w-5 ${
                            errors.firstName
                              ? "text-[#FF6B6B]"
                              : "text-[#7FA6C9]"
                          }`}
                        />
                      </div>
                      <input
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-3 bg-[#0B1F3A] border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-white placeholder-[#7FA6C9] ${
                          errors.firstName
                            ? "border-[#FF6B6B] focus:ring-[#FF6B6B]"
                            : "border-[#163E63] focus:ring-[#1EC9E8]"
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-[#FF6B6B] mt-1 flex items-center">
                        <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#D1D9E0] mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon
                          className={`h-5 w-5 ${
                            errors.lastName
                              ? "text-[#FF6B6B]"
                              : "text-[#7FA6C9]"
                          }`}
                        />
                      </div>
                      <input
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-3 bg-[#0B1F3A] border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-white placeholder-[#7FA6C9] ${
                          errors.lastName
                            ? "border-[#FF6B6B] focus:ring-[#FF6B6B]"
                            : "border-[#163E63] focus:ring-[#1EC9E8]"
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-xs text-[#FF6B6B] mt-1 flex items-center">
                        <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#D1D9E0] mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon
                        className={`h-5 w-5 ${
                          errors.email ? "text-[#FF6B6B]" : "text-[#7FA6C9]"
                        }`}
                      />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 bg-[#0B1F3A] border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-white placeholder-[#7FA6C9] ${
                        errors.email
                          ? "border-[#FF6B6B] focus:ring-[#FF6B6B]"
                          : "border-[#163E63] focus:ring-[#1EC9E8]"
                      }`}
                      placeholder="user@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#FF6B6B] mt-1 flex items-center">
                      <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-[#D1D9E0] mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon
                        className={`h-5 w-5 ${
                          errors.phone ? "text-[#FF6B6B]" : "text-[#7FA6C9]"
                        }`}
                      />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 bg-[#0B1F3A] border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-white placeholder-[#7FA6C9] ${
                        errors.phone
                          ? "border-[#FF6B6B] focus:ring-[#FF6B6B]"
                          : "border-[#163E63] focus:ring-[#1EC9E8]"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-[#FF6B6B] mt-1 flex items-center">
                      <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="text-xs text-[#7FA6C9] mt-1">
                    Include country code for international numbers
                  </p>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-[#D1D9E0] mb-2">
                    Country *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GlobeAltIcon
                        className={`h-5 w-5 ${
                          errors.country ? "text-[#FF6B6B]" : "text-[#7FA6C9]"
                        }`}
                      />
                    </div>
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 bg-[#0B1F3A] border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-white appearance-none ${
                        errors.country
                          ? "border-[#FF6B6B] focus:ring-[#FF6B6B]"
                          : "border-[#163E63] focus:ring-[#1EC9E8]"
                      }`}
                    >
                      <option value="" className="bg-[#0B1F3A] text-[#7FA6C9]">
                        Select your country
                      </option>
                      {countries.map((country) => (
                        <option
                          key={country}
                          value={country}
                          className="bg-[#0B1F3A] text-white"
                        >
                          {country}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className={`h-5 w-5 ${
                          errors.country ? "text-[#FF6B6B]" : "text-[#7FA6C9]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.country && (
                    <p className="text-xs text-[#FF6B6B] mt-1 flex items-center">
                      <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* Password with Strength Meter */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-[#D1D9E0]">
                      Password *
                    </label>
                    <div className="flex items-center">
                      <div className="h-2 w-24 rounded-full bg-[#0B1F3A] mr-2 overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor(
                            passwordStrength,
                          )} transition-all duration-300`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength < 50
                            ? "text-[#FF6B6B]"
                            : passwordStrength < 75
                              ? "text-[#F5B400]"
                              : "text-[#2F8CFF]"
                        }`}
                      >
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                  </div>

                  {/* Password Input with Toggle */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyIcon
                        className={`h-5 w-5 ${
                          errors.password ? "text-[#FF6B6B]" : "text-[#7FA6C9]"
                        }`}
                      />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 pr-12 w-full px-4 py-3 bg-[#0B1F3A] border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-[#7FA6C9] ${
                        errors.password
                          ? "border-[#FF6B6B] focus:ring-[#FF6B6B]"
                          : "border-[#163E63] focus:ring-[#1EC9E8]"
                      }`}
                      placeholder="Create a strong password"
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
                  {errors.password && (
                    <p className="text-xs text-[#FF6B6B] mt-1 flex items-center">
                      <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                      {errors.password}
                    </p>
                  )}

                  {/* Password Requirements */}
                  <div className="mt-4 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center">
                        {req.met ? (
                          <CheckCircleIcon className="h-4 w-4 text-[#1EC9E8] mr-2" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-[#163E63] mr-2"></div>
                        )}
                        <span
                          className={`text-xs ${
                            req.met
                              ? "text-[#1EC9E8] font-medium"
                              : "text-[#7FA6C9]"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !isFormValid()}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                    loading || !isFormValid()
                      ? "bg-[#163E63] cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] hover:shadow-[0_0_30px_rgba(30,201,232,0.3)]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Creating Your Account...
                    </div>
                  ) : (
                    "Create Your Account"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-8 border-t border-[#163E63]">
                <p className="text-center text-[#7FA6C9] text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-[#1EC9E8] hover:text-[#2F8CFF] transition-colors"
                  >
                    Sign in here
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

export default Signup;
