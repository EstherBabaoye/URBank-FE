import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Getting Started",
    description: "Learn how to open an account, set up online banking, and more.",
    route: "/support/help-center/getting-started",
  },
  {
    title: "Business Tools",
    description: "Find tutorials for our loan application, payroll services, and more.",
    route: "/support/help-center/business-tools",
  },
  {
    title: "Security & Privacy",
    description: "Tips on keeping your account and data secure.",
    route: "/support/help-center/security",
  },
  {
    title: "Troubleshooting",
    description: "Solutions for common issues with account access and transactions.",
    route: "/support/help-center/troubleshooting",
  },
];

export default function HelpCenter() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Help Center";
  }, []);

  return (
    <div className="pt-16 mt-24 mb-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-[#051d40] mb-6 text-center animate-fade-in">
        Help Center
      </h1>
      <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-center">
        Explore our tutorials and guides to get the most out of your URBank experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className="bg-blue-50 p-6 rounded-2xl shadow-md cursor-pointer hover:bg-blue-100 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(card.route)}
          >
            <h2 className="text-2xl font-semibold text-[#051d40] mb-2">
              {card.title}
            </h2>
            <p className="text-gray-700 text-sm">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
