import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const bounceUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Business() {
  useEffect(() => {
    document.title = "Business Banking";
  }, []);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();

  // Parallax effect for hero title and text: moves them vertically on scroll
  // Map scrollYProgress [0,1] to y offset [-20, 20] (for a subtle effect)
  const heroY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const whyChooseData = [
    { emoji: "🚀", text: "Fast Account Setup" },
    { emoji: "🔒", text: "Secure Digital Tools" },
    { emoji: "📊", text: "Growth-Focused Loans" },
    { emoji: "👨‍💼", text: "Expert Support Team" },
  ];

  return (
    <div className="pt-24 overflow-hidden relative">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-20 px-6 text-center relative overflow-hidden"
      >
        {/* Parallax text movement */}
        <motion.h1
          variants={scaleIn}
          style={{ y: heroY }}
          className="text-5xl md:text-6xl font-extrabold text-[#051d40] mb-6"
        >
          Empower Your Business with URBank
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          style={{ y: heroY }}
          className="text-xl text-gray-800 max-w-3xl mx-auto"
        >
          Flexible banking solutions tailored for startups, SMEs, and
          corporations—because your business deserves more than just a bank.
        </motion.p>
      </motion.section>

      {/* Why Choose URBank */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-6 bg-white"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-[#051d40] mb-12"
        >
          Why Choose URBank?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {whyChooseData.map(({ emoji, text }, idx) => (
            <motion.div
              key={idx}
              variants={bounceUp}
              whileHover={{ scale: 1.1, rotate: 1 }}
              className="text-center p-6 bg-blue-50 rounded-2xl shadow-lg transition-all flex flex-col items-center text-5xl"
              aria-label={text}
              role="img"
            >
              <span>{emoji}</span>
              <p className="text-[#051d40] font-semibold text-lg mt-4">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-6 bg-white"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-[#051d40] mb-12"
        >
          Our Business Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Business Accounts",
              text: "Daily operations and long-term growth with flexible account options.",
            },
            {
              title: "Business Loans",
              text: "Quick access to cash with tailored repayment terms.",
            },
            {
              title: "Payment & Collections",
              text: "POS, online, mobile payments—made simple.",
            },
            {
              title: "Payroll Services",
              text: "Automated salaries, pensions, and benefits on time.",
            },
            {
              title: "Dedicated Relationship Managers",
              text: "Expert advice tailored to your industry needs.",
            },
            {
              title: "Digital Banking Tools",
              text: "Total control from web or mobile apps, anytime.",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              variants={bounceUp}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-bold text-[#051d40] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="bg-gray-100 py-20 px-6 text-center"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-[#051d40] mb-12"
        >
          Trusted by Thousands
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            { stat: "₦50B+", label: "Loans Disbursed" },
            { stat: "15K+", label: "Active Businesses" },
            { stat: "24hrs", label: "Avg. Onboarding Time" },
            { stat: "99.9%", label: "System Uptime" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              className="text-[#051d40] text-3xl font-semibold"
            >
              <div>{item.stat}</div>
              <p className="text-gray-600 text-base mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-6 bg-white"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-[#051d40] mb-12"
        >
          What Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Fola, CEO of QuickSupply",
              quote:
                "URBank gave us capital in 48hrs. They’re not just a bank—they’re a growth partner.",
            },
            {
              name: "Chioma, Co-founder of EazyShop",
              quote:
                "Their payroll tool saved us 10+ hours/month. Highly recommend!",
            },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={bounceUp}
              className="bg-blue-50 p-6 rounded-2xl shadow-md text-[#051d40]"
            >
              <p className="italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-semibold">— {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-6 bg-gray-50"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-[#051d40] mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          {[
            "What documents are required to open a business account?",
            "Can I open an account online?",
            "What are the business banking fees?",
            "Is there a minimum balance requirement?",
          ].map((q, idx) => (
            <motion.details
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              className="mb-4 border rounded-lg p-4 bg-white shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-[#051d40] text-lg">
                {q}
              </summary>
              <p className="mt-2 text-gray-600">
                We’ll provide answers shortly. This is placeholder content.
              </p>
            </motion.details>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[#72cded] to-[#4d8fd1] py-20 text-center text-white px-6"
      >
        <h2 className="text-4xl font-bold mb-4">Ready to Bank Smarter?</h2>
        <p className="max-w-xl mx-auto text-xl mb-6">
          Open a business account or explore tools to grow your business—URBank
          is built for you.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/accounts/business"
            className="bg-white text-[#051d40] font-bold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
          >
            Open a Business Account
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="/support/help-center/business-tools"
            className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-[#051d40] transition font-bold"
          >
            Check Business Tools
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
