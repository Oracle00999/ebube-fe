// components/WalletNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const WalletNav = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: HomeIcon,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: ArrowDownTrayIcon,
      label: "Receive",
      path: "/withdraw",
    },
    {
      icon: ArrowsRightLeftIcon,
      label: "Swap",
      path: "/swap",
    },
    {
      icon: UserCircleIcon,
      label: "Account",
      path: "/account",
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t shadow-lg z-40"
      style={{
        backgroundColor: "#1F2D3D",
        borderColor: "#2F80ED",
      }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center w-20 h-full transition-colors ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-all ${
                  isActive ? "bg-opacity-20" : ""
                }`}
                style={{
                  backgroundColor: isActive
                    ? "rgba(59, 130, 246, 0.2)"
                    : "transparent",
                }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span
                className="text-xs font-medium mt-1"
                style={{
                  color: isActive ? "#FFFFFF" : "#8FA6BF",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WalletNav;
