// pages/Withdraw.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Withdraw = () => {
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
  const [withdrawData, setWithdrawData] = useState({
    cryptocurrency: "tether",
    amount: "",
    toAddress: "",
  });

  const [userBalances, setUserBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [withdrawResult, setWithdrawResult] = useState(null);

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
        if (firstWithBalance) {
          setWithdrawData((prev) => ({
            ...prev,
            cryptocurrency: firstWithBalance.id,
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
        setWithdrawData({
          ...withdrawData,
          [name]: value,
        });
      }
    } else {
      setWithdrawData({
        ...withdrawData,
        [name]: value,
      });
    }
    setError("");
  };

  const getCryptoBalance = (cryptoId) => {
    return userBalances[cryptoId] || 0;
  };

  const getCryptoName = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.name : cryptoId;
  };

  const getCryptoIcon = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.icon : "◇";
  };

  const handleMaxAmount = () => {
    const balance = getCryptoBalance(withdrawData.cryptocurrency);
    setWithdrawData({
      ...withdrawData,
      amount: balance.toString(),
    });
  };

  const validateAddress = (crypto, address) => {
    if (!address.trim()) {
      return "Please enter a destination address";
    }

    const trimmedAddress = address.trim();

    // Basic format validation
    switch (crypto) {
      case "bitcoin":
        if (!/^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(trimmedAddress)) {
          return "Invalid Bitcoin address format";
        }
        break;
      case "ethereum":
        if (!/^0x[a-fA-F0-9]{40}$/.test(trimmedAddress)) {
          return "Invalid Ethereum address format";
        }
        break;
      case "tether":
        if (!/^0x[a-fA-F0-9]{40}$/.test(trimmedAddress)) {
          return "Invalid Tether address format";
        }
        break;
      case "tron":
        if (!/^T[a-zA-Z0-9]{33}$/.test(trimmedAddress)) {
          return "Invalid TRON address format";
        }
        break;
      default:
        if (trimmedAddress.length < 20) {
          return "Address appears too short";
        }
    }

    return "";
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const amount = parseFloat(withdrawData.amount);

    if (!withdrawData.amount || amount <= 0) {
      setError("Please enter a valid withdrawal amount");
      return;
    }

    const balance = getCryptoBalance(withdrawData.cryptocurrency);
    if (amount > balance) {
      setError(`Insufficient balance. You have ${formatCurrency(balance)}`);
      return;
    }

    if (amount < 10) {
      setError("Minimum withdrawal amount is $10");
      return;
    }

    const addressError = validateAddress(
      withdrawData.cryptocurrency,
      withdrawData.toAddress,
    );
    if (addressError) {
      setError(addressError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://ebube-be.onrender.com/api/wallet/withdraw/request",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            cryptocurrency: withdrawData.cryptocurrency,
            toAddress: withdrawData.toAddress.trim(),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setWithdrawResult(data.data);
        setSuccess(true);
        // Update local balance
        const newBalances = { ...userBalances };
        newBalances[withdrawData.cryptocurrency] =
          (newBalances[withdrawData.cryptocurrency] || 0) - amount;
        setUserBalances(newBalances);
        // Reset form
        setWithdrawData({
          cryptocurrency: withdrawData.cryptocurrency,
          amount: "",
          toAddress: "",
        });
      } else {
        setError(
          data.message || "Withdrawal request failed. Please try again.",
        );
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
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
            Withdraw Funds
          </h1>
          <p className="text-gray-600" style={{ color: "#6B7280" }}>
            Transfer funds to external wallet
          </p>
        </div>
      </div>

      {/* Withdrawal Card */}
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
                Withdraw Cryptocurrency
              </h2>
              <p className="text-sm mt-1" style={{ color: "#8FA6BF" }}>
                Send funds to an external wallet address • No fees
              </p>
            </div>
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#2F80ED" }}
            >
              <ArrowUpTrayIcon
                className="h-5 w-5"
                style={{ color: "#FFFFFF" }}
              />
            </div>
          </div>
        </div>

        {/* Withdrawal Form/Result */}
        <div className="p-6">
          {success && withdrawResult ? (
            <div className="space-y-6">
              {/* Success Header */}
              <div className="text-center">
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
                  Withdrawal Request Submitted!
                </h3>
                <p style={{ color: "#8FA6BF" }}>
                  Your withdrawal is being processed.
                </p>
              </div>

              {/* Transaction Details */}
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "rgba(47, 128, 237, 0.1)",
                  borderColor: "#2F80ED",
                }}
              >
                <h4
                  className="text-sm font-medium mb-3"
                  style={{ color: "#8FA6BF" }}
                >
                  Withdrawal Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Transaction ID
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {withdrawResult.transaction?.transactionId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Amount
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {formatCurrency(withdrawResult.transaction?.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Cryptocurrency
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {getCryptoName(
                        withdrawResult.transaction?.cryptocurrency,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Destination
                    </span>
                    <span
                      className="text-sm font-medium font-mono truncate max-w-[180px]"
                      style={{ color: "#FFFFFF" }}
                    >
                      {withdrawData.toAddress}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Status
                    </span>
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: "rgba(247, 147, 26, 0.2)",
                        color: "#F7931A",
                      }}
                    >
                      {withdrawResult.transaction?.status || "pending"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Request Time
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {formatDate(withdrawResult.transaction?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Processing Information */}
              <div
                className="rounded-lg p-4 border"
                style={{
                  backgroundColor: "rgba(47, 128, 237, 0.05)",
                  borderColor: "rgba(47, 128, 237, 0.3)",
                }}
              >
                <h4
                  className="text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Processing Information
                </h4>
                <ul className="text-xs space-y-1" style={{ color: "#8FA6BF" }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Withdrawals are processed within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Check transaction status in your transaction history
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Contact support if withdrawal is delayed beyond 48 hours
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSuccess(false)}
                  className="flex-1 py-2 rounded-lg transition-colors"
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
                  New Withdrawal
                </button>
                <Link
                  to="/dashboard"
                  className="flex-1 py-2 text-center rounded-lg transition-colors"
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
                  Back to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWithdraw}>
              {/* Cryptocurrency Selection */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Select Cryptocurrency
                </label>
                <div className="relative">
                  <select
                    name="cryptocurrency"
                    value={withdrawData.cryptocurrency}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-xl pl-4 pr-10 py-3 font-medium focus:outline-none cursor-pointer"
                    style={{
                      backgroundColor: "rgba(31, 45, 61, 0.8)",
                      border: "1px solid #2F80ED",
                      color: "#FFFFFF",
                    }}
                  >
                    {cryptoOptions
                      .filter((crypto) => getCryptoBalance(crypto.id) > 0)
                      .map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                          {crypto.name} ({crypto.symbol}) -{" "}
                          {formatCurrency(getCryptoBalance(crypto.id))}
                        </option>
                      ))}
                  </select>
                  <ArrowLeftIcon
                    className="h-4 w-4 absolute right-3 top-4 pointer-events-none rotate-90"
                    style={{ color: "#8FA6BF" }}
                  />
                </div>
                <div className="flex items-center mt-2">
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: "#2F80ED" }}
                  >
                    <span className="font-bold" style={{ color: "#FFFFFF" }}>
                      {getCryptoIcon(withdrawData.cryptocurrency)}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: "#8FA6BF" }}>
                    Balance:{" "}
                    {formatCurrency(
                      getCryptoBalance(withdrawData.cryptocurrency),
                    )}
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Withdrawal Amount (USD)
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      name="amount"
                      value={withdrawData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full rounded-xl pl-4 pr-12 py-3 text-2xl font-bold placeholder-gray-400 focus:outline-none"
                      style={{
                        backgroundColor: "rgba(31, 45, 61, 0.8)",
                        border: "1px solid #2F80ED",
                        color: "#FFFFFF",
                      }}
                    />
                    <div
                      className="absolute right-4 top-3.5"
                      style={{ color: "#8FA6BF" }}
                    >
                      USD
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleMaxAmount}
                    className="px-4 py-3 text-sm rounded-xl whitespace-nowrap transition-colors"
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
                </div>
                <div className="text-xs mt-1" style={{ color: "#8FA6BF" }}>
                  Minimum withdrawal: $10.00 • No fees
                </div>
              </div>

              {/* Destination Address */}
              <div className="mb-6">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Destination Wallet Address
                </label>
                <textarea
                  name="toAddress"
                  value={withdrawData.toAddress}
                  onChange={handleInputChange}
                  placeholder={`Enter ${getCryptoName(
                    withdrawData.cryptocurrency,
                  )} address...`}
                  rows="3"
                  className="w-full rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none resize-none font-mono text-sm"
                  style={{
                    backgroundColor: "rgba(31, 45, 61, 0.8)",
                    border: "1px solid #2F80ED",
                    color: "#FFFFFF",
                  }}
                />
                <div className="text-xs mt-1" style={{ color: "#8FA6BF" }}>
                  Double-check the address. Funds cannot be recovered if sent to
                  wrong address.
                </div>
              </div>

              {/* Summary */}
              <div
                className="mb-4 p-3 rounded-lg border text-sm"
                style={{
                  backgroundColor: "rgba(47, 128, 237, 0.1)",
                  borderColor: "rgba(47, 128, 237, 0.3)",
                }}
              >
                <div className="flex justify-between">
                  <span className="font-medium" style={{ color: "#8FA6BF" }}>
                    Amount to Withdraw
                  </span>
                  <span className="font-bold" style={{ color: "#FFFFFF" }}>
                    {withdrawData.amount
                      ? formatCurrency(parseFloat(withdrawData.amount))
                      : "$0.00"}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span style={{ color: "#8FA6BF" }}>Network Fee</span>
                  <span className="font-medium" style={{ color: "#FFFFFF" }}>
                    $0.00
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="mb-4 p-3 rounded-lg border"
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

              {/* Withdraw Button */}
              <button
                type="submit"
                disabled={
                  submitting ||
                  !withdrawData.amount ||
                  parseFloat(withdrawData.amount) < 10
                }
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  submitting ||
                  !withdrawData.amount ||
                  parseFloat(withdrawData.amount) < 10
                    ? "cursor-not-allowed"
                    : "hover:opacity-90 shadow-lg"
                }`}
                style={{
                  backgroundColor:
                    submitting ||
                    !withdrawData.amount ||
                    parseFloat(withdrawData.amount) < 10
                      ? "rgba(47, 128, 237, 0.5)"
                      : "#2F80ED",
                  color: "#FFFFFF",
                }}
              >
                {submitting ? "Processing..." : "Withdraw Funds"}
              </button>

              {/* Disclaimer */}
              <div
                className="mt-4 flex items-start text-xs mb-3"
                style={{ color: "#8FA6BF" }}
              >
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  Withdrawals are processed within 24 hours. Ensure the
                  destination address is correct.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
