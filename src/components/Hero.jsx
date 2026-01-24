// components/Hero.jsx
import React, { useEffect } from "react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import backgroundImage from "../assets/web3image2.jpeg";
import companyLogo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative text-white py-12 md:py-24 mt-11 overflow-hidden">
      {/* Background with gradient overlay - Add pointer-events-none */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[#0B1F3A] pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#112E4A] to-[#163E63]"></div>
      </motion.div>

      {/* Subtle grid pattern - Add pointer-events-none */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#2F8CFF 1px, transparent 1px), linear-gradient(90deg, #2F8CFF 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 relative z-20">
            {/* Company Logo */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center"
            >
              <img
                src={companyLogo}
                alt="Web3Global Ledger"
                className="h-16 w-auto drop-shadow-[0_0_10px_rgba(47,140,255,0.3)]"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="flex items-center space-x-3">
                      <div class="h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] shadow-lg shadow-[#2F8CFF]/30">
                        <span class="font-bold text-white text-xl">W3</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-2xl font-bold tracking-tight text-white">Web3Global</span>
                        <span class="text-sm font-medium text-[#1EC9E8]">Ledger</span>
                      </div>
                    </div>
                  `;
                }}
              />
            </motion.div> */}

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Web3Global
                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF]">
                    Financial Ledger
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl text-[#D1D9E0] max-w-lg leading-relaxed"
            >
              Quantum Financial System infrastructure with Web3 integration,
              providing sovereign-grade security for digital assets and
              blockchain transactions, with built-in Fund Retrieval Agent
              protection and global monetary system interoperability.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <div className="flex items-center space-x-2 text-[#7FA6C9]">
                <ShieldCheckIcon className="h-5 w-5 text-[#2F8CFF]" />
                <span className="text-sm">Sovereign-grade Security</span>
              </div>
              <div className="flex items-center space-x-2 text-[#7FA6C9]">
                <LockClosedIcon className="h-5 w-5 text-[#2F8CFF]" />
                <span className="text-sm">Fund Retrieval Protection</span>
              </div>
            </motion.div>

            {/* CTA Buttons - Add z-10 to ensure they're clickable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-6 relative z-30"
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] text-white font-medium rounded-xl hover:shadow-[0_0_30px_rgba(30,201,232,0.5)] transition-all duration-300 group shadow-lg relative z-30"
              >
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center"
                >
                  Get Started
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#163E63] text-[#D1D9E0] font-medium rounded-xl hover:border-[#2F8CFF] hover:text-white hover:bg-[#112E4A]/50 transition-all duration-300 relative z-30"
              >
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Right: Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] lg:h-[550px] rounded-2xl overflow-hidden group"
          >
            {/* Glow effect container - Add pointer-events-none */}
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.3 }}
              whileHover={{ opacity: 0.5 }}
              className="absolute -inset-1 bg-gradient-to-r from-[#1EC9E8] via-[#2F8CFF] to-[#1EC9E8] rounded-2xl blur-xl transition-all duration-500 pointer-events-none"
            ></motion.div>

            {/* Main card */}
            <div className="relative h-full rounded-2xl overflow-hidden border border-[#112E4A] bg-[#0B1F3A]">
              {/* Background Image */}
              <motion.div
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                }}
              >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent pointer-events-none"></div>
              </motion.div>

              {/* Animated grid overlay - Add pointer-events-none */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(#2F8CFF 1px, transparent 1px), linear-gradient(90deg, #2F8CFF 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                ></div>
              </motion.div>

              {/* Content - This should be clickable if needed */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Top section - Security badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex justify-end"
                >
                  <div className="h-12 w-12 rounded-full bg-[#112E4A]/80 backdrop-blur-sm flex items-center justify-center border border-[#2F8CFF]/40 shadow-[0_0_15px_rgba(47,140,255,0.3)]">
                    <LockClosedIcon className="h-6 w-6 text-[#2F8CFF]" />
                  </div>
                </motion.div>

                {/* Center - Title */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center"
                >
                  <div className="inline-block px-6 py-3 bg-[#112E4A]/60 backdrop-blur-sm rounded-xl border border-[#2F8CFF]/30">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Web3GlobalLedger
                    </h3>
                    <p className="text-sm text-[#7FA6C9]">Ledger</p>
                  </div>
                </motion.div>

                {/* Bottom: Data Stream Visualization */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="space-y-4"
                >
                  <div className="flex space-x-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: "15px" }}
                        animate={{
                          height: `${15 + Math.random() * 50}px`,
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.08,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                        className="flex-1 bg-gradient-to-t from-[#2F8CFF] to-[#1EC9E8] rounded-t"
                      ></motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-[#7FA6C9]">
                    <span>Transaction Flow</span>
                    <span>Encrypted</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
