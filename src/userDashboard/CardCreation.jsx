// components/CardCreation.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import cardImage from "../assets/card-image.png";

const CardCreation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    country: "",
  });

  // Fetch user data and check balance
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://ebube-be.onrender.com/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();

        if (response.ok && data.success) {
          const totalValue = data.data.user.wallet?.totalValue || 0;
          setUserBalance(totalValue);

          // Check if balance is sufficient
          if (totalValue < 3000) {
            setInsufficientBalance(true);
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if insufficient balance
    if (insufficientBalance) {
      return;
    }

    setSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      // Show success notification
      setShowSuccess(true);

      // Clear form
      setFormData({ name: "", address: "", country: "" });
      setSubmitting(false);

      // Hide success notification after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Use your loading animation
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="relative h-16 w-16 mb-4 mx-auto">
            <div
              className="absolute h-full w-full rounded-full border-4"
              style={{ borderColor: "#E1E6EC" }}
            ></div>
            <div
              className="absolute h-full w-full rounded-full border-4 border-transparent animate-spin"
              style={{ borderTopColor: "#2F80ED", animationDuration: "1s" }}
            ></div>
            <div
              className="absolute h-full w-full rounded-full border-4 border-transparent animate-spin"
              style={{
                borderRightColor: "#5DA9E9",
                animationDuration: "1.2s",
                animationDelay: "0.1s",
              }}
            ></div>
            <div
              className="absolute h-8 w-8 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: "#F5F7FA" }}
            ></div>
          </div>
          <p className="text-gray-600 font-medium" style={{ color: "#6B7280" }}>
            Loading card creation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mb-11">
      {/* Success Notification - Top Right */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className="text-emerald-800 border rounded-xl p-4 shadow-lg flex items-center"
            style={{
              backgroundColor: "rgba(107, 207, 61, 0.1)",
              borderColor: "#6BCF3D",
            }}
          >
            <CheckCircleIcon
              className="h-5 w-5 mr-2"
              style={{ color: "#6BCF3D" }}
            />
            <span className="font-medium">
              Card details submitted successfully!
            </span>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/account"
          className="inline-flex items-center transition-colors group"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#2F80ED")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center mr-2 transition-colors group-hover:scale-105"
            style={{ backgroundColor: "#F5F7FA" }}
          >
            <ArrowLeftIcon className="h-4 w-4" style={{ color: "#6B7280" }} />
          </div>
          <span className="font-medium">Back to Account</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "#1F2D3D" }}
        >
          Create Your QFS Ledger Card
        </h1>
      </div>

      {/* Insufficient Balance Warning */}
      {insufficientBalance && (
        <div
          className="mb-8 p-4 rounded-xl border"
          style={{
            backgroundColor: "rgba(231, 76, 60, 0.1)",
            borderColor: "#E74C3C",
          }}
        >
          <div className="flex items-start">
            <ExclamationTriangleIcon
              className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
              style={{ color: "#E74C3C" }}
            />
            <div>
              <h3 className="font-bold mb-1" style={{ color: "#E74C3C" }}>
                Insufficient Balance
              </h3>
              <p className="text-sm" style={{ color: "#E74C3C" }}>
                You need a minimum balance of $3,000 to create a QFS Ledger
                Card. Your current balance is ${userBalance.toLocaleString()}.
                Please deposit more funds and try again.
              </p>
              <Link
                to="/deposit"
                className="inline-block mt-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor: "#2F80ED",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3B82F6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2F80ED")
                }
              >
                Go to Deposit
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Card Image at the Top - Standing Alone */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <img
              src={cardImage}
              alt="QFS Card Preview"
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
                const parent = e.target.parentElement;
                parent.innerHTML = `
                  <div class="w-full aspect-[1.6] rounded-lg flex flex-col items-center justify-center text-white"
                       style="background: linear-gradient(135deg, #2F80ED, #5DA9E9)">
                    <div class="text-center p-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-16 w-16 mx-auto mb-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                      </svg>
                      <span class="font-bold text-2xl block mb-2">QFS LEDGER CARD</span>
                      <span class="opacity-90 text-sm">Quantum Secure Payment Card</span>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </div>

      {/* Form Below */}
      <div
        className="rounded-2xl border shadow-lg p-8"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#1F2D3D" }}>
            Card Details Form
          </h2>
          <p className="text-gray-600" style={{ color: "#6B7280" }}>
            Enter your information to personalize your card
          </p>

          {/* Balance Display */}
          <div
            className="mt-4 p-3 rounded-lg"
            style={{ backgroundColor: "#F5F7FA" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "#6B7280" }}>
                Current Balance:
              </span>
              <span
                className={`font-bold ${insufficientBalance ? "text-red-600" : "text-green-600"}`}
              >
                ${userBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm" style={{ color: "#6B7280" }}>
                Minimum Required:
              </span>
              <span
                className="font-bold"
                style={{ color: insufficientBalance ? "#E74C3C" : "#6BCF3D" }}
              >
                $3,000
              </span>
            </div>
            {insufficientBalance && (
              <div className="mt-2 text-xs" style={{ color: "#E74C3C" }}>
                ❌ Insufficient balance for card creation
              </div>
            )}
            {!insufficientBalance && (
              <div className="mt-2 text-xs" style={{ color: "#6BCF3D" }}>
                ✓ Balance sufficient for card creation
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label
              className="block text-lg font-medium mb-3"
              style={{ color: "#1F2D3D" }}
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-6 w-6" style={{ color: "#8FA6BF" }} />
              </div>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={insufficientBalance}
                className="pl-12 w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: "#E1E6EC",
                  color: insufficientBalance ? "#8FA6BF" : "#1F2D3D",
                  backgroundColor: insufficientBalance ? "#F5F7FA" : "#FFFFFF",
                }}
                onFocus={(e) => {
                  if (!insufficientBalance) {
                    e.target.style.borderColor = "#2F80ED";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(47, 128, 237, 0.2)";
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E1E6EC";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label
              className="block text-lg font-medium mb-3"
              style={{ color: "#1F2D3D" }}
            >
              Address
            </label>
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                <MapPinIcon className="h-6 w-6" style={{ color: "#8FA6BF" }} />
              </div>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                disabled={insufficientBalance}
                rows="4"
                className="pl-12 w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                style={{
                  borderColor: "#E1E6EC",
                  color: insufficientBalance ? "#8FA6BF" : "#1F2D3D",
                  backgroundColor: insufficientBalance ? "#F5F7FA" : "#FFFFFF",
                }}
                onFocus={(e) => {
                  if (!insufficientBalance) {
                    e.target.style.borderColor = "#2F80ED";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(47, 128, 237, 0.2)";
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E1E6EC";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your complete address"
              />
            </div>
          </div>

          {/* Country Field */}
          <div>
            <label
              className="block text-lg font-medium mb-3"
              style={{ color: "#1F2D3D" }}
            >
              Country
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <GlobeAltIcon
                  className="h-6 w-6"
                  style={{ color: "#8FA6BF" }}
                />
              </div>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                disabled={insufficientBalance}
                className="pl-12 w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none"
                style={{
                  borderColor: "#E1E6EC",
                  color: insufficientBalance ? "#8FA6BF" : "#1F2D3D",
                  backgroundColor: insufficientBalance ? "#F5F7FA" : "#FFFFFF",
                }}
                onFocus={(e) => {
                  if (!insufficientBalance) {
                    e.target.style.borderColor = "#2F80ED";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(47, 128, 237, 0.2)";
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E1E6EC";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="">Select your country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || insufficientBalance}
            className={`w-full py-5 px-6 text-lg rounded-xl font-bold text-white transition-all duration-300 mt-8 ${
              submitting || insufficientBalance
                ? "cursor-not-allowed"
                : "hover:opacity-90 shadow-lg hover:shadow-xl"
            }`}
            style={{
              backgroundColor:
                submitting || insufficientBalance
                  ? "rgba(47, 128, 237, 0.5)"
                  : "#2F80ED",
            }}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <div
                  className="h-6 w-6 border-2 border-t-transparent rounded-full animate-spin mr-3"
                  style={{
                    borderColor: "#FFFFFF",
                    borderTopColor: "transparent",
                  }}
                ></div>
                Submitting...
              </div>
            ) : insufficientBalance ? (
              "Minimum $3,000 Required"
            ) : (
              "Create Quantum-Secure Card"
            )}
          </button>
        </form>

        {/* Security Note */}
        <div
          className="mt-10 pt-8 border-t mb-7"
          style={{ borderColor: "#E1E6EC" }}
        >
          <div className="flex items-start">
            <ShieldCheckIcon
              className="h-6 w-6 mr-3 flex-shrink-0 mt-1"
              style={{ color: "#2F80ED" }}
            />
            <div>
              <h3 className="font-bold mb-2" style={{ color: "#1F2D3D" }}>
                Security Guarantee
              </h3>
              <p className="" style={{ color: "#6B7280" }}>
                All your card details are protected with quantum-resistant
                encryption. Your personal information is securely encrypted and
                will only be used for card issuance and verification purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation for slide-in notification */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CardCreation;
