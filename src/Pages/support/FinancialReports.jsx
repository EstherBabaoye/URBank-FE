import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, TrendingUp, BarChart, Download } from "lucide-react";

export default function FinancialReports() {
  useEffect(() => {
    document.title = "Financial Reports | URBank";
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const reports = [
    {
      title: "Q1 2025 Financial Report",
      description: "Performance overview and revenue growth in Q1.",
      link: "/reports/q1-2025.pdf",
    },
    {
      title: "Annual Report 2024",
      description: "URBank’s yearly highlights, milestones, and forecasts.",
      link: "/reports/annual-2024.pdf",
    },
    {
      title: "Sustainability Report 2024",
      description: "Progress on our commitment to ESG and clean banking.",
      link: "/reports/sustainability-2024.pdf",
    },
  ];

  return (
    <motion.div
      className="pt-24 mt-12 px-6 max-w-6xl mx-auto mb-24"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-[#051d40] text-center mb-6"
        variants={fadeIn}
      >
        Financial Transparency at Your Fingertips
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg"
        variants={fadeIn}
      >
        URBank is committed to transparency and trust. Explore our quarterly,
        annual, and sustainability reports to understand how we manage
        finances, deliver value, and grow responsibly.
      </motion.p>

      {/* KPI Highlights */}
      <div className="grid sm:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: <TrendingUp className="w-8 h-8 text-blue-700" />,
            label: "₦3.2B",
            sub: "Revenue in Q1 2025",
          },
          {
            icon: <BarChart className="w-8 h-8 text-blue-700" />,
            label: "12.7%",
            sub: "YOY Growth",
          },
          {
            icon: <FileText className="w-8 h-8 text-blue-700" />,
            label: "98.5%",
            sub: "Audit Accuracy",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-blue-50 p-6 rounded-2xl text-center shadow-md"
            variants={fadeIn}
            custom={i}
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-2xl font-bold text-[#051d40]">{item.label}</h3>
            <p className="text-gray-600">{item.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Downloadable Reports */}
      <div className="grid md:grid-cols-2 gap-10">
        {reports.map((report, i) => (
          <motion.div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
            variants={fadeIn}
            custom={i}
          >
            <h4 className="text-xl font-bold text-[#051d40] mb-2">
              {report.title}
            </h4>
            <p className="text-gray-600 mb-4">{report.description}</p>
            <a
              href={report.link}
              download
              className="inline-flex items-center gap-2 text-white bg-[#051d40] px-5 py-2 rounded-md hover:bg-[#03306b] transition"
            >
              <Download className="w-4 h-4" />
              Download Report
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
