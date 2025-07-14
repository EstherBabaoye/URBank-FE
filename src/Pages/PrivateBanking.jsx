import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PrivateBanking() {
  useEffect(() => {
    document.title = "Private Banking";
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      className="pt-16 mt-24 px-6 max-w-6xl mx-auto mb-24"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-center text-[#051d40] mb-6"
        variants={variants}
      >
        Private Banking
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-lg"
        variants={variants}
      >
        URBank’s Private Banking is built for discerning clients who want a
        premium, personalized experience. Our dedicated advisors help you
        protect, grow, and manage your wealth seamlessly.
      </motion.p>

      <motion.div
        className="bg-blue-50 p-8 rounded-2xl shadow-md"
        variants={variants}
      >
        <h2 className="text-2xl font-bold text-[#051d40] mb-4">
          What We Offer
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Bespoke investment planning and asset management</li>
          <li>Priority service and zero queue banking</li>
          <li>Access to exclusive financial products and rates</li>
          <li>Dedicated relationship manager 24/7</li>
        </ul>
      </motion.div>

      <motion.div className="text-center mt-10" variants={variants}>
        <Link
          to="/support/contact-us"
          className="bg-[#051d40] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#03306b] transition duration-300 transform hover:scale-105"
        >
          Speak with a Private Advisor
        </Link>
      </motion.div>
    </motion.div>
  );
}
