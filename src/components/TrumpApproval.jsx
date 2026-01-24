// components/TrumpApproval.jsx
import React, { useRef } from "react";
import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  FlagIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  StarIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import trumpVideo from "../assets/trump.mp4";
import { motion } from "framer-motion";

const TrumpApproval = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#0B1F3A] border-t border-[#112E4A]">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F5B400] via-[#1EC9E8] to-[#2F8CFF] rounded-2xl opacity-30 blur-xl"></div>

              {/* Main Video Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#112E4A] bg-[#0B1F3A] shadow-2xl">
                {/* Video Player */}
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={handlePlayPause}
                    controls={isPlaying}
                  >
                    <source src={trumpVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play/Pause Button Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <button
                        onClick={handlePlayPause}
                        className="h-16 w-16 rounded-full bg-gradient-to-br from-[#F5B400] to-[#FFD700] flex items-center justify-center border-4 border-white/30 hover:scale-110 hover:shadow-[0_0_30px_rgba(245,180,0,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F5B400]"
                      >
                        <PlayCircleIcon className="h-8 w-8 text-white drop-shadow-lg" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Info Footer */}
                <div className="p-4 bg-gradient-to-r from-[#112E4A] to-[#163E63] border-t border-[#2F8CFF]/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#F5B400] to-[#FFA500] flex items-center justify-center">
                        <StarIcon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          Presidential Endorsement
                        </div>
                        <div className="text-[#7FA6C9] text-sm">
                          Official Web3Global Ledger Statement
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handlePlayPause}
                        className="text-xs text-[#7FA6C9] hover:text-white transition-colors px-3 py-1 rounded-lg bg-[#163E63] hover:bg-[#2F8CFF]/20"
                      >
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <div className="text-xs text-[#1EC9E8] px-2 py-1 bg-[#112E4A] rounded">
                        1:16
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-4 text-center">
              <p className="text-[#D1D9E0] text-sm">
                Presidential endorsement of Quantum Financial System and Web3
                ledger technology
              </p>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#F5B400]/30 mb-6 shadow-lg">
              <FlagIcon className="h-4 w-4 text-[#F5B400] mr-2" />
              <span className="text-sm font-medium text-[#F5B400]">
                Official Presidential Endorsement
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Presidential{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B400] to-[#FFD700]">
                Approval
              </span>{" "}
              Statement
            </h2>

            {/* Content */}
            <div className="space-y-6 text-lg text-[#D1D9E0]">
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <CpuChipIcon className="h-3 w-3 text-white" />
                </div>
                <p>
                  This Web3-powered Quantum Financial System (QFS) is recognized
                  as a secure and transparent foundation for the future of
                  global finance — empowering individuals through decentralized
                  ledger technology, smart contract automation, and protecting
                  national sovereignty in the digital asset economy.
                </p>
              </div>

              {/* Sub-heading */}
              <h3 className="text-xl font-semibold text-white mt-8 mb-4 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 text-[#2F8CFF] mr-2" />
                Presidential Endorsement of QFS Blockchain Integration
              </h3>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <GlobeAltIcon className="h-3 w-3 text-white" />
                </div>
                <p>
                  The Quantum Financial System with Web3 integration signifies a
                  major advancement toward an economy based on decentralized
                  finance (DeFi), transparency, freedom, and innovation. This
                  blockchain-powered system ensures that financial control
                  remains in the hands of the people — not centralized
                  institutions — through tokenized assets and distributed ledger
                  technology.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 pt-8 border-t border-[#163E63] relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#F5B400] to-[#FFA500] flex items-center justify-center">
                    <CurrencyDollarIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <blockquote className="text-xl font-medium italic text-white text-center px-4">
                  "Together, we move forward to a stronger, more secure digital
                  asset economy built on Web3 principles for every American and
                  every global citizen."
                </blockquote>
                <div className="text-center mt-4">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-[#1EC9E8] animate-pulse mr-2"></div>
                    <span className="text-[#1EC9E8] font-medium">
                      Official Presidential Statement
                    </span>
                  </div>
                </div>
              </div>

              {/* Endorsement Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-[#112E4A] rounded-xl p-4 border border-[#163E63] hover:border-[#1EC9E8] transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">
                        Web3 Integration
                      </span>
                      <div className="text-xs text-[#7FA6C9]">
                        Blockchain Verified
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#112E4A] rounded-xl p-4 border border-[#163E63] hover:border-[#F5B400] transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#F5B400] to-[#FFA500] flex items-center justify-center mr-3">
                      <FlagIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">
                        DeFi Sovereignty
                      </span>
                      <div className="text-xs text-[#7FA6C9]">
                        Decentralized Finance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrumpApproval;
