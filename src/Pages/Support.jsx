import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Support() {
  useEffect(() => {
      document.title = "URBank Support";
    }, []);
  return (
    <div className="pt-16 mt-24 mb-24 px-6 max-w-5xl mx-auto">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#051d40] mb-4">
          URBank Support Center
        </h1>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
          How can we assist you today? Choose an option below to get the help you need.
        </p>
      </motion.header>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        <Link
          to="/support/contact-us"
          aria-label="Contact Us"
          className="p-6 rounded-2xl shadow-md bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-[#051d40] mb-2">
            Contact Us
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Need to speak directly with us? Find phone numbers, email addresses, and office hours.
          </p>
        </Link>

        <Link
          to="/support/faqs"
          aria-label="Frequently Asked Questions"
          className="p-6 rounded-2xl shadow-md bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-[#051d40] mb-2">
            FAQs
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Browse answers to the most common questions about your account and our services.
          </p>
        </Link>

        <Link
          to="/support/live-chat"
          aria-label="Live Chat"
          className="p-6 rounded-2xl shadow-md bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-[#051d40] mb-2">
            Live Chat
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Chat with a support specialist instantly for fast help with your issues.
          </p>
        </Link>

        <Link
          to="/support/help-center"
          aria-label="Help Center"
          className="p-6 rounded-2xl shadow-md bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-[#051d40] mb-2">
            Help Center
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Explore guides, tutorials, and resources to get the most out of URBank.
          </p>
        </Link>
      </motion.main>
    </div>
  );
}
