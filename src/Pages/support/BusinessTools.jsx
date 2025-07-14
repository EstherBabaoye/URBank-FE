import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  DollarSign,
  ClipboardList,
  BarChart2,
  TrendingUp,
  Users,
  PieChart,
} from "lucide-react";

export default function BusinessTools() {
  const growthRef = useRef(null);
  const [showGrowthTools, setShowGrowthTools] = useState(false);

  useEffect(() => {
    document.title = "Business Tools";
  }, []);

  const handleExploreClick = () => {
    setShowGrowthTools(true);
    setTimeout(() => {
      growthRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  const highlights = [
    {
      icon: <Briefcase className="text-blue-700 w-8 h-8" />,
      title: "Flexible Microloans",
      text: "Apply for working capital with low interest and minimal paperwork.",
    },
    {
      icon: <ClipboardList className="text-blue-700 w-8 h-8" />,
      title: "Automated Payroll",
      text: "Streamline employee salaries, pensions, and taxes in one dashboard.",
    },
    {
      icon: <DollarSign className="text-blue-700 w-8 h-8" />,
      title: "Business Savings Goals",
      text: "Set automated targets and secure locked savings for expansion.",
    },
    {
      icon: <BarChart2 className="text-blue-700 w-8 h-8" />,
      title: "Income & Expense Insights",
      text: "See where your money goes with smart financial tracking tools.",
    },
    {
      icon: <TrendingUp className="text-blue-700 w-8 h-8" />,
      title: "Growth Analytics",
      text: "Measure revenue, transactions, and sales performance at a glance.",
    },
    {
      icon: <Users className="text-blue-700 w-8 h-8" />,
      title: "Staff Management",
      text: "Manage up to 50 employees with permissions, profiles, and logs.",
    },
  ];

  return (
    <motion.div
      className="pt-16 mt-24 px-6 max-w-6xl mx-auto mb-24"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {/* Header */}
      <motion.h1
        className="text-4xl font-extrabold text-center text-[#051d40] mb-6"
        variants={variants}
      >
        Tools to Power Your Business Growth
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 max-w-xl mx-auto mb-16 text-lg"
        variants={variants}
      >
        From managing payroll to tracking performance—URBank Business Tools were built for your success.
      </motion.p>

      {/* Tools Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {highlights.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
            custom={idx}
            variants={variants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-[#051d40] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Buttons */}
      <motion.div
        className="text-center mt-16 flex flex-wrap gap-4 justify-center"
        variants={variants}
      >
        <Link
          to="/accounts/business"
          className="bg-[#051d40] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#03306b] transition duration-300 transform hover:scale-105"
        >
          Open a Business Account
        </Link>
        <Link
          to="/support/contact-us"
          className="bg-white border-2 border-[#051d40] text-[#051d40] px-8 py-4 rounded-full font-semibold hover:bg-[#051d40] hover:text-white transition duration-300 transform hover:scale-105"
        >
          Apply for Business Loan
        </Link>
        <button
          onClick={handleExploreClick}
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Explore Growth Tools
        </button>
      </motion.div>

      {/* Scroll Target Section */}
      {showGrowthTools && (
        <motion.section
          ref={growthRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24 bg-blue-50 p-8 rounded-3xl shadow-inner"
        >
          <h2 className="text-3xl font-bold text-[#051d40] mb-6 text-center">
            Available Growth Tools with Business Banking
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-6">
            As a URBank Business Account holder, you gain access to:
          </p>
          <ul className="grid md:grid-cols-2 gap-6 text-gray-800 text-lg list-disc pl-6">
            <li>Performance dashboards for sales and transaction analysis</li>
            <li>Cashflow monitoring and risk alerts</li>
            <li>Scheduled savings & goal planning systems</li>
            <li>Real-time payroll disbursement and audit logs</li>
            <li>Loan eligibility tracking and fast-track approvals</li>
            <li>Staff hierarchy and permission management</li>
          </ul>
        </motion.section>
      )}
    </motion.div>
  );
}
