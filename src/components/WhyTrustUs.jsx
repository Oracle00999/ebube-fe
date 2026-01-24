// components/WhyTrustUs.jsx
import React from "react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ClockIcon,
  UserGroupIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const WhyTrustUs = () => {
  const trustPoints = [
    {
      icon: ShieldCheckIcon,
      title: "Quantum-Resistant Security",
      description:
        "Built with post-quantum cryptography that remains secure against future quantum computing threats.",
      accent: "from-[#1EC9E8] to-[#2F8CFF]",
      hover: "shadow-[0_0_30px_rgba(30,201,232,0.2)]",
    },
    {
      icon: LockClosedIcon,
      title: "Military-Grade Encryption",
      description:
        "256-bit encryption and zero-knowledge proofs ensure your data stays private and secure.",
      accent: "from-[#2F8CFF] to-[#1EC9E8]",
      hover: "shadow-[0_0_30px_rgba(47,140,255,0.2)]",
    },
    {
      icon: BanknotesIcon,
      title: "FRA Protected",
      description:
        "Funds Retrieving Agent ensures asset recovery during financial system transitions.",
      accent: "from-[#F5B400] to-[#FFA500]",
      hover: "shadow-[0_0_30px_rgba(245,180,0,0.2)]",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Compliance",
      description:
        "Designed to meet international financial regulations and ISO 20022 standards.",
      accent: "from-[#1EC9E8] to-[#163E63]",
      hover: "shadow-[0_0_30px_rgba(30,201,232,0.2)]",
    },
    {
      icon: ClockIcon,
      title: "24/7 Monitoring",
      description:
        "Round-the-clock system monitoring and instant threat detection response.",
      accent: "from-[#2F8CFF] to-[#112E4A]",
      hover: "shadow-[0_0_30px_rgba(47,140,255,0.2)]",
    },
    {
      icon: UserGroupIcon,
      title: "Expert Team",
      description:
        "Backed by financial cryptographers and quantum computing specialists.",
      accent: "from-[#F5B400] to-[#1EC9E8]",
      hover: "shadow-[0_0_30px_rgba(245,180,0,0.15)]",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-[#0B1F3A] py-20 md:py-28 border-t border-[#112E4A]">
      {/* Background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, #2F8CFF 1px, transparent 1px),
                          linear-gradient(-45deg, #2F8CFF 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#2F8CFF]/30 mb-6"
          >
            <span className="text-sm font-medium text-[#7FA6C9]">
              TRUST & SECURITY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Why Trust{" "}
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] bg-[length:200%_auto]"
            >
              Web3Global Ledger
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#D1D9E0]"
          >
            Built on transparency, security, and proven quantum technology
          </motion.p>
        </motion.div>

        {/* Trust Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="group relative p-0.5 rounded-xl"
              >
                {/* Gradient Border */}
                <motion.div
                  initial={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-br ${point.accent} rounded-xl transition-opacity duration-300`}
                ></motion.div>

                {/* Main Card */}
                <div className="relative bg-[#112E4A] rounded-xl border border-[#163E63] p-6 h-full group-hover:border-transparent transition-all duration-300">
                  {/* Icon with gradient */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`relative h-14 w-14 rounded-xl bg-gradient-to-br ${point.accent} flex items-center justify-center mb-6 transition-transform duration-300`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                    {/* Subtle glow */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${point.accent} opacity-50 blur-lg -z-10`}
                    ></motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {point.title}
                  </h3>
                  <p className="text-[#D1D9E0]">{point.description}</p>

                  {/* Hover indicator line */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${point.accent} rounded-b-xl`}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
