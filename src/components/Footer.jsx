// components/Footer.jsx
import React from "react";
import {
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import logoImage from "../assets/logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-8 border-t border-[#112E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center space-x-3"
            >
              <img
                src={logoImage}
                alt="Web3Global Ledger Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center shadow-lg">
                      <span class="font-bold text-lg text-white">W3</span>
                    </div>
                  `;
                }}
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Web3Global</span>
                <span className="text-sm font-medium text-[#1EC9E8]">
                  Ledger
                </span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#7FA6C9] text-sm leading-relaxed"
            >
              Quantum Financial System Ledger provides quantum-resistant
              financial infrastructure for the future of global finance.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg font-semibold mb-6 text-white"
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {["Home", "About QFS", "Fund Security", "Crypto Markets"].map(
                (link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-[#7FA6C9] hover:text-white text-sm transition-colors hover:pl-1 duration-300 inline-block"
                    >
                      {link}
                    </a>
                  </motion.li>
                ),
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg font-semibold mb-6 text-white"
            >
              Resources
            </motion.h3>
            <ul className="space-y-3">
              {["Documentation", "FRA Guide", "ISO 20022"].map(
                (link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-[#7FA6C9] hover:text-white text-sm transition-colors hover:pl-1 duration-300 inline-block"
                    >
                      {link}
                    </a>
                  </motion.li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg font-semibold mb-6 text-white"
            >
              Contact
            </motion.h3>
            <ul className="space-y-4">
              {[
                { icon: EnvelopeIcon, text: "Web3globalledger@gmail.com" },
                { icon: PhoneIcon, text: "+1 (888) WEB3-LEDGE" },
                { icon: MapPinIcon, text: "Global Headquarters" },
              ].map((contact, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="flex items-start"
                >
                  <contact.icon className="h-5 w-5 text-[#7FA6C9] mr-3 mt-0.5" />
                  <span className="text-[#D1D9E0]">{contact.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-[#112E4A] pt-8"
        >
          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[#7FA6C9] text-sm mb-4 md:mb-0"
            >
              © {new Date().getFullYear()} Web3Global Ledger. All rights
              reserved.
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Risk Disclosure",
              ].map((link, index) => (
                <motion.a
                  key={link}
                  whileHover={{ scale: 1.05 }}
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>

            {/* Compliance Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="mt-4 md:mt-0 flex items-center px-3 py-1.5 bg-[#112E4A] rounded-full border border-[#163E63]"
            >
              <ShieldCheckIcon className="h-3 w-3 text-[#2F8CFF] mr-2" />
              <span className="text-[#7FA6C9] text-sm">
                ISO 20022 Compliant
              </span>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 pt-6 border-t border-[#112E4A]"
          >
            <p className="text-[#7FA6C9] text-xs text-center leading-relaxed max-w-3xl mx-auto">
              Web3Global Ledger delivers quantum-resistant financial
              infrastructure with FRA protection for fund security during
              monetary transitions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
