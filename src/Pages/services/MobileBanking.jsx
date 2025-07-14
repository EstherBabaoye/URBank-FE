import { useEffect, useState } from "react";
import {
  PhoneIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import badge1 from "../../assets/secured-by-ssl.png";
import badge2 from "../../assets/pci-compliant.png";
import badge3 from "../../assets/encrypted-badge.png";

export default function MobileBanking() {
  useEffect(() => {
    document.title = "Mobile Banking - URBank";
  }, []);

  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/support/live-chat");
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

  const features = [
    {
      icon: <PhoneIcon className="w-8 h-8 text-[#051d40]" />,
      title: "Bank Anytime, Anywhere",
      description:
        "Access your accounts, send money, and pay bills from your phone. Enjoy 24/7 convenience right at your fingertips.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-[#051d40]" />,
      title: "Top-Tier Security",
      description:
        "Your data and money are protected with biometric login, encryption, and real-time fraud alerts.",
    },
    {
      icon: <BoltIcon className="w-8 h-8 text-[#051d40]" />,
      title: "Fast & Reliable",
      description:
        "Experience lightning-fast transactions and real-time updates with minimal downtime.",
    },
  ];

  const faqs = [
    {
      question: "Is the mobile app available on Android and iOS?",
      answer:
        "Yes, you can download our app on both the Google Play Store and Apple App Store.",
    },
    {
      question: "Is it safe to bank on my phone?",
      answer:
        "Absolutely. We use multi-layered security including encryption, biometrics, and real-time fraud monitoring.",
    },
    {
      question: "Can I open a new account on the app?",
      answer:
        "Yes! You can open savings, current, and even business accounts directly through the app.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="mt-32 pt-16 sm:mt-16 mb-24 px-6 max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/mobile-banking.png"
            alt="Mobile Banking"
            className="rounded-2xl shadow-lg w-full"
          />
          <div>
            <h1 className="text-4xl font-bold text-[#051d40] mb-4">
              Mobile Banking
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your bank is always open. With our mobile banking app, you can
              manage your money with just a few taps—securely and effortlessly.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div>{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#051d40]">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleAppDownload}
              className="inline-block mt-8 px-6 py-3 bg-[#051d40] text-white font-semibold rounded-xl hover:bg-[#03306b] transition"
            >
              Download the App
            </button>
          </div>
        </div>

        {/* Demo Video */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#051d40] mb-4">
            Watch How It Works
          </h2>
          <p className="text-gray-600 mb-6">
            See how easy it is to bank on the go with URBank.
          </p>
          <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Mobile Banking Demo"
              frameBorder="0"
              allowFullScreen
              className="rounded-xl shadow-md w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#051d40] mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 cursor-pointer transition hover:shadow-md"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[#051d40]">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                )}
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

      {/* Floating Chat Support Button */}
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
