// components/UserNav.jsx
import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

const UserNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav
      className="sticky top-0 bg-white shadow-sm border-b z-50"
      style={{
        backgroundColor: "#FFFFFF", // card color
        borderColor: "#E1E6EC", // divider color
      }}
    >
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logoImage}
                alt="QFS WorldWide Ledger Logo"
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="h-8 w-8 rounded-lg flex items-center justify-center shadow-sm" 
                         style="background: linear-gradient(135deg, #2F80ED, #5DA9E9)">
                      <span class="font-bold text-white text-sm">Q</span>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Company Name */}
            <div className="flex flex-col">
              <span
                className="text-lg font-bold leading-tight"
                style={{ color: "#1F2D3D" }} // main text
              >
                QFS WorldWide
              </span>
              <span
                className="text-xs font-medium leading-tight"
                style={{ color: "#2F80ED" }} // primary action
              >
                Ledger
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border"
            style={{
              color: "#6B7280", // secondary text
              borderColor: "#E1E6EC", // divider
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#E74C3C"; // error
              e.currentTarget.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
              e.currentTarget.style.borderColor = "rgba(231, 76, 60, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B7280";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#E1E6EC";
            }}
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
