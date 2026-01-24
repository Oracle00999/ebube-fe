// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [backendPinged, setBackendPinged] = useState(false);

  // Ping backend immediately when component mounts
  useEffect(() => {
    const pingBackend = async () => {
      if (!backendPinged) {
        try {
          const timestamp = Date.now();
          const backendUrl = `https://ebube-be.onrender.com/?_=${timestamp}`;
          const response = await fetch(backendUrl, {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          });
          console.log("✅ Backend woken successfully");
          setBackendPinged(true);
        } catch (error) {
          try {
            const backendUrl = `https://ebube-be.onrender.com/?_=${Date.now()}`;
            await fetch(backendUrl, {
              method: "GET",
              mode: "no-cors",
            });
            console.log("✅ Backend ping sent (no-cors mode)");
            setBackendPinged(true);
          } catch (noCorsError) {
            console.log("⚠️ Backend ping attempt completed");
            setBackendPinged(true);
          }
        }
      }
    };

    pingBackend();
    const intervalId = setInterval(
      () => {
        setBackendPinged(false);
      },
      4 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [backendPinged]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1F3A]/95 backdrop-blur-md border-b border-[#112E4A]/30 shadow-[0_4px_20px_rgba(47,140,255,0.15)]"
          : "bg-[#0B1F3A] border-b border-[#112E4A]/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Image - LEFT */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(47,140,255,0.5)]">
                <img
                  src={logoImage}
                  alt="QFS WorldWide Ledger Logo"
                  className={`h-10 w-auto transition-all duration-300 ${
                    isScrolled ? "max-h-10" : "max-h-10"
                  }`}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] shadow-lg">
                        <span class="font-bold text-white text-lg">Q</span>
                      </div>
                    `;
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  Web3Global
                </span>
                <span className="text-sm font-medium text-[#1EC9E8]">
                  Ledger
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - RIGHT */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 border ${
                isScrolled
                  ? "text-[#D1D9E0] border-[#163E63] hover:border-[#1EC9E8] hover:text-white hover:bg-[#112E4A]/50"
                  : "text-[#D1D9E0] border-[#163E63] hover:border-[#1EC9E8] hover:text-white hover:bg-[#112E4A]"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] text-white font-medium rounded-xl hover:from-[#1EC9E8] hover:to-[#1EC9E8] hover:shadow-[0_0_20px_rgba(30,201,232,0.5)] transition-all duration-300 shadow-lg"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "text-[#D1D9E0] hover:text-[#1EC9E8] hover:bg-[#112E4A]/50"
                  : "text-[#D1D9E0] hover:text-[#1EC9E8] hover:bg-[#112E4A]"
              }`}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden border-t ${
              isScrolled
                ? "border-[#112E4A]/30 bg-[#0B1F3A]/95 backdrop-blur-md"
                : "border-[#112E4A] bg-[#0B1F3A]"
            }`}
          >
            <div className="px-2 pt-3 pb-4 space-y-2">
              <Link
                to="/login"
                className="block w-full text-left px-4 py-3 text-base font-medium text-[#D1D9E0] hover:text-white hover:bg-[#112E4A] rounded-xl border border-[#163E63] hover:border-[#1EC9E8] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full text-left px-4 py-3 text-base font-medium bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] text-white rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(30,201,232,0.5)] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
