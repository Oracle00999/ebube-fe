// components/FundSecurity.jsx
import React from "react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  GlobeAltIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const FundSecurity = () => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#0B1F3A] to-[#112E4A] border-t border-[#163E63]">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#F5B400] mb-6"
          >
            <CpuChipIcon className="h-4 w-4 text-[#F5B400] mr-2" />
            <span className="text-sm font-medium text-[#F5B400]">
              Web3 FRA PROTECTION
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Web3Global Ledger{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B400] to-[#FFA500]">
              Fund Security
            </span>
          </motion.h2>

          {/* Main Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#D1D9E0] mb-12 max-w-2xl mx-auto"
          >
            Blockchain-powered Funds Retrieving Agent (FRA) with smart contract
            automation for digital asset protection during financial transitions
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              icon: ShieldCheckIcon,
              title: "Smart Contract FRA",
              description:
                "Automated asset recovery through blockchain smart contracts during system transitions",
              color: "from-[#1EC9E8] to-[#2F8CFF]",
            },
            {
              icon: LockClosedIcon,
              title: "Tokenized Assets",
              description:
                "ISO-compliant digital tokens (XLM, XRP) with blockchain verification and protection",
              color: "from-[#2F8CFF] to-[#1EC9E8]",
            },
            {
              icon: GlobeAltIcon,
              title: "Global Ledger Security",
              description:
                "Distributed ledger technology ensuring transparency across all financial operations",
              color: "from-[#F5B400] to-[#FFA500]",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -5 }}
              className="bg-[#112E4A] rounded-xl border border-[#163E63] p-6"
            >
              <div
                className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#D1D9E0]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <div className="px-4 py-2 bg-[#112E4A] rounded-full border border-[#163E63]">
            <span className="text-sm text-[#7FA6C9]">Blockchain Verified</span>
          </div>
          <div className="px-4 py-2 bg-[#112E4A] rounded-full border border-[#163E63]">
            <span className="text-sm text-[#7FA6C9]">
              Smart Contract Protected
            </span>
          </div>
          <div className="px-4 py-2 bg-[#112E4A] rounded-full border border-[#163E63]">
            <span className="text-sm text-[#7FA6C9]">ISO 20022 Compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FundSecurity;
