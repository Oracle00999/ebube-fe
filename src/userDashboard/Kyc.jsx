import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const KycVerify = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const documentTypes = [
    { value: "national_id", label: "National ID Card" },
    { value: "passport", label: "Passport" },
    { value: "driver_license", label: "Driver's License" },
    { value: "voter_card", label: "Voter's Card" },
  ];

  const [formData, setFormData] = useState({
    documentType: "national_id",
    documentNumber: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!validTypes.includes(file.type)) {
      setError("File must be JPG, PNG, or PDF format");
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.documentNumber.trim()) {
      setError("Please enter your document number");
      return;
    }

    if (!selectedFile) {
      setError("Please upload a document");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("documentType", formData.documentType);
      formDataToSend.append("documentNumber", formData.documentNumber.trim());
      formDataToSend.append("document", selectedFile);

      const response = await fetch(
        "https://ebube-be.onrender.com/api/kyc/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to upload document");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 mb-11">
        <div
          className="rounded-2xl border p-8 text-center"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E1E6EC",
          }}
        >
          <CheckCircleIcon
            className="h-12 w-12 mx-auto mb-4"
            style={{ color: "#6BCF3D" }}
          />
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1F2D3D" }}>
            Document Uploaded Successfully
          </h2>
          <p className="mb-6" style={{ color: "#6B7280" }}>
            Waiting for admin verification.
          </p>
          <Link
            to="/account"
            className="px-6 py-3 text-white rounded-lg transition-colors"
            style={{
              backgroundColor: "#2F80ED",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3B82F6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2F80ED")
            }
          >
            Back to Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 mb-11">
      <div className="flex items-center mb-8">
        <Link to="/account" className="mr-4">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#2F80ED" }}
          >
            <ArrowLeftIcon className="h-5 w-5" style={{ color: "#FFFFFF" }} />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
            KYC Verification
          </h1>
          <p className="text-gray-600" style={{ color: "#6B7280" }}>
            Upload your identification document
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border p-6"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <label className="block mb-4">
          <span className="text-sm font-medium" style={{ color: "#1F2D3D" }}>
            Document Type
          </span>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg px-3 py-2 transition-colors"
            style={{
              border: "1px solid #E1E6EC",
              color: "#1F2D3D",
              backgroundColor: "#FFFFFF",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2F80ED")}
            onBlur={(e) => (e.target.style.borderColor = "#E1E6EC")}
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium" style={{ color: "#1F2D3D" }}>
            Document Number
          </span>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg px-3 py-2 transition-colors"
            style={{
              border: "1px solid #E1E6EC",
              color: "#1F2D3D",
              backgroundColor: "#FFFFFF",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2F80ED")}
            onBlur={(e) => (e.target.style.borderColor = "#E1E6EC")}
          />
        </label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer mb-4 transition-colors"
          style={{
            borderColor: "#E1E6EC",
            color: "#6B7280",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#2F80ED";
            e.currentTarget.style.backgroundColor = "rgba(47, 128, 237, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E1E6EC";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <ArrowUpTrayIcon
            className="h-8 w-8 mx-auto mb-2"
            style={{ color: "#8FA6BF" }}
          />
          {selectedFile ? selectedFile.name : "Click to upload document"}
        </div>

        {error && (
          <div
            className="mb-4 flex items-center text-sm"
            style={{ color: "#E74C3C" }}
          >
            <XCircleIcon
              className="h-5 w-5 mr-2"
              style={{ color: "#E74C3C" }}
            />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 text-white rounded-lg transition-colors disabled:opacity-50"
          style={{
            backgroundColor: uploading ? "rgba(47, 128, 237, 0.5)" : "#2F80ED",
          }}
          onMouseEnter={(e) => {
            if (!uploading) e.currentTarget.style.backgroundColor = "#3B82F6";
          }}
          onMouseLeave={(e) => {
            if (!uploading) e.currentTarget.style.backgroundColor = "#2F80ED";
          }}
        >
          {uploading ? "Uploading..." : "Submit for Verification"}
        </button>
      </form>
    </div>
  );
};

export default KycVerify;
