// components/CryptoTracker.jsx
import React, { useState, useEffect } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  FireIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const CryptoTracker = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const cryptocurrencies = [
    "bitcoin",
    "ethereum",
    "ripple",
    "cardano",
    "solana",
    "polkadot",
    "dogecoin",
    "stellar",
    "chainlink",
    "litecoin",
  ];

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const ids = cryptocurrencies.join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h,24h,7d`,
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setCryptoData(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    if (value < 0.01) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(value);
    } else if (value < 1) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }).format(value);
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(value);
    }
  };

  const formatPercentage = (value) => {
    const isPositive = value > 0;
    return (
      <motion.span
        initial={{ scale: 1 }}
        animate={{ scale: isPositive ? [1, 1.05, 1] : [1, 0.95, 1] }}
        transition={{ duration: 0.3 }}
        className={`inline-flex items-center ${
          isPositive ? "text-[#1EC9E8]" : "text-[#FF6B6B]"
        }`}
      >
        {isPositive ? (
          <ArrowTrendingUpIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
        ) : (
          <ArrowTrendingDownIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
        )}
        <span className="text-xs sm:text-sm">
          {Math.abs(value).toFixed(2)}%
        </span>
      </motion.span>
    );
  };

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-10 sm:py-16 bg-[#0B1F3A] border-t border-[#112E4A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#2F8CFF]/30 mb-3 sm:mb-4"
          >
            <FireIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#2F8CFF] mr-1.5 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium text-[#2F8CFF]">
              Live Market Data
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            Real-Time{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] bg-[length:200%_auto]"
            >
              Crypto
            </motion.span>{" "}
            Markets
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#7FA6C9] text-sm sm:text-base max-w-2xl mx-auto px-2"
          >
            Track top cryptocurrencies with live prices and 24-hour changes
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="p-4 sm:p-8">
            <div className="animate-pulse space-y-3 sm:space-y-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center justify-between p-3 sm:p-4 bg-[#112E4A] rounded-xl"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-[#163E63] rounded-full"></div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="h-3 sm:h-4 w-16 sm:w-24 bg-[#163E63] rounded"></div>
                      <div className="h-2.5 sm:h-3 w-12 sm:w-16 bg-[#163E63] rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="h-3 sm:h-4 w-20 sm:w-32 bg-[#163E63] rounded"></div>
                    <div className="h-2.5 sm:h-3 w-14 sm:w-20 bg-[#163E63] rounded"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="block sm:hidden space-y-3 mb-6"
            >
              {cryptoData.map((crypto) => (
                <motion.div
                  key={crypto.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#112E4A] rounded-xl border border-[#163E63] p-4 hover:border-[#2F8CFF] transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://www.coingecko.com/en/coins/${crypto.id}`,
                      "_blank",
                    )
                  }
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="relative mr-3"
                      >
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="h-8 w-8 rounded-full border border-[#163E63]"
                        />
                      </motion.div>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {crypto.symbol.toUpperCase()}
                        </div>
                        <div className="text-xs text-[#7FA6C9]">
                          {crypto.name.length > 12
                            ? crypto.name.substring(0, 12) + "..."
                            : crypto.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white text-sm">
                        {formatCurrency(crypto.current_price)}
                      </div>
                      <div className="mt-1">
                        {formatPercentage(crypto.price_change_percentage_24h)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[#163E63] text-xs text-[#7FA6C9]">
                    <div>Market Cap</div>
                    <div>{formatMarketCap(crypto.market_cap)}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden sm:block bg-[#112E4A] rounded-2xl border border-[#163E63] overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#163E63]">
                      <th className="py-4 px-4 sm:px-6 text-left">
                        <span className="text-[#7FA6C9] font-medium text-sm sm:text-base">
                          Asset
                        </span>
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-left">
                        <span className="text-[#7FA6C9] font-medium text-sm sm:text-base">
                          Price
                        </span>
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-left">
                        <span className="text-[#7FA6C9] font-medium text-sm sm:text-base">
                          24h Change
                        </span>
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-left hidden md:table-cell">
                        <span className="text-[#7FA6C9] font-medium text-sm sm:text-base">
                          Market Cap
                        </span>
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-left hidden lg:table-cell">
                        <span className="text-[#7FA6C9] font-medium text-sm sm:text-base">
                          7d Change
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData.map((crypto, index) => (
                      <motion.tr
                        key={crypto.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{
                          backgroundColor: "rgba(22, 62, 99, 0.2)",
                          transition: { duration: 0.2 },
                        }}
                        className="border-b border-[#163E63]/50 cursor-pointer"
                        onClick={() =>
                          window.open(
                            `https://www.coingecko.com/en/coins/${crypto.id}`,
                            "_blank",
                          )
                        }
                      >
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="relative"
                            >
                              <img
                                src={crypto.image}
                                alt={crypto.name}
                                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-[#163E63]"
                              />
                              <div className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#0B1F3A] border border-[#163E63] flex items-center justify-center">
                                <CurrencyDollarIcon className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 text-[#2F8CFF]" />
                              </div>
                            </motion.div>
                            <div>
                              <div className="font-semibold text-white text-sm sm:text-base">
                                {crypto.symbol.toUpperCase()}
                              </div>
                              <div className="text-xs sm:text-sm text-[#7FA6C9]">
                                {crypto.name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 sm:px-6">
                          <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="font-bold text-white text-sm sm:text-lg"
                          >
                            {formatCurrency(crypto.current_price)}
                          </motion.div>
                        </td>

                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center">
                            {formatPercentage(
                              crypto.price_change_percentage_24h,
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 sm:px-6 hidden md:table-cell">
                          <div className="text-white text-sm sm:text-base">
                            {formatMarketCap(crypto.market_cap)}
                          </div>
                        </td>

                        <td className="py-4 px-4 sm:px-6 hidden lg:table-cell">
                          <div className="flex items-center">
                            {formatPercentage(
                              crypto.price_change_percentage_7d_in_currency ||
                                0,
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            {
              title: "Total Market Cap",
              value:
                cryptoData.length > 0
                  ? formatMarketCap(
                      cryptoData.reduce(
                        (sum, crypto) => sum + crypto.market_cap,
                        0,
                      ),
                    )
                  : "Loading...",
              icon: ChartBarIcon,
              delay: 0,
            },
            {
              title: "24h Volume",
              value:
                cryptoData.length > 0
                  ? formatMarketCap(
                      cryptoData.reduce(
                        (sum, crypto) => sum + crypto.total_volume,
                        0,
                      ),
                    )
                  : "Loading...",
              icon: ArrowTrendingUpIcon,
              delay: 0.1,
            },
            {
              title: "Top Gainer",
              value:
                cryptoData.length > 0
                  ? cryptoData
                      .reduce((prev, current) =>
                        prev.price_change_percentage_24h >
                        current.price_change_percentage_24h
                          ? prev
                          : current,
                      )
                      .symbol.toUpperCase()
                  : "Loading...",
              change:
                cryptoData.length > 0
                  ? `+${Math.max(...cryptoData.map((c) => c.price_change_percentage_24h)).toFixed(2)}%`
                  : "",
              icon: FireIcon,
              delay: 0.2,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-[#112E4A] rounded-xl p-4 sm:p-6 border border-[#163E63]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm text-[#7FA6C9]">
                    {stat.title}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white mt-1 sm:mt-2">
                    {stat.value}
                  </div>
                  {stat.change && (
                    <div className="text-xs sm:text-sm text-[#1EC9E8] mt-1">
                      {stat.change}
                    </div>
                  )}
                </div>
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#2F8CFF]/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CryptoTracker;
