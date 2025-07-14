import React, { useState, useEffect } from "react";
import HeroCarousel from "../Components/HeroCarousel";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const featureCards = [
  {
    image: "/savings-account.png",
    title: "Savings Account",
    text: "Secure your future with high-interest savings plans tailored to your goals.",
    link: "/accounts/savings",
  },
  {
    image: "/current-account.png",
    title: "Current Account",
    text: "Enjoy seamless day-to-day transactions with unlimited access to your funds.",
    link: "/accounts/current",
  },
  {
    image: "/open-online.png",
    title: "Open an Account Online",
    text: "Join URBank in minutes—anytime, anywhere. All you need is your phone.",
    link: "/accounts/open-acc",
  },
  {
    image: "/debit-card.png",
    title: "Smart Debit Cards",
    text: "Pay on the go with stylish, secure cards accepted worldwide.",
    link: "/cards-loans/debit-cards",
  },
  {
    image: "/personal-loan.png",
    title: "Personal Loans",
    text: "Get the funds you need with flexible repayments and quick approval.",
    link: "/cards-loans/personal-loans",
  },
  {
    image: "/business-banking.png",
    title: "Business Banking",
    text: "Empower your business with tools and support built for growth.",
    link: "/business",
  },
  {
    image: "/mobile-banking.png",
    title: "Mobile Banking",
    text: "Manage your money from anywhere with our user-friendly mobile app.",
    link: "/services/mobile-banking",
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  useEffect(() => {
    document.title = "Home | Your Bank, Your Money, Your Future";
  }, []);

  const [startIndex, setStartIndex] = useState(0);

  const [showMap, setShowMap] = useState(false);

  const next = () => {
    if (startIndex + 3 < featureCards.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="mt-20 sm:mt-16 mb-24">
      <HeroCarousel />

      {/* Upper Grid Section */}
      <div className="max-w-6xl mx-auto mt-12 px-4 flex flex-col lg:flex-row gap-8">
        {/* Left Cards */}
        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 flex-1"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {[
            {
              title: "Private Banking",
              desc: "Product offerings designed to take the hassle away from managing your money.",
              link: "/private-banking",
            },
            {
              title: "Affluent Banking",
              desc: "Download our mobile app and experience simpler, more reliable and convenient banking.",
              link: "/affluent-banking",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white shadow-md border border-gray-200 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-base">{card.desc}</p>
              </div>
              <Link
                to={card.link}
                className="mt-6 bg-[#72cded] hover:text-[#fbbf24] text-[#051d40] text-sm sm:text-base md:text-lg font-semibold py-3 rounded-md transition text-center"
              >
                LEARN MORE
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Yellow Stack */}
        <div className="flex flex-col gap-4 w-full sm:w-72 lg:w-[300px]">
          {[
            {
              icon: "💳",
              title: "CARDS",
              type: "link",
              path: "/cards-loans/smart-cards",
            },
            {
              icon: "📍",
              title: "BRANCH LOCATOR",
              type: "popup",
              onClick: () => setShowMap(true),
            },
            {
              icon: "📊",
              title: "FINANCIAL REPORTS",
              type: "link",
              path: "/support/financial-reports",
            },
          ].map((item, index) =>
            item.type === "link" ? (
              <Link
                key={index}
                to={item.path}
                className="bg-[#72cded] text-[#051d40] font-bold text-lg rounded-lg flex items-center gap-4 p-4 shadow-md hover:bg-[#5bb8d3] transition"
              >
                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center text-xl shadow-sm">
                  {item.icon}
                </div>
                <span>{item.title}</span>
              </Link>
            ) : (
              <button
                key={index}
                onClick={item.onClick}
                className="bg-[#72cded] text-[#051d40] font-bold text-lg rounded-lg flex items-center gap-4 p-4 shadow-md hover:bg-[#5bb8d3] transition"
              >
                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center text-xl shadow-sm">
                  {item.icon}
                </div>
                <span>{item.title}</span>
              </button>
            )
          )}
        </div>

        {/* Map Pop-up Modal */}
        {showMap && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-3xl relative">
              <h2 className="text-xl font-bold mb-4 text-[#051d40]">
                Find a Branch Near You
              </h2>
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1160OarudgtG5qN4-xnIpX0wuppCQ6xo&ehbc=2E312F"
                className="w-full h-[500px] rounded-xl shadow-lg border"
                allowFullScreen=""
                loading="lazy"
                title="URBank Branch Locations"
              />

              <button
                onClick={() => setShowMap(false)}
                className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video */}
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <video
          className="w-full rounded-xl shadow-lg"
          src="/bankvideo1.mp4"
          controls
          autoPlay
          muted
          loop
        />
      </div>

      {/* Feature Card Slider */}
      <section className="max-w-6xl mx-auto mt-20 px-4">
        {/* Header + Progress */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 px-2 lg:px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#051d40] leading-tight mb-4 lg:mb-0 text-center lg:text-left">
            Explore our world of
            <br className="hidden md:block" />
            absolute financial freedom
          </h2>

          {/* Progress and Arrows */}
          <div className="flex items-center gap-4 w-full lg:w-1/2 max-w-lg">
            <div className="relative flex-1 h-[2px] bg-gray-300 rounded">
              <div
                className="absolute left-0 top-0 h-[2px] bg-[#72cded] rounded"
                style={{
                  width: `${((startIndex + 3) / featureCards.length) * 100}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-[#72cded] border-2 border-[#051d40] flex items-center justify-center"
              >
                <span className="text-[#051d40] text-xl font-bold">◄</span>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-[#72cded] border-2 border-[#051d40] flex items-center justify-center"
              >
                <span className="text-[#051d40] text-xl font-bold">►</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card Scroll Section */}
        <motion.div
          className="relative overflow-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${startIndex * 320}px)` }}
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="w-[280px] sm:w-[320px] mx-4 sm:mx-6 shrink-0"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="p-5">
                    {card.link ? (
                      <Link
                        to={card.link}
                        className="font-bold text-lg text-gray-900 mb-2 hover:text-[#72cded] transition block"
                      >
                        {card.title}
                      </Link>
                    ) : (
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {card.title}
                      </h3>
                    )}
                    <p className="text-gray-600 text-sm">{card.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
