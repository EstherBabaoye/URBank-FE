import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bannerImage from "../assets/Smart Card.jpg"; // Ensure the file exists and path correct

export default function Personal() {
  useEffect(() => {
    document.title = "URBank Personal Banking";
  }, []);

  const features = [
    {
      title: "Savings Account",
      image: "/savings-account.png",
      description:
        "Start building your future with a secure, interest-earning savings account. Enjoy easy access, mobile deposits, and peace of mind.",
      link: "/accounts/savings",
    },
    {
      title: "Current Account",
      image: "/current-account.png",
      description:
        "Simplify your everyday banking with a current account. Ideal for frequent transactions, utility payments, and flexible spending.",
      link: "/accounts/current",
    },
    {
      title: "Student Account",
      image: "/student.jpg",
      description:
        "Empowering students with smart financial tools. No maintenance fees, budgeting features, and campus perks just for you.",
      link: "/accounts/student",
    },
    {
      title: "Personal Loans",
      image: "/personal-loan.png",
      description:
        "Get funds when you need them most — whether for emergencies, education, or a dream vacation. Quick approval, flexible repayment.",
      link: "/cards-loans/personal-loans",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    offscreenLeft: { opacity: 0, x: -100 },
    offscreenRight: { opacity: 0, x: 100 },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 },
    },
  };

  return (
    <div className="mt-24 mb-24 px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Hero Banner */}
      <div
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
          >
            Personal Banking with URBank
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg sm:text-xl max-w-xl md:max-w-2xl mx-auto"
          >
            Secure. Convenient. Designed just for you.
          </motion.p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-2 sm:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-[#051d40] mb-4"
          >
            Explore Our Personal Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto"
          >
            From saving for tomorrow to managing your expenses today — URBank
            offers the tools and flexibility you need for every life stage.
          </motion.p>
        </div>

        {features.map((features, index) => (
          <motion.div
            key={index}
            initial={index % 2 === 0 ? "offscreenLeft" : "offscreenRight"}
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center mb-16 gap-6 md:gap-8`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={features.image}
                alt={features.title}
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-xl shadow"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-10 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#051d40] mb-4">
                {features.title}
              </h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base">
                {features.description}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={features.link}
                  className="inline-block bg-[#72cded] text-white font-semibold px-4 py-2 sm:px-5 sm:py-3 rounded-md hover:bg-[#fbbf24] hover:text-[#051d40] transition-all duration-300 text-sm sm:text-base"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
