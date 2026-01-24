// components/CustomerTestimonials.jsx
import React from "react";
import { StarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import testimonialBg from "../assets/trump.jpg";

const CustomerTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "QFS = Quantum Financial System is the future. Withdraw funds from banks and secure them in QFS-backed assets like XLM and XRP before it's too late!",
      author: "Michael R.",
      role: "Early Investor",
      rating: 5,
    },
    {
      id: 2,
      text: "XRP is a HOLD crypto. Red days are buying opportunities! Soon, higher prices will be the norm. HOLD until new tax codes pass—this is the future of finance!",
      author: "Sarah L.",
      role: "Crypto Trader",
      rating: 5,
    },
    {
      id: 3,
      text: "Switching to the Quantum Financial System (QFS) by securing funds in XLM and XRP is the best decision. The banking system has never been honest with us!",
      author: "David K.",
      role: "Financial Advisor",
      rating: 5,
    },
    {
      id: 4,
      text: "Have you claimed your $200K NESARA GESARA payout? The transition to QFS is happening—don't be left behind!",
      author: "Jennifer M.",
      role: "QFS Advocate",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#0B1F3A] border-t border-[#112E4A]">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#2F8CFF]/30 mb-6">
            <ChatBubbleLeftRightIcon className="h-4 w-4 text-[#2F8CFF] mr-2" />
            <span className="text-sm font-medium text-[#7FA6C9]">
              Community Voices
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF]">
              Customers
            </span>{" "}
            Say
          </h2>

          <p className="text-[#D1D9E0] max-w-2xl mx-auto">
            Join thousands who have already transitioned to quantum-secure
            finance
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#112E4A] rounded-2xl border border-[#163E63] p-6 hover:border-[#2F8CFF] transition-colors duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <div className="h-12 w-12 rounded-full bg-[#163E63] flex items-center justify-center border border-[#2F8CFF]/30">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-[#2F8CFF]" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 text-[#F5B400] fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#D1D9E0] text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center pt-4 border-t border-[#163E63]">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-[#7FA6C9]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
