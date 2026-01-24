// components/MobileApp.jsx
import React from "react";
import {
  DevicePhoneMobileIcon,
  ClockIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import mobileBg from "../assets/mobile.webp";

const MobileApp = () => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0B1F3A] border-t border-[#112E4A]">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Mobile App{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF]">
              Coming Soon
            </span>
          </h2>
          <p className="text-[#D1D9E0] text-lg">
            Access your QFS Ledger on mobile devices
          </p>
        </div>

        {/* Simple Content */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] text-[#7FA6C9] rounded-full mb-8 border border-[#2F8CFF]/30">
            <ClockIcon className="h-4 w-4 mr-2 text-[#2F8CFF]" />
            <span className="text-sm font-medium">Launching Soon</span>
          </div>

          {/* App Store Buttons */}
          <div className="flex justify-center gap-6 mb-12">
            {/* App Store */}
            <div className="px-6 py-3 bg-[#112E4A] text-white rounded-lg flex items-center border border-[#163E63] hover:border-[#2F8CFF] hover:bg-[#163E63]/50 transition-colors cursor-pointer">
              <div className="mr-3">
                <DevicePhoneMobileIcon className="h-6 w-6 text-[#2F8CFF]" />
              </div>
              <div>
                <div className="text-sm font-medium">App Store</div>
                <div className="text-xs text-[#7FA6C9]">iOS</div>
              </div>
            </div>

            {/* Google Play */}
            <div className="px-6 py-3 bg-[#112E4A] text-white rounded-lg flex items-center border border-[#163E63] hover:border-[#1EC9E8] hover:bg-[#163E63]/50 transition-colors cursor-pointer">
              <div className="mr-3">
                <ArrowDownTrayIcon className="h-6 w-6 text-[#1EC9E8]" />
              </div>
              <div>
                <div className="text-sm font-medium">Google Play</div>
                <div className="text-xs text-[#7FA6C9]">Android</div>
              </div>
            </div>
          </div>

          {/* Simple Message */}
          <p className="text-[#D1D9E0] max-w-md mx-auto">
            Our mobile app is currently in development. You'll be able to manage
            your quantum-secure assets on iOS and Android soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
