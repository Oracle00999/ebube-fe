// pages/Account.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import CardLogo from "../assets/cardlogo1.jpg";

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
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
        setUserData(data.data.user);
        setError("");
      } else {
        setError(data.message || "Failed to fetch account data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getKycStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "rgba(107, 207, 61, 0.1)",
              color: "#6BCF3D",
            }}
          >
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            KYC Verified
          </div>
        );
      case "pending":
        return (
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "rgba(247, 147, 26, 0.1)",
              color: "#F7931A",
            }}
          >
            <ClockIcon className="h-4 w-4 mr-1.5" />
            KYC Pending
          </div>
        );
      default:
        return (
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "rgba(231, 76, 60, 0.1)",
              color: "#E74C3C",
            }}
          >
            <XCircleIcon className="h-4 w-4 mr-1.5" />
            KYC Required
          </div>
        );
    }
  };

  const getKycIconColor = (status) => {
    switch (status) {
      case "verified":
        return "#6BCF3D";
      case "pending":
        return "#F7931A";
      default:
        return "#E74C3C";
    }
  };

  const getKycBackgroundColor = (status) => {
    switch (status) {
      case "verified":
        return "rgba(107, 207, 61, 0.1)";
      case "pending":
        return "rgba(247, 147, 26, 0.1)";
      default:
        return "rgba(231, 76, 60, 0.1)";
    }
  };

  const getKycActionText = (status) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending Review";
      default:
        return "Verify Now";
    }
  };

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
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#1F2D3D" }}>
          My Account
        </h1>
        <p className="text-gray-600 mt-2" style={{ color: "#6B7280" }}>
          Manage your wallet and account settings
        </p>
      </div>

      {/* User Profile Card */}
      <div
        className="rounded-2xl border shadow-xl overflow-hidden mb-8 bg-cover bg-center"
        style={{
          backgroundColor: "#1F2D3D",
          borderColor: "#2F80ED",
          backgroundImage: `url(${CardLogo})`,
        }}
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                {userData?.fullName || "User"}
              </h2>
              <p className="mt-1 text-lg" style={{ color: "#8FA6BF" }}>
                {userData?.email || "user@example.com"}
              </p>
              <div className="mt-4">
                {getKycStatusBadge(userData?.kycStatus)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Actions - Horizontal Scroll on Mobile */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "#1F2D3D" }}>
          Wallet Actions
        </h2>

        {/* Horizontal Container */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-4 min-w-min">
            {/* Send */}
            <Link
              to="/deposit"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                >
                  <ArrowUpTrayIcon
                    className="h-7 w-7"
                    style={{ color: "#2F80ED" }}
                  />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Send Funds
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  Deposit to your wallet
                </p>
              </div>
            </Link>

            {/* Receive */}
            <Link
              to="/withdraw"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                >
                  <ArrowDownTrayIcon
                    className="h-7 w-7"
                    style={{ color: "#2F80ED" }}
                  />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Withdraw Funds
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  Withdraw to external wallet
                </p>
              </div>
            </Link>

            {/* card */}
            <Link
              to="/card-creation"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                >
                  <CreditCardIcon
                    className="h-7 w-7"
                    style={{ color: "#2F80ED" }}
                  />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Create Card
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  {" "}
                  Create a new card
                </p>
              </div>
            </Link>

            {/* Buy & Sell */}
            <a
              href="https://www.moonpay.com/buy/xlm"
              target="_blank"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                >
                  <ShoppingCartIcon
                    className="h-7 w-7"
                    style={{ color: "#2F80ED" }}
                  />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Buy & Sell Crypto
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  Trade cryptocurrencies
                </p>
              </div>
            </a>

            {/* Swap */}
            <Link
              to="/swap"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                >
                  <ArrowsRightLeftIcon
                    className="h-7 w-7"
                    style={{ color: "#2F80ED" }}
                  />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Swap
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  Exchange between cryptos
                </p>
              </div>
            </Link>

            {/* History */}
            <Link
              to="/history"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                >
                  <ClockIcon className="h-7 w-7" style={{ color: "#2F80ED" }} />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  History
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  View Transaction History
                </p>
              </div>
            </Link>

            {/* Link Wallet */}
            <Link
              to="/link"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                >
                  <Cog6ToothIcon
                    className="h-7 w-7"
                    style={{ color: "#2F80ED" }}
                  />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Link Wallet
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  Connect external wallet
                </p>
              </div>
            </Link>

            {/* KYC Verification */}
            <Link
              to="/kyc-verify"
              className="rounded-xl border p-5 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2F80ED")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E1E6EC")
              }
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:scale-105"
                  style={{
                    backgroundColor: getKycBackgroundColor(userData?.kycStatus),
                  }}
                >
                  <ShieldCheckIcon
                    className="h-7 w-7"
                    style={{ color: getKycIconColor(userData?.kycStatus) }}
                  />
                </div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  KYC Verification
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  {getKycActionText(userData?.kycStatus)}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div
        className="rounded-xl border shadow-sm overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div
          className="px-6 py-4 border-b"
          style={{
            backgroundColor: "#F5F7FA",
            borderColor: "#E1E6EC",
          }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "#1F2D3D" }}>
            Account Information
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Member Since */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#6B7280" }}
              >
                Member Since
              </label>
              <div
                className="text-sm p-3 rounded-lg border"
                style={{
                  backgroundColor: "#F5F7FA",
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
              >
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </div>
            </div>

            {/* Last Login */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#6B7280" }}
              >
                Last Login
              </label>
              <div
                className="text-sm p-3 rounded-lg border"
                style={{
                  backgroundColor: "#F5F7FA",
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
              >
                {userData?.lastLogin
                  ? new Date(userData.lastLogin).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </div>
            </div>

            {/* Account Status */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#6B7280" }}
              >
                Account Status
              </label>
              <div
                className="p-3 rounded-lg border"
                style={{
                  backgroundColor: "#F5F7FA",
                  borderColor: "#E1E6EC",
                }}
              >
                {userData?.isActive ? (
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: "rgba(107, 207, 61, 0.1)",
                      color: "#6BCF3D",
                    }}
                  >
                    <div
                      className="h-2 w-2 rounded-full mr-2"
                      style={{ backgroundColor: "#6BCF3D" }}
                    ></div>
                    Active
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: "rgba(231, 76, 60, 0.1)",
                      color: "#E74C3C",
                    }}
                  >
                    <div
                      className="h-2 w-2 rounded-full mr-2"
                      style={{ backgroundColor: "#E74C3C" }}
                    ></div>
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* KYC Status Detail */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#6B7280" }}
              >
                KYC Status
              </label>
              <div
                className="p-3 rounded-lg border"
                style={{
                  backgroundColor: "#F5F7FA",
                  borderColor: "#E1E6EC",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "#1F2D3D" }}>
                    {userData?.kycStatus === "verified"
                      ? "Fully Verified"
                      : userData?.kycStatus === "pending"
                        ? "Under Review"
                        : "Not Verified"}
                  </span>
                  {userData?.kycStatus === "verified" &&
                    userData?.kycVerifiedAt && (
                      <span className="text-xs" style={{ color: "#6B7280" }}>
                        Verified:{" "}
                        {new Date(userData.kycVerifiedAt).toLocaleDateString()}
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div
            className="mt-8 pt-6 border-t mb-9"
            style={{ borderColor: "#E1E6EC" }}
          >
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Need help with your account?
            </p>
            <button
              className="mt-2 w-full py-2 text-sm rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: "#F5F7FA",
                color: "#1F2D3D",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#E1E6EC")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#F5F7FA")
              }
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
