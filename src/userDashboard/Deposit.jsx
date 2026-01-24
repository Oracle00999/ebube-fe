// pages/Deposit.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const Deposit = () => {
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
  const [depositData, setDepositData] = useState({
    cryptocurrency: "bitcoin",
    amount: "",
    txHash: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [depositResult, setDepositResult] = useState(null);
  const [copied, setCopied] = useState(false);

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
        setDepositData({
          ...depositData,
          [name]: value,
        });
      }
    } else {
      setDepositData({
        ...depositData,
        [name]: value,
      });
    }
    setError("");
  };

  const getCryptoName = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.name : cryptoId;
  };

  const getCryptoIcon = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.icon : "◇";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    // Validation
    const amount = parseFloat(depositData.amount);

    if (!depositData.amount || amount <= 0) {
      setError("Please enter a valid deposit amount");
      return;
    }

    if (amount < 10) {
      setError("Minimum deposit amount is $10");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://ebube-be.onrender.com/api/wallet/deposit/request",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            cryptocurrency: depositData.cryptocurrency,
            txHash: depositData.txHash || undefined, // Only send if provided
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setDepositResult(data.data);
        setSuccess(true);
        // Reset form
        setDepositData({
          cryptocurrency: "bitcoin",
          amount: "",
          txHash: "",
        });
      } else {
        setError(data.message || "Deposit request failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
            Deposit Funds
          </h1>
          <p className="text-gray-600" style={{ color: "#6B7280" }}>
            Add funds to your wallet
          </p>
        </div>
      </div>

      {/* Deposit Card */}
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
                Make a Deposit
              </h2>
              <p className="text-sm mt-1" style={{ color: "#8FA6BF" }}>
                Deposit cryptocurrency to your wallet
              </p>
            </div>
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#2F80ED" }}
            >
              <ArrowDownTrayIcon
                className="h-5 w-5"
                style={{ color: "#FFFFFF" }}
              />
            </div>
          </div>
        </div>

        {/* Deposit Form/Result */}
        <div className="p-6">
          {success && depositResult ? (
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
                  Deposit Request Submitted!
                </h3>
                <p style={{ color: "#8FA6BF" }}>
                  Your deposit request has been received and is pending
                  confirmation.
                </p>
              </div>

              {/* Deposit Address */}
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
                    {getCryptoName(depositResult.transaction.cryptocurrency)}{" "}
                    Deposit Address
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(depositResult.depositAddress)
                    }
                    className="text-xs flex items-center"
                    style={{ color: "#8FA6BF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FFFFFF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#8FA6BF")
                    }
                  >
                    <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(31, 45, 61, 0.5)",
                    borderColor: "rgba(47, 128, 237, 0.5)",
                  }}
                >
                  <p
                    className="font-mono text-sm break-all"
                    style={{ color: "#FFFFFF" }}
                  >
                    {depositResult.depositAddress}
                  </p>
                </div>
                <p className="text-xs mt-2" style={{ color: "#8FA6BF" }}>
                  Send funds to this address. The deposit will be credited after
                  blockchain confirmation.
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
                  Transaction Details
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
                      {depositResult.transaction.transactionId}
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
                      {formatCurrency(depositResult.transaction.amount)}
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
                      {getCryptoName(depositResult.transaction.cryptocurrency)}
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
                      {depositResult.transaction.status}
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
                      {formatDate(depositResult.transaction.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
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
                  Next Steps
                </h4>
                <ul className="text-xs space-y-1" style={{ color: "#8FA6BF" }}>
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>
                      Send the exact amount to the deposit address above
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>
                      Wait for blockchain confirmation (usually 2-6
                      confirmations)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>
                      Your funds will be credited after admin verification
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>
                      You can check deposit status in your transaction history
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
                  New Deposit
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
            <form onSubmit={handleDeposit}>
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
                    value={depositData.cryptocurrency}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-xl pl-4 pr-10 py-3 font-medium focus:outline-none cursor-pointer"
                    style={{
                      backgroundColor: "rgba(31, 45, 61, 0.8)",
                      border: "1px solid #2F80ED",
                      color: "#FFFFFF",
                    }}
                  >
                    {cryptoOptions.map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol})
                      </option>
                    ))}
                  </select>
                  <ArrowDownIcon
                    className="h-4 w-4 absolute right-3 top-4 pointer-events-none"
                    style={{ color: "#8FA6BF" }}
                  />
                </div>
                <div className="flex items-center mt-2">
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: "#2F80ED" }}
                  >
                    <span className="font-bold" style={{ color: "#FFFFFF" }}>
                      {getCryptoIcon(depositData.cryptocurrency)}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: "#8FA6BF" }}>
                    {getCryptoName(depositData.cryptocurrency)} deposits
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Deposit Amount (USD)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="amount"
                    value={depositData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full rounded-xl pl-4 pr-4 py-3 text-2xl font-bold placeholder-gray-400 focus:outline-none"
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
                <div className="text-xs mt-1" style={{ color: "#8FA6BF" }}>
                  Minimum deposit: $10.00
                </div>
              </div>

              {/* Transaction Hash (Optional) */}
              <div className="mb-6">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Transaction Hash (Optional)
                </label>
                <input
                  type="text"
                  name="txHash"
                  value={depositData.txHash}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className="w-full rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none"
                  style={{
                    backgroundColor: "rgba(31, 45, 61, 0.8)",
                    border: "1px solid #2F80ED",
                    color: "#FFFFFF",
                  }}
                />
                <div className="text-xs mt-1" style={{ color: "#8FA6BF" }}>
                  Provide if you've already sent the transaction
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

              {/* Deposit Button */}
              <button
                type="submit"
                disabled={
                  loading ||
                  !depositData.amount ||
                  parseFloat(depositData.amount) < 10
                }
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  loading ||
                  !depositData.amount ||
                  parseFloat(depositData.amount) < 10
                    ? "cursor-not-allowed"
                    : "hover:opacity-90 shadow-lg"
                }`}
                style={{
                  backgroundColor:
                    loading ||
                    !depositData.amount ||
                    parseFloat(depositData.amount) < 10
                      ? "rgba(47, 128, 237, 0.5)"
                      : "#2F80ED",
                  color: "#FFFFFF",
                }}
              >
                {loading ? "Processing..." : "Request Deposit"}
              </button>

              {/* Disclaimer */}
              <div
                className="mt-4 flex items-start text-xs"
                style={{ color: "#8FA6BF" }}
              >
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                <p>
                  Deposit will be processed after blockchain confirmation.
                  Please ensure you send funds to the correct address.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Important Information */}
      <div
        className="rounded-xl border shadow-sm"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor: "#E1E6EC" }}>
          <h3 className="font-medium" style={{ color: "#1F2D3D" }}>
            Deposit Information
          </h3>
        </div>
        <div className="p-4">
          <ul className="space-y-2 text-sm" style={{ color: "#6B7280" }}>
            <li className="flex items-start">
              <div
                className="h-1.5 w-1.5 rounded-full mt-1.5 mr-2 shrink-0"
                style={{ backgroundColor: "#2F80ED" }}
              ></div>
              <span>Deposits are processed after blockchain confirmation</span>
            </li>
            <li className="flex items-start">
              <div
                className="h-1.5 w-1.5 rounded-full mt-1.5 mr-2 shrink-0"
                style={{ backgroundColor: "#2F80ED" }}
              ></div>
              <span>Minimum deposit amount is $10.00</span>
            </li>
            <li className="flex items-start">
              <div
                className="h-1.5 w-1.5 rounded-full mt-1.5 mr-2 shrink-0"
                style={{ backgroundColor: "#2F80ED" }}
              ></div>
              <span>
                Always double-check the deposit address before sending
              </span>
            </li>
            {/* <li className="flex items-start">
              <div 
                className="h-1.5 w-1.5 rounded-full mt-1.5 mr-2 shrink-0"
                style={{ backgroundColor: '#2F80ED' }}
              ></div>
              <span>Do not send funds from exchanges directly</span>
            </li> */}
            <li className="flex items-start">
              <div
                className="h-1.5 w-1.5 rounded-full mt-1.5 mr-2 shrink-0"
                style={{ backgroundColor: "#2F80ED" }}
              ></div>
              <span>
                Contact support if deposit is not credited within 24 hours
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
