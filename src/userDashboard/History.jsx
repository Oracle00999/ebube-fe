// pages/Transactions.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cryptoIcons = {
    bitcoin: "₿",
    ethereum: "Ξ",
    tether: "₮",
    "binance-coin": "ⓑ",
    solana: "◎",
    dogecoin: "Ð",
    ripple: "✕",
    stellar: "✤",
    tron: "Ⓣ",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffHours < 168) {
      // 7 days
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case "deposit":
        return {
          textColor: "#6BCF3D",
          bgColor: "rgba(107, 207, 61, 0.1)",
          borderColor: "rgba(107, 207, 61, 0.3)",
        };
      case "withdrawal":
        return {
          textColor: "#E74C3C",
          bgColor: "rgba(231, 76, 60, 0.1)",
          borderColor: "rgba(231, 76, 60, 0.3)",
        };
      case "swap":
        return {
          textColor: "#2F80ED",
          bgColor: "rgba(47, 128, 237, 0.1)",
          borderColor: "rgba(47, 128, 237, 0.3)",
        };
      default:
        return {
          textColor: "#6B7280",
          bgColor: "rgba(107, 114, 128, 0.1)",
          borderColor: "rgba(107, 114, 128, 0.3)",
        };
    }
  };

  const getTypeIcon = (type) => {
    const styles = getTypeStyles(type);
    const iconColor = styles.textColor;

    switch (type) {
      case "deposit":
        return (
          <ArrowDownTrayIcon
            className="h-3.5 w-3.5"
            style={{ color: iconColor }}
          />
        );
      case "withdrawal":
        return (
          <ArrowUpTrayIcon
            className="h-3.5 w-3.5"
            style={{ color: iconColor }}
          />
        );
      case "swap":
        return (
          <ArrowsRightLeftIcon
            className="h-3.5 w-3.5"
            style={{ color: iconColor }}
          />
        );
      default:
        return null;
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case "deposit":
        return "#6BCF3D";
      case "withdrawal":
        return "#E74C3C";
      case "swap":
        return "#2F80ED";
      default:
        return "#6B7280";
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view transactions");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://ebube-be.onrender.com/api/wallet/transactions",
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
        // Get first 10 of each transaction type
        const allTransactions = data.data.transactions || [];

        const deposits = allTransactions
          .filter((tx) => tx.type === "deposit")
          .slice(0, 10);

        const withdrawals = allTransactions
          .filter((tx) => tx.type === "withdrawal")
          .slice(0, 10);

        const swaps = allTransactions
          .filter((tx) => tx.type === "swap")
          .slice(0, 10);

        // Combine and sort by date (newest first)
        const combined = [...deposits, ...withdrawals, ...swaps].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setTransactions(combined);
        setError("");
      } else {
        setError(data.message || "Failed to load transactions");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading && transactions.length === 0) {
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
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link to="/account" className="mr-3">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center hover:opacity-90 transition-colors"
                style={{ backgroundColor: "#2F80ED" }}
              >
                <ArrowLeftIcon
                  className="h-4 w-4"
                  style={{ color: "#FFFFFF" }}
                />
              </div>
            </Link>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
                Transaction History
              </h1>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                First 10 of each transaction type
              </p>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div
          className="rounded-xl border shadow-sm overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E1E6EC",
          }}
        >
          {/* Table Header */}
          <div
            className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 border-b"
            style={{
              borderColor: "#E1E6EC",
              backgroundColor: "#F5F7FA",
            }}
          >
            <div
              className="col-span-3 font-medium text-sm"
              style={{ color: "#1F2D3D" }}
            >
              Type
            </div>
            <div
              className="col-span-3 font-medium text-sm"
              style={{ color: "#1F2D3D" }}
            >
              Cryptocurrency
            </div>
            <div
              className="col-span-3 font-medium text-sm"
              style={{ color: "#1F2D3D" }}
            >
              Amount
            </div>
            <div
              className="col-span-3 font-medium text-sm"
              style={{ color: "#1F2D3D" }}
            >
              Date & Time
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y" style={{ borderColor: "#E1E6EC" }}>
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                const typeStyles = getTypeStyles(transaction.type);
                const amountColor = getAmountColor(transaction.type);

                return (
                  <div
                    key={transaction.id}
                    className="px-4 py-3 transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#E1E6EC" }}
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div
                            className="inline-flex items-center px-2.5 py-1 rounded-full border text-xs"
                            style={{
                              color: typeStyles.textColor,
                              backgroundColor: typeStyles.bgColor,
                              borderColor: typeStyles.borderColor,
                            }}
                          >
                            <span className="mr-1.5">
                              {getTypeIcon(transaction.type)}
                            </span>
                            <span className="font-medium">
                              {transaction.type}
                            </span>
                          </div>
                        </div>
                        <div
                          className="text-base font-semibold"
                          style={{ color: amountColor }}
                        >
                          {transaction.type === "deposit"
                            ? "+"
                            : transaction.type === "withdrawal"
                              ? "-"
                              : "↔"}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div
                            className="h-6 w-6 rounded-full flex items-center justify-center mr-2"
                            style={{
                              backgroundColor: "rgba(47, 128, 237, 0.1)",
                            }}
                          >
                            <span
                              className="text-xs font-bold"
                              style={{ color: "#2F80ED" }}
                            >
                              {cryptoIcons[transaction.cryptocurrency] ||
                                transaction.cryptocurrency
                                  .charAt(0)
                                  .toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div
                              className="text-sm font-medium"
                              style={{ color: "#1F2D3D" }}
                            >
                              {transaction.cryptocurrency
                                .charAt(0)
                                .toUpperCase() +
                                transaction.cryptocurrency.slice(1)}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: "#6B7280" }}
                            >
                              {transaction.cryptocurrency.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs" style={{ color: "#6B7280" }}>
                          {formatDate(transaction.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                      {/* Type */}
                      <div className="col-span-3">
                        <div
                          className="inline-flex items-center px-3 py-1.5 rounded-full border text-sm"
                          style={{
                            color: typeStyles.textColor,
                            backgroundColor: typeStyles.bgColor,
                            borderColor: typeStyles.borderColor,
                          }}
                        >
                          <span className="mr-2">
                            {getTypeIcon(transaction.type)}
                          </span>
                          <span className="font-medium capitalize">
                            {transaction.type}
                          </span>
                        </div>
                      </div>

                      {/* Cryptocurrency */}
                      <div className="col-span-3">
                        <div className="flex items-center">
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                            style={{
                              backgroundColor: "rgba(47, 128, 237, 0.1)",
                            }}
                          >
                            <span
                              className="text-sm font-bold"
                              style={{ color: "#2F80ED" }}
                            >
                              {cryptoIcons[transaction.cryptocurrency] ||
                                transaction.cryptocurrency
                                  .charAt(0)
                                  .toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div
                              className="font-medium"
                              style={{ color: "#1F2D3D" }}
                            >
                              {transaction.cryptocurrency
                                .charAt(0)
                                .toUpperCase() +
                                transaction.cryptocurrency.slice(1)}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: "#6B7280" }}
                            >
                              {transaction.cryptocurrency.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="col-span-3">
                        <div
                          className="text-lg font-semibold"
                          style={{ color: amountColor }}
                        >
                          {transaction.type === "deposit"
                            ? "+"
                            : transaction.type === "withdrawal"
                              ? "-"
                              : "↔"}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="col-span-3">
                        <div style={{ color: "#1F2D3D" }}>
                          {formatDate(transaction.createdAt)}
                        </div>
                        <div className="text-xs" style={{ color: "#6B7280" }}>
                          {new Date(transaction.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "#F5F7FA" }}
                >
                  <ArrowsRightLeftIcon
                    className="h-6 w-6"
                    style={{ color: "#8FA6BF" }}
                  />
                </div>
                <h3
                  className="text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  No transactions
                </h3>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  Your transaction history will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div
          className="mt-4 p-3 rounded-lg mb-11"
          style={{
            backgroundColor: "rgba(107, 207, 61, 0.1)",
            border: "1px solid rgba(107, 207, 61, 0.3)",
          }}
        >
          <div className="flex items-center">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
              style={{ backgroundColor: "rgba(107, 207, 61, 0.2)" }}
            >
              <span className="text-xs" style={{ color: "#6BCF3D" }}>
                i
              </span>
            </div>
            <p className="text-xs" style={{ color: "#6BCF3D" }}>
              Showing first 10 of each transaction type. For full history,
              contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
