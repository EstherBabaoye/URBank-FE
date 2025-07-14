import { useEffect } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const timelineData = [
  {
    year: "2018",
    text: "URBank was founded with a vision to modernize banking in Nigeria.",
  },
  {
    year: "2019",
    text: "Launched digital savings and mobile banking platform nationwide.",
  },
  {
    year: "2021",
    text: "Opened 50+ smart branches across major cities in Nigeria.",
  },
  {
    year: "2023",
    text: "Became the fastest-growing financial institution in West Africa.",
  },
];

const variantsLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const variantsRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function AboutUs() {
  useEffect(() => {
    document.title = "About URBank";
  }, []);

  const leadershipTeam = [
    {
      name: "Esther Babaoye",
      role: "CEO & Group Managing Director",
      image: "/esther-babaoye.jpg"
,
    },
    {
      name: "Timilehin Amaechi",
      role: "Chief Financial Officer",
      image: "/images/leadership/timilehin.jpg",
    },
    {
      name: "Bidemi Akinola",
      role: "Chief Technology Officer",
      image: "/images/leadership/bidemi.jpg",
    },
  ];

  const boardMembers = [
    {
      name: "Praise Olaseni",
      role: "Chairman",
      image: "/images/board/praise.jpg",
    },
    {
      name: "Mary Nwikwu",
      role: "Independent Director",
      image: "/images/board/mary.jpg",
    },
    {
      name: "Chibuikem Ojukwu",
      role: "Non-Executive Director",
      image: "/images/board/chibuikem.jpg",
    },
    {
      name: "Yahaya Bello",
      role: "Legal Advisor",
      image: "/images/board/yahaya.jpg",
    },
  ];

  return (
    <main className="pt-20 mt-24 mb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Introduction */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
        className="text-center mb-16"
      >
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl font-extrabold text-[#051d40] mb-6"
        >
          About URBank
        </motion.h1>
        <motion.p
          variants={item}
          className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto"
        >
          URBank is a next-generation commercial bank built on the principles of
          transparency, customer empowerment, and innovative financial
          solutions. We are committed to making banking simple, accessible, and
          rewarding for everyone.
        </motion.p>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
        className="grid sm:grid-cols-2 gap-12"
      >
        <motion.div
          variants={item}
          className="bg-[#f1f5f9] p-8 rounded-2xl shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-[#051d40] mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To empower individuals and businesses to take control of their
            finances by providing secure, smart, and customer-centric banking
            services tailored to their needs.
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="bg-[#f1f5f9] p-8 rounded-2xl shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-[#051d40] mb-3">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To become Africa’s most trusted and technologically advanced
            financial institution, driving economic growth and inclusive
            prosperity.
          </p>
        </motion.div>
      </motion.section>

      <section className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#051d40] text-center mb-12">
          Our Journey
        </h2>

        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2  w-1 bg-[#cbd5e1] hidden md:block"></div>

        <ul className="relative space-y-12 z-0 before:content-[''] before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-[#cbd5e1]">
          {[
            {
              year: "2018",
              text: "URBank was founded with a vision to modernize banking in Nigeria.",
            },
            {
              year: "2019",
              text: "Launched digital savings and mobile banking platform nationwide.",
            },
            {
              year: "2021",
              text: "Opened 50+ smart branches across major cities in Nigeria.",
            },
            {
              year: "2023",
              text: "Became the fastest-growing financial institution in West Africa.",
            },
          ].map(({ year, text }, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.li
                key={idx}
                className={`flex flex-col md:flex-row items-center justify-between w-full ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={isLeft ? variantsLeft : variantsRight}
              >
                <div className="w-full z-10 md:w-3/4 px-4">
                  <div className="bg-[#f1f5f9] text-[#051d40] p-4 rounded-xl shadow-lg border border-[#051d40]">
                    <div className="text-xl font-bold mb-2">{year}</div>
                    <p className="text-md leading-relaxed">{text}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* Leadership & Team */}
      <section>
        <h2 className="text-3xl font-bold text-[#051d40] text-center mb-10">
          Meet Our Leadership
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {leadershipTeam.map(({ name, role, image }, idx) => (
            <motion.div
              key={idx}
              variants={item}
              initial="hidden"
              animate="show"
              className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <img
                src={image}
                alt={`${name}'s photo`}
                className="h-24 w-24 mx-auto rounded-full object-cover mb-4 shadow"
              />

              <h3 className="text-lg font-semibold text-[#051d40]">{name}</h3>
              <p className="text-gray-600">{role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section>
        <h2 className="text-3xl font-bold text-[#051d40] text-center mb-10">
          Board of Directors
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {boardMembers.map(({ name, role, image }, idx) => (
            <motion.div
              key={idx}
              variants={item}
              initial="hidden"
              animate="show"
              className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <img
                src={image}
                alt={`${name}'s photo`}
                className="h-20 w-20 mx-auto rounded-full object-cover mb-3 shadow"
              />

              <h3 className="text-md font-semibold text-[#051d40]">{name}</h3>
              <p className="text-gray-600 text-sm">{role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-20">
        <motion.h3
          variants={item}
          initial="hidden"
          animate="show"
          className="text-2xl sm:text-3xl font-bold text-[#051d40] mb-4"
        >
          Ready to take control of your finances?
        </motion.h3>
        <motion.p
          variants={item}
          initial="hidden"
          animate="show"
          className="text-gray-600 mb-6"
        >
          Join thousands of Nigerians who trust URBank for their personal and
          business banking needs.
        </motion.p>
        <motion.a
          href="/accounts/open-acc"
          variants={item}
          initial="hidden"
          animate="show"
          className="inline-block bg-[#72cded] hover:bg-[#fbbf24] text-[#051d40] font-bold py-3 px-6 rounded-full transition"
        >
          Open an Account
        </motion.a>
      </section>
    </main>
  );
}
