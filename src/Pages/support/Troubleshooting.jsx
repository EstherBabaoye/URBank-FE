import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  RefreshCcw,
  FileWarning,
  MessageSquareWarning,
  MessageCircle,
} from "lucide-react";

export default function Troubleshooting() {
  useEffect(() => {
    document.title = "Troubleshooting";
  }, []);

  const issues = [
    {
      icon: <LogOut className="text-blue-600 w-6 h-6" />,
      text: "Can’t log in? Reset your password via the app login screen.",
    },
    {
      icon: <RefreshCcw className="text-blue-600 w-6 h-6" />,
      text: "Transaction failed? Wait 5 minutes and check your transaction history.",
    },
    {
      icon: <FileWarning className="text-blue-600 w-6 h-6" />,
      text: "Incorrect account balance? Pull to refresh or re-login.",
    },
    {
      icon: <MessageSquareWarning className="text-blue-600 w-6 h-6" />,
      text: "Still stuck? Contact support through Live Chat or call our hotline.",
    },
  ];

  return (
    <motion.div
      className="pt-16 mt-24 mb-24 px-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-[#051d40] mb-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Troubleshooting
      </motion.h1>

      <motion.p
        className="text-gray-700 mb-10 text-center max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Facing an issue? Here are quick fixes to the most common problems:
      </motion.p>

      <motion.ul
        className="space-y-5 bg-blue-50 p-6 rounded-2xl shadow-sm"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {issues.map((issue, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-4 text-gray-700 text-base md:text-lg"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {issue.icon}
            <span>{issue.text}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-gray-600 mb-4">Need more help or can’t find your issue?</p>
        <button
          onClick={() => window.location.href = "/support/live-chat"}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow transition"
        >
          <MessageCircle className="w-5 h-5" />
          Chat With Us
        </button>
      </motion.div>
    </motion.div>
  );
}
