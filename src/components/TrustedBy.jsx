// components/TrustedBy.jsx
import React from "react";
import {
  BuildingLibraryIcon,
  CpuChipIcon,
  BanknotesIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const TrustedBy = () => {
  const logos = [
    { name: "Global Bank", icon: BuildingLibraryIcon },
    { name: "Quantum Fintech", icon: CpuChipIcon },
    { name: "Secure Capital", icon: BanknotesIcon },
    { name: "International Finance", icon: GlobeAltIcon },
    { name: "Tech Bank", icon: DevicePhoneMobileIcon },
    { name: "Blockchain Corp", icon: CircleStackIcon },
    { name: "Capital One", icon: BuildingOfficeIcon },
    { name: "Digital Assets", icon: BuildingStorefrontIcon },
  ];

  // Duplicate logos for seamless looping
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="bg-[#0B1F3A] py-16 md:py-20 border-t border-[#112E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#112E4A] rounded-full mb-6 border border-[#163E63]">
            <span className="text-sm font-medium text-[#7FA6C9]">PARTNERS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-[#D1D9E0] text-lg max-w-2xl mx-auto">
            Powering secure financial operations for the world's most innovative
            institutions
          </p>
        </motion.div>

        {/* Single Sliding Row */}
        <div className="relative overflow-hidden py-6">
          {/* Gradient Fades */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B1F3A] to-transparent z-10"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B1F3A] to-transparent z-10"
          ></motion.div>

          {/* Sliding Logos */}
          <div className="flex animate-slideSingle">
            {duplicatedLogos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-shrink-0 mx-6 px-8 py-6 bg-[#112E4A] rounded-xl border border-[#163E63] flex flex-col items-center justify-center min-w-[180px] hover:border-[#2F8CFF] hover:shadow-[0_0_25px_rgba(47,140,255,0.15)] transition-all duration-300 group"
                >
                  <div className="h-14 w-14 rounded-lg bg-[#163E63] flex items-center justify-center mb-4 group-hover:bg-[#163E63]/80 transition-colors">
                    <Icon className="h-7 w-7 text-[#2F8CFF]" />
                  </div>
                  <span className="text-base font-medium text-white">
                    {logo.name}
                  </span>
                  <span className="text-xs text-[#7FA6C9] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Trusted Partner
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-16 pt-12 border-t border-[#112E4A]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                value: "47",
                label: "Countries Served",
                color: "#1EC9E8",
                delay: 0,
              },
              {
                value: "$500m+",
                label: "Assets Secured",
                color: "#2F8CFF",
                delay: 0.1,
              },
              {
                value: "24/7",
                label: "Quantum Uptime",
                color: "#F5B400",
                delay: 0.2,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ y: -5 }}
                className="px-6 py-4 bg-[#112E4A] rounded-xl border border-[#163E63] hover:border-[#1EC9E8] transition-colors duration-300"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  <span style={{ color: stat.color }}>{stat.value}</span>
                </div>
                <p className="text-[#D1D9E0] text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Highlight badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#2F8CFF]/30 mt-8 shadow-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#1EC9E8] mr-3"
            ></motion.div>
            <span className="text-[#D1D9E0] mr-3">Live global network</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        @keyframes slideSingle {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slideSingle {
          animation: slideSingle 50s linear infinite;
          width: max-content;
        }

        /* Pause animation on hover */
        .animate-slideSingle:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustedBy;
