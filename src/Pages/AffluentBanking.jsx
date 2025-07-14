import { useEffect } from "react";
import { motion } from "framer-motion";

export default function AffluentBanking() {
  useEffect(() => {
    document.title = "Affluent Banking";
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };
  const handleAppDownload = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href = "https://play.google.com/store/apps/";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = "https://www.apple.com/app-store/";
    } else if (/Win|Mac|Linux/i.test(navigator.platform)) {
      window.location.href = "https://apps.microsoft.com/home/";
    } else {
      alert("Please visit our app on your device's store.");
    }
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
        Affluent Banking
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-lg"
        variants={variants}
      >
        Elevate your everyday banking with URBank’s Affluent services. Designed
        for high-income individuals seeking convenience, lifestyle rewards, and
        enhanced financial solutions.
      </motion.p>

      <motion.div
        className="bg-blue-50 p-8 rounded-2xl shadow-md"
        variants={variants}
      >
        <h2 className="text-2xl font-bold text-[#051d40] mb-4">
          Benefits You Enjoy
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Mobile-first banking with lifestyle perks</li>
          <li>Higher transaction limits and spending power</li>
          <li>Exclusive debit & credit card options</li>
          <li>Personal financial planning tools</li>
        </ul>
      </motion.div>

      <motion.div className="text-center mt-10" variants={variants}>
        <button
          onClick={handleAppDownload}
          className="inline-block mt-8 px-6 py-3 bg-[#051d40] text-white font-semibold rounded-xl hover:bg-[#03306b] transition"
        >
          Download the App
        </button>
      </motion.div>
    </motion.div>
  );
}
