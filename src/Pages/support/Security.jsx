import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  AlertTriangle,
  MessageCircle,
} from "lucide-react"; // Icons from lucide-react

export default function Security() {
  useEffect(() => {
    document.title = "Security";
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="text-blue-600 w-6 h-6" />,
      text: "End-to-end encryption on all transactions",
    },
    {
      icon: <Lock className="text-blue-600 w-6 h-6" />,
      text: "Two-Factor Authentication (2FA) for added protection",
    },
    {
      icon: <Fingerprint className="text-blue-600 w-6 h-6" />,
      text: "Biometric login via fingerprint or face ID",
    },
    {
      icon: <AlertTriangle className="text-blue-600 w-6 h-6" />,
      text: "Real-time fraud alerts and instant account freeze options",
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
        Security & Privacy
      </motion.h1>

      <motion.p
        className="text-gray-700 mb-10 text-center max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Your security is our priority. Here’s how we keep your data safe:
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
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-4 text-gray-700 text-base md:text-lg"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {feature.icon}
            <span>{feature.text}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-gray-600 mb-4">Still have concerns or questions?</p>
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
