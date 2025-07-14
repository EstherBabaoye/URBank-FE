import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import smartCardImage from "../../assets/Smart Card.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import badge1 from "../../assets/secured-by-ssl.png";
import badge2 from "../../assets/pci-compliant.png";
import badge3 from "../../assets/encrypted-badge.png";

export default function SmartCards() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    document.title = "Smart Cards";
    AOS.init({ once: true });
  }, []);

  const benefits = [
    {
      title: "Contactless Payments",
      description:
        "Make fast, secure transactions with just a tap. No swiping, no PINs.",
    },
    {
      title: "Multi-Account Linking",
      description:
        "Link multiple accounts to a single card, and choose your source at checkout.",
    },
    {
      title: "Global Usability",
      description:
        "Use your Smart Card internationally at ATMs, stores, and online retailers.",
    },
    {
      title: "Spending Insights",
      description:
        "Track and manage your expenses in real time with detailed spending reports.",
    },
  ];

  const testimonials = [
    {
      name: "Ada O.",
      feedback:
        "This card is smarter than any I’ve used. Setup and tracking are seamless!",
    },
    {
      name: "Jide K.",
      feedback:
        "I love how I can freeze and unfreeze my card instantly. Very secure.",
    },
  ];

  const handleChatClick = () => {
    navigate("/support/live-chat");
  };

  return (
    <>
      <div className="mt-32 pt-16 sm:mt-16 mb-24 px-6 max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 items-center gap-12">
          <img
            src={smartCardImage}
            alt="Smart Card"
            className="rounded-2xl shadow-lg w-full"
            data-aos="fade-right"
          />
          <div data-aos="fade-left">
            <h1 className="text-4xl font-bold text-[#051d40] mb-4">
              Smart Cards by URBank
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Our Smart Cards go beyond basic banking. They’re secure,
              intelligent, and designed for modern-day convenience.
            </p>
            <button
              onClick={() => setShowMore(true)}
              className="px-6 py-3 bg-[#051d40] text-white font-semibold rounded-xl hover:bg-[#03306b] hover:scale-105 transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Reveal Section */}
        {showMore && (
          <div
            className="bg-blue-50 p-8 rounded-xl shadow space-y-4"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-bold text-[#051d40]">
              What Makes URBank Smart Cards Different?
            </h2>
            <p className="text-gray-700">
              Unlike traditional cards, URBank Smart Cards adapt to your
              lifestyle. Real-time spending control, advanced encryption,
              biometric login, and instant freeze/unfreeze options.
            </p>
            <p className="text-gray-700">
              Think of it as your digital finance assistant, in your pocket.
            </p>
          </div>
        )}

        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold text-center text-[#051d40] mb-10">
            Why Choose a Smart Card?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 hover:shadow-md transition"
                data-aos="zoom-in"
                data-aos-delay={i * 150}
              >
                <h3 className="text-xl font-semibold text-[#051d40] mb-2">
                  {b.title}
                </h3>
                <p className="text-gray-600">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-[#051d40] mb-4">
              Customer Feedback
            </h2>
            <div className="space-y-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-white border border-blue-100 p-4 rounded-xl shadow"
                  data-aos="fade-up"
                  data-aos-delay={i * 200}
                >
                  <p className="text-gray-700 italic">“{t.feedback}”</p>
                  <p className="text-sm text-[#051d40] font-bold mt-2">
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Trust Badges */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-[#051d40] mb-4">
              Your Trust, Our Responsibility
            </h2>
            <p className="text-gray-600 mb-6">
              We meet the highest global standards of security and compliance.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <img src={badge1} alt="SSL Secured" className="h-12" />
              <img src={badge2} alt="PCI DSS Compliant" className="h-12" />
              <img src={badge3} alt="AES Encryption" className="h-12" />
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-[#051d40] mb-4">
            Smart Cards vs Regular Cards
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-xl">
              <thead className="bg-[#051d40] text-white">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3">URBank Smart Card</th>
                  <th className="px-4 py-3">Regular Card</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {[
                  ["Biometric Login", "✅", "❌"],
                  ["Real-Time Spend Alerts", "✅", "❌"],
                  ["Freeze/Unfreeze Instantly", "✅", "⚠️ Manual Call"],
                  ["Multi-Account Linking", "✅", "❌"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-t"
                    data-aos="fade-up"
                    data-aos-delay={i * 150}
                  >
                    <td className="px-4 py-3 font-medium">{row[0]}</td>
                    <td className="px-4 py-3">{row[1]}</td>
                    <td className="px-4 py-3">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-[#051d40] mb-4">
            Ready to Get Smarter with Your Card?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Upgrade to a smarter, safer banking experience. Order your URBank
            Smart Card today.
          </p>
          <a
            href="/cards-loans/applycard"
            className="inline-block px-6 py-3 bg-[#051d40] text-white font-semibold rounded-xl hover:bg-[#03306b] hover:scale-105 transition"
          >
            Apply Now
          </a>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={handleChatClick}
        className="fixed bottom-20 right-4 bg-[#051d40] text-white px-4 py-3 rounded-full shadow-lg z-50 hover:bg-[#03306b] transition"
        aria-label="Open Live Chat"
      >
        💬 Chat Support
      </button>
    </>
  );
}
