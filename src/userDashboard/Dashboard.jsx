// pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  PlusCircleIcon,
  CheckBadgeIcon,
  ClockIcon,
  XCircleIcon,
  BellIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Cardlogo from "../assets/web3image.jpg";
import BtcLogo from "../assets/btc.svg";
import EthLogo from "../assets/eth.svg";
import UsdtLogo from "../assets/usdt.svg";
import BnbLogo from "../assets/bnb.svg";
import SolLogo from "../assets/sol.svg";
import DogeLogo from "../assets/doge.svg";
import XrpLogo from "../assets/xrp.svg";
import XlmLogo from "../assets/xlm.svg";
import TrxLogo from "../assets/trx.svg";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [tokenPrices, setTokenPrices] = useState({});
  const [tokenAmounts, setTokenAmounts] = useState({});
  const [initialized, setInitialized] = useState(false);

  // Token IDs for CoinGecko API
  const tokenIds = {
    bitcoin: "bitcoin",
    ethereum: "ethereum",
    tether: "tether",
    "binance-coin": "binancecoin",
    solana: "solana",
    dogecoin: "dogecoin",
    ripple: "ripple",
    stellar: "stellar",
    tron: "tron",
  };

  // Token display names with symbols
  const tokenDisplayNames = {
    bitcoin: "Bitcoin (BTC)",
    ethereum: "Ethereum (ETH)",
    tether: "Tether (USDT)",
    "binance-coin": "Binance Coin (BNB)",
    solana: "Solana (SOL)",
    dogecoin: "Dogecoin (DOGE)",
    ripple: "Ripple (XRP)",
    stellar: "Stellar (XLM)",
    tron: "Tron (TRX)",
  };

  // Token symbols
  const tokenSymbols = {
    bitcoin: "BTC",
    ethereum: "ETH",
    tether: "USDT",
    "binance-coin": "BNB",
    solana: "SOL",
    dogecoin: "DOGE",
    ripple: "XRP",
    stellar: "XLM",
    tron: "TRX",
  };

  // Only one notification - Welcome message
  const notifications = [
    { id: 1, message: "Welcome to QFS Ledger!", read: false },
  ];

  // Token logo mapping - LOCAL ONLY
  const tokenLogos = {
    bitcoin: BtcLogo,
    ethereum: EthLogo,
    tether: UsdtLogo,
    "binance-coin": BnbLogo,
    solana: SolLogo,
    dogecoin: DogeLogo,
    ripple: XrpLogo,
    stellar: XlmLogo,
    tron: TrxLogo,
  };

  // Fetch prices every 5 hours (5 * 60 * 60 * 1000 = 18,000,000 ms)
  const PRICE_FETCH_INTERVAL = 5 * 60 * 60 * 1000;

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(fetchUserData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userData?.wallet?.balances && !initialized) {
      // Fetch initial prices and calculate token amounts ONCE
      fetchTokenPrices(true);
      setInitialized(true);
    }

    if (initialized) {
      // Set up 5-hour price refresh
      const priceInterval = setInterval(fetchTokenPrices, PRICE_FETCH_INTERVAL);
      return () => clearInterval(priceInterval);
    }
  }, [userData, initialized]);

  const fetchTokenPrices = async (isInitial = false) => {
    try {
      const tokenIdList = Object.values(tokenIds).join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIdList}&vs_currencies=usd`,
      );

      if (response.ok) {
        const data = await response.json();

        const prices = {};
        Object.keys(tokenIds).forEach((tokenKey) => {
          const id = tokenIds[tokenKey];
          if (data[id]) {
            prices[tokenKey] = data[id].usd;
          }
        });

        setTokenPrices((prev) => {
          const newPrices = { ...prev, ...prices };

          // If initial fetch, calculate token amounts
          if (isInitial && userData?.wallet?.balances) {
            calculateInitialTokenAmounts(newPrices);
          }

          return newPrices;
        });
      }
    } catch (error) {
      console.error("Price fetch failed:", error);
      // Silent fail - continue using existing prices
    }
  };

  const calculateInitialTokenAmounts = (prices) => {
    if (!userData?.wallet?.balances) return;

    const amounts = {};
    Object.keys(userData.wallet.balances).forEach((token) => {
      const usdBalance = userData.wallet.balances[token];
      const price = prices[token];

      if (price && price > 0) {
        // Calculate token amount: USD balance / price
        const amount = usdBalance / price;
        amounts[token] = amount;
      } else {
        amounts[token] = 0;
      }
    });

    setTokenAmounts(amounts);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
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
        setError(null);
      } else {
        setError(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatTokenAmount = (amount, token) => {
    if (!amount || amount === 0) return "0";

    const amountNum = parseFloat(amount);

    // Different precision for different tokens
    const precisionRules = {
      bitcoin: 6,
      ethereum: 4,
      tether: 2,
      "binance-coin": 4,
      solana: 2,
      dogecoin: 0,
      ripple: 0,
      stellar: 0,
      tron: 0,
    };

    const precision = precisionRules[token] || 4;
    return amountNum.toFixed(precision);
  };

  // NEW FUNCTION: Get static token display (calculated once)
  const getStaticTokenDisplay = (token, usdBalance) => {
    // Get the USD value directly from backend (never recalculated)
    const backendUsdValue = usdBalance || 0;

    // Get the price that was used for initial calculation
    const initialPrice = tokenPrices[token];

    // Calculate token amount once: Token amount = Backend USD value ÷ Initial price
    const tokenAmount = initialPrice > 0 ? backendUsdValue / initialPrice : 0;

    return {
      tokenAmount: formatTokenAmount(tokenAmount, token),
      usdValue: formatCurrency(backendUsdValue),
      price: formatCurrency(initialPrice),
    };
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
            <CheckBadgeIcon className="h-4 w-4 mr-1.5" />
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

  // Calculate total balance using backend USD values (static)
  const calculateTotalBalance = () => {
    if (!userData?.wallet?.balances) return 0;

    // Sum up all USD values from backend (static, never recalculated)
    return Object.values(userData.wallet.balances).reduce(
      (sum, val) => sum + val,
      0,
    );
  };

  const totalBalance = calculateTotalBalance();

  // Sort tokens by backend USD value (static)
  const sortedTokens = userData?.wallet?.balances
    ? Object.entries(userData.wallet.balances)
        .map(([token, usdBalance]) => {
          const display = getStaticTokenDisplay(token, usdBalance);
          return {
            token,
            usdBalance, // Direct from backend
            display,
          };
        })
        .sort((a, b) => b.usdBalance - a.usdBalance) // Sort by backend USD value
    : [];

  return (
    <>
      {/* User Card - Updated Colors */}
      <div
        className="border rounded-2xl p-6 mb-9 shadow-xl relative"
        style={{
          backgroundColor: "#1F2D3D",
          borderColor: "#2F80ED",
          backgroundImage: `url(${Cardlogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Notification Icon - Top Right */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-10 w-10 rounded-full flex items-center justify-center hover:opacity-90 transition-colors border"
              style={{
                backgroundColor: "rgba(47, 128, 237, 0.7)",
                borderColor: "#3B82F6",
              }}
            >
              <BellIcon className="h-5 w-5" style={{ color: "#FFFFFF" }} />
              {notifications.some((n) => !n.read) && (
                <span
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2"
                  style={{
                    backgroundColor: "#E74C3C",
                    borderColor: "#1F2D3D",
                  }}
                ></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-xl shadow-xl border z-50"
                style={{
                  backgroundColor: "#1F2D3D",
                  borderColor: "#2F80ED",
                }}
              >
                <div
                  className="px-4 py-3 border-b"
                  style={{ borderColor: "#2F80ED" }}
                >
                  <h3 className="font-semibold" style={{ color: "#FFFFFF" }}>
                    Welcome
                  </h3>
                  <p className="text-xs" style={{ color: "#8FA6BF" }}>
                    New notification
                  </p>
                </div>
                <div className="p-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-3 py-3 rounded-lg border"
                      style={{
                        backgroundColor: "rgba(47, 128, 237, 0.1)",
                        borderColor: "rgba(47, 128, 237, 0.3)",
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm" style={{ color: "#F5F7FA" }}>
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: "#6BCF3D" }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="px-4 py-3 border-t"
                  style={{ borderColor: "#2F80ED" }}
                >
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full text-center text-sm font-medium"
                    style={{ color: "#8FA6BF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FFFFFF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#8FA6BF")
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-start mb-8">
          <div className="flex items-center mb-4 md:mb-0"></div>

          <div className="text-left">
            <div className="text-sm mb-1" style={{ color: "#8FA6BF" }}>
              Total Balance
            </div>
            <div
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              {formatCurrency(totalBalance)}
            </div>
            <div className="text-sm mt-1" style={{ color: "#2F80ED" }}>
              Quantum-Secured • Live
            </div>
          </div>
        </div>

        {/* Wallet Action Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-8">
          <Link
            to="/deposit"
            className="flex flex-col items-center justify-center p-4 backdrop-blur-sm rounded-xl border transition-all group"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "#2F80ED",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#5DA9E9";
              e.currentTarget.style.backgroundColor = "rgba(93, 169, 233, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2F80ED";
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors group-hover:scale-105"
              style={{ backgroundColor: "rgba(47, 128, 237, 0.7)" }}
            >
              <ArrowUpTrayIcon
                className="h-5 w-5"
                style={{ color: "#FFFFFF" }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>
              Deposit
            </span>
          </Link>

          <Link
            to="/withdraw"
            className="flex flex-col items-center justify-center p-4 backdrop-blur-sm rounded-xl border transition-all group"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "#2F80ED",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#5DA9E9";
              e.currentTarget.style.backgroundColor = "rgba(93, 169, 233, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2F80ED";
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors group-hover:scale-105"
              style={{ backgroundColor: "rgba(47, 128, 237, 0.7)" }}
            >
              <ArrowDownTrayIcon
                className="h-5 w-5"
                style={{ color: "#FFFFFF" }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>
              Receive
            </span>
          </Link>

          <Link
            to="/link"
            className="flex flex-col items-center justify-center p-4 backdrop-blur-sm rounded-xl border transition-all group"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "#2F80ED",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#5DA9E9";
              e.currentTarget.style.backgroundColor = "rgba(93, 169, 233, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2F80ED";
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors group-hover:scale-105"
              style={{ backgroundColor: "rgba(47, 128, 237, 0.7)" }}
            >
              <ArrowsRightLeftIcon
                className="h-5 w-5"
                style={{ color: "#FFFFFF" }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>
              Link
            </span>
          </Link>

          <Link
            to="/kyc-verify"
            className="flex flex-col items-center justify-center p-4 backdrop-blur-sm rounded-xl border transition-all group"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "#2F80ED",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#5DA9E9";
              e.currentTarget.style.backgroundColor = "rgba(93, 169, 233, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2F80ED";
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors group-hover:scale-105"
              style={{ backgroundColor: "rgba(47, 128, 237, 0.7)" }}
            >
              <ShieldCheckIcon
                className="h-5 w-5"
                style={{ color: "#FFFFFF" }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>
              Verify
            </span>
          </Link>
        </div>
      </div>

      {/* Tokens Section */}
      <div
        className="rounded-2xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: "#E1E6EC" }}>
          <h2 className="text-lg font-semibold" style={{ color: "#1F2D3D" }}>
            Your Assets
          </h2>
        </div>

        {/* Tokens with spacing */}
        <div className="p-4 space-y-3">
          {sortedTokens.map(({ token, usdBalance, display }) => (
            <div
              key={token}
              className="flex items-center justify-between p-4 rounded-xl border transition-all duration-200 shadow-sm"
              style={{
                backgroundColor: "rgba(245, 247, 250, 0.5)",
                borderColor: "#E1E6EC",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#5DA9E9";
                e.currentTarget.style.backgroundColor =
                  "rgba(93, 169, 233, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E1E6EC";
                e.currentTarget.style.backgroundColor =
                  "rgba(245, 247, 250, 0.5)";
              }}
            >
              <div className="flex items-center">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center mr-3 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(47, 128, 237, 0.1), rgba(93, 169, 233, 0.2))",
                  }}
                >
                  {tokenLogos[token] ? (
                    <img
                      src={tokenLogos[token]}
                      alt={`${token} logo`}
                      className="h-8 w-8"
                    />
                  ) : (
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#2F80ED" }}
                    >
                      {token.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium" style={{ color: "#1F2D3D" }}>
                    {tokenDisplayNames[token] ||
                      token.charAt(0).toUpperCase() +
                        token.slice(1).replace("-", " ")}
                  </div>
                  <div className="text-sm" style={{ color: "#6B7280" }}>
                    {display.tokenAmount} {tokenSymbols[token]}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold" style={{ color: "#1F2D3D" }}>
                  {display.usdValue}
                </div>
                <div className="text-xs" style={{ color: "#6B7280" }}>
                  {display.price}
                </div>
                <div
                  className="text-xs px-2 py-1 rounded-full mt-1"
                  style={{
                    backgroundColor:
                      usdBalance > 0
                        ? "rgba(107, 207, 61, 0.1)"
                        : "rgba(225, 230, 236, 0.5)",
                    color: usdBalance > 0 ? "#6BCF3D" : "#6B7280",
                  }}
                >
                  {usdBalance > 0 ? "Active" : "No Balance"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="mt-6 p-4 border rounded-xl mb-10"
        style={{
          backgroundColor: "rgba(245, 247, 250, 0.8)",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="flex items-center">
          <CheckBadgeIcon
            className="h-5 w-5 mr-3 flex-shrink-0"
            style={{ color: "#6BCF3D" }}
          />
          <div>
            <p className="text-sm" style={{ color: "#1F2D3D" }}>
              All assets are protected by quantum-resistant encryption and FRA
              fund recovery system. Prices update every 5 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
