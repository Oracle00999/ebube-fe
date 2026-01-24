// pages/Swap.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowsRightLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const Swap = () => {
  const navigate = useNavigate();

  // Available cryptocurrencies
  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "₿" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "Ξ" },
    { id: "tether", name: "Tether", symbol: "USDT", icon: "₮" },
    { id: "binance-coin", name: "Binance Coin", symbol: "BNB", icon: "ⓑ" },
    { id: "solana", name: "Solana", symbol: "SOL", icon: "◎" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", icon: "Ð" },
    { id: "ripple", name: "Ripple", symbol: "XRP", icon: "✕" },
    { id: "stellar", name: "Stellar", symbol: "XLM", icon: "✤" },
    { id: "tron", name: "Tron", symbol: "TRX", icon: "Ⓣ" },
  ];

  // State
  const [swapData, setSwapData] = useState({
    fromCrypto: "tether",
    toCrypto: "bitcoin",
    amount: "",
  });
  const [userBalances, setUserBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch user balances
  useEffect(() => {
    fetchUserBalances();
  }, []);

  const fetchUserBalances = async () => {
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
        const balances = data.data.user.wallet.balances || {};
        setUserBalances(balances);
        setError("");

        // Auto-select first crypto with balance
        const firstWithBalance = cryptoOptions.find(
          (crypto) => balances[crypto.id] > 0,
        );
        if (firstWithBalance && swapData.fromCrypto === "tether") {
          setSwapData((prev) => ({
            ...prev,
            fromCrypto: firstWithBalance.id,
          }));
        }
      } else {
        setError(data.message || "Failed to fetch balances");
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
    }).format(amount || 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setSwapData({
          ...swapData,
          [name]: value,
        });
        setError("");
      }
    } else {
      setSwapData({
        ...swapData,
        [name]: value,
      });
      setError("");
    }
  };

  const switchCurrencies = () => {
    setSwapData({
      fromCrypto: swapData.toCrypto,
      toCrypto: swapData.fromCrypto,
      amount: swapData.amount,
    });
  };

  const getCryptoBalance = (cryptoId) => {
    return userBalances[cryptoId] || 0;
  };

  const handleMaxAmount = () => {
    const balance = getCryptoBalance(swapData.fromCrypto);
    setSwapData({
      ...swapData,
      amount: balance.toString(),
    });
  };

  const handleSwap = async (e) => {
    e.preventDefault();

    const amount = parseFloat(swapData.amount);

    if (!swapData.amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    const balance = getCryptoBalance(swapData.fromCrypto);
    if (amount > balance) {
      setError(`Insufficient balance. You have ${formatCurrency(balance)}`);
      return;
    }

    if (swapData.fromCrypto === swapData.toCrypto) {
      setError("Cannot swap to the same cryptocurrency");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://ebube-be.onrender.com/api/swap/execute",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromCrypto: swapData.fromCrypto,
            toCrypto: swapData.toCrypto,
            amount: amount,
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSwapping(true);

        setTimeout(() => {
          setSwapping(false);
          setSuccess(true);

          // Update local balances
          const newBalances = { ...userBalances };
          newBalances[swapData.fromCrypto] =
            (newBalances[swapData.fromCrypto] || 0) - amount;
          newBalances[swapData.toCrypto] =
            (newBalances[swapData.toCrypto] || 0) + amount;
          setUserBalances(newBalances);

          // Reset after success
          setTimeout(() => {
            setSuccess(false);
            setSwapData({
              fromCrypto: swapData.fromCrypto,
              toCrypto: swapData.toCrypto,
              amount: "",
            });
          }, 2000);
        }, 1500);
      } else {
        setError(data.message || "Swap failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCryptoName = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.name : cryptoId;
  };

  const getCryptoIcon = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.icon : "◇";
  };

  if (loading && Object.keys(userBalances).length === 0) {
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
    <div className="max-w-lg mx-auto mb-11">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/dashboard" className="mr-4">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#2F80ED" }}
          >
            <ArrowLeftIcon className="h-5 w-5" style={{ color: "#FFFFFF" }} />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
            Swap
          </h1>
          <p className="text-gray-600" style={{ color: "#6B7280" }}>
            Trade between cryptocurrencies
          </p>
        </div>
      </div>

      {/* Swap Card */}
      <div
        className="rounded-2xl border shadow-xl overflow-hidden mb-8"
        style={{
          backgroundColor: "#1F2D3D",
          borderColor: "#2F80ED",
        }}
      >
        {/* Card Header */}
        <div
          className="px-6 pt-6 pb-4 border-b"
          style={{ borderColor: "#2F80ED" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold" style={{ color: "#FFFFFF" }}>
                Instant Swap
              </h2>
              <p className="text-sm mt-1" style={{ color: "#8FA6BF" }}>
                Trade between supported cryptocurrencies
              </p>
            </div>
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#2F80ED" }}
            >
              <ArrowsRightLeftIcon
                className="h-5 w-5"
                style={{ color: "#FFFFFF" }}
              />
            </div>
          </div>
        </div>

        {/* Swap Form */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div
                className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#2F80ED" }}
              >
                <CheckCircleIcon
                  className="h-8 w-8"
                  style={{ color: "#FFFFFF" }}
                />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#FFFFFF" }}
              >
                Swap Successful!
              </h3>
              <p className="mb-6" style={{ color: "#8FA6BF" }}>
                {formatCurrency(parseFloat(swapData.amount))} of{" "}
                {getCryptoName(swapData.fromCrypto)} →{" "}
                {getCryptoName(swapData.toCrypto)}
              </p>
              <Link
                to="/dashboard"
                className="inline-block px-6 py-2 rounded-lg transition-colors"
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
                Back to Dashboard
              </Link>
            </div>
          ) : swapping ? (
            <div className="text-center py-8">
              <div
                className="h-16 w-16 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
                style={{
                  borderColor: "#2F80ED",
                  borderTopColor: "transparent",
                }}
              ></div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#FFFFFF" }}
              >
                Processing Swap
              </h3>
              <p style={{ color: "#8FA6BF" }}>
                Please wait while we process your transaction...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSwap}>
              {/* From Section */}
              <div
                className="rounded-xl p-4 border mb-4"
                style={{
                  backgroundColor: "rgba(47, 128, 237, 0.1)",
                  borderColor: "#2F80ED",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#8FA6BF" }}
                  >
                    From
                  </span>
                  <div className="text-xs" style={{ color: "#8FA6BF" }}>
                    Available:{" "}
                    <span className="font-medium" style={{ color: "#FFFFFF" }}>
                      {formatCurrency(getCryptoBalance(swapData.fromCrypto))}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      name="amount"
                      value={swapData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-bold placeholder-gray-400 outline-none"
                      style={{ color: "#FFFFFF" }}
                    />
                    <div className="text-xs mt-1" style={{ color: "#8FA6BF" }}>
                      {swapData.amount &&
                        `≈ ${formatCurrency(parseFloat(swapData.amount))}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleMaxAmount}
                      className="px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors"
                      style={{
                        backgroundColor: "#5DA9E9",
                        color: "#FFFFFF",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2F80ED")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#5DA9E9")
                      }
                    >
                      MAX
                    </button>

                    <div className="relative min-w-[100px]">
                      <select
                        name="fromCrypto"
                        value={swapData.fromCrypto}
                        onChange={handleInputChange}
                        className="w-full appearance-none rounded-lg pl-3 pr-8 py-2 text-sm font-medium focus:outline-none cursor-pointer"
                        style={{
                          backgroundColor: "rgba(31, 45, 61, 0.8)",
                          border: "1px solid #2F80ED",
                          color: "#FFFFFF",
                        }}
                      >
                        {cryptoOptions.map((crypto) => (
                          <option
                            key={crypto.id}
                            value={crypto.id}
                            disabled={getCryptoBalance(crypto.id) <= 0}
                          >
                            {crypto.symbol}
                          </option>
                        ))}
                      </select>
                      <ArrowDownIcon
                        className="h-3 w-3 absolute right-3 top-3.5 pointer-events-none"
                        style={{ color: "#8FA6BF" }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center mt-3 pt-3 border-t"
                  style={{ borderColor: "rgba(47, 128, 237, 0.3)" }}
                >
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: "#2F80ED" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {getCryptoIcon(swapData.fromCrypto)}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: "#8FA6BF" }}>
                    {getCryptoName(swapData.fromCrypto)}
                  </span>
                </div>
              </div>

              {/* Switch Button */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={switchCurrencies}
                    className="h-8 w-8 rounded-full border-4 flex items-center justify-center hover:opacity-90 transition-colors z-10"
                    style={{
                      backgroundColor: "#2F80ED",
                      borderColor: "#1F2D3D",
                    }}
                  >
                    <ArrowUpIcon
                      className="h-3 w-3"
                      style={{ color: "#FFFFFF" }}
                    />
                    <ArrowDownIcon
                      className="h-3 w-3 -mt-0.5"
                      style={{ color: "#FFFFFF" }}
                    />
                  </button>
                </div>
              </div>

              {/* To Section */}
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "rgba(47, 128, 237, 0.1)",
                  borderColor: "#2F80ED",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#8FA6BF" }}
                  >
                    To (Estimate)
                  </span>
                  <div className="text-xs" style={{ color: "#8FA6BF" }}>
                    Balance:{" "}
                    <span className="font-medium" style={{ color: "#FFFFFF" }}>
                      {formatCurrency(getCryptoBalance(swapData.toCrypto))}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {swapData.amount
                        ? formatCurrency(parseFloat(swapData.amount))
                        : "$0.00"}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#8FA6BF" }}>
                      Same USD value as input
                    </div>
                  </div>

                  <div className="relative min-w-[100px]">
                    <select
                      name="toCrypto"
                      value={swapData.toCrypto}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-lg pl-3 pr-8 py-2 text-sm font-medium focus:outline-none cursor-pointer"
                      style={{
                        backgroundColor: "rgba(31, 45, 61, 0.8)",
                        border: "1px solid #2F80ED",
                        color: "#FFFFFF",
                      }}
                    >
                      {cryptoOptions.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                          {crypto.symbol}
                        </option>
                      ))}
                    </select>
                    <ArrowDownIcon
                      className="h-3 w-3 absolute right-3 top-3.5 pointer-events-none"
                      style={{ color: "#8FA6BF" }}
                    />
                  </div>
                </div>

                <div
                  className="flex items-center mt-3 pt-3 border-t"
                  style={{ borderColor: "rgba(47, 128, 237, 0.3)" }}
                >
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: "#2F80ED" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {getCryptoIcon(swapData.toCrypto)}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: "#8FA6BF" }}>
                    {getCryptoName(swapData.toCrypto)}
                  </span>
                </div>
              </div>

              {/* Swap Info */}
              <div
                className="mt-4 p-3 rounded-lg border text-sm"
                style={{
                  backgroundColor: "rgba(47, 128, 237, 0.1)",
                  borderColor: "rgba(47, 128, 237, 0.3)",
                }}
              >
                <div className="flex justify-between">
                  <span style={{ color: "#8FA6BF" }}>Exchange Rate</span>
                  <span className="font-medium" style={{ color: "#FFFFFF" }}>
                    1:1 USD Value
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span style={{ color: "#8FA6BF" }}>Network Fee</span>
                  <span className="font-medium" style={{ color: "#FFFFFF" }}>
                    No Fees
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="mt-4 p-3 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(231, 76, 60, 0.1)",
                    borderColor: "#E74C3C",
                  }}
                >
                  <div className="flex items-center">
                    <XCircleIcon
                      className="h-4 w-4 mr-2 flex-shrink-0"
                      style={{ color: "#E74C3C" }}
                    />
                    <span className="text-sm" style={{ color: "#E74C3C" }}>
                      {error}
                    </span>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <button
                type="submit"
                disabled={
                  !swapData.amount ||
                  parseFloat(swapData.amount) <= 0 ||
                  loading
                }
                className={`w-full mt-6 py-3 rounded-xl font-bold transition-all ${
                  !swapData.amount ||
                  parseFloat(swapData.amount) <= 0 ||
                  loading
                    ? "cursor-not-allowed"
                    : "hover:opacity-90 shadow-lg"
                }`}
                style={{
                  backgroundColor:
                    !swapData.amount ||
                    parseFloat(swapData.amount) <= 0 ||
                    loading
                      ? "rgba(47, 128, 237, 0.5)"
                      : "#2F80ED",
                  color: "#FFFFFF",
                }}
              >
                {loading ? "Processing..." : "Swap Now"}
              </button>

              {/* Disclaimer */}
              <div
                className="mt-4 flex items-start text-xs"
                style={{ color: "#8FA6BF" }}
              >
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  Swap executes instantly at equal USD value. Your balances will
                  update immediately.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Swap;
