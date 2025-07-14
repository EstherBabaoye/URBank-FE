import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import secureImage from "../../assets/Secure Banking.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SecureBanking() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Secure Banking";
    AOS.init({ once: true });
  }, []);

  const features = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-[#051d40]" />,
      title: "End-to-End Encryption",
      description:
        "All transactions and personal data are secured with military-grade encryption from start to finish.",
    },
    {
      icon: <LockClosedIcon className="w-8 h-8 text-[#051d40]" />,
      title: "Biometric & Multi-Factor Authentication",
      description:
        "Use fingerprint, facial recognition, and one-time passcodes for secure logins and transfers.",
    },
    {
      icon: <EyeSlashIcon className="w-8 h-8 text-[#051d40]" />,
      title: "Real-Time Fraud Monitoring",
      description:
        "We monitor every transaction for unusual activity and alert you instantly of any suspicious behavior.",
    },
  ];

  const testimonials = [
    {
      name: "Fatima A.",
      quote:
        "I feel totally secure banking with URBank. Their alerts saved me from fraud last month!",
    },
    {
      name: "David E.",
      quote:
        "The fingerprint login is super fast and I never worry about my account being hacked again.",
    },
  ];

  const handleChatClick = () => {
    navigate("/support/live-chat");
  };

  return (
    <>
      <div className="mt-32 pt-20 sm:mt-16 mb-24 px-6 max-w-7xl mx-auto space-y-24">
        {/* Hero Section with Background */}
        <div
          className="relative bg-cover bg-center bg-no-repeat text-white py-28 px-6 rounded-2xl shadow-lg"
          style={{
            backgroundImage: `url(${secureImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/80 rounded-2xl" />

          {/* Content on top */}
          <div className="relative z-10 p-6 md:p-12 max-w-3xl mx-auto">
            <h1 className="text-4xl text-[#051d40] font-bold mb-4">
              Secure Banking
            </h1>
            <p className="text-lg font-semibold text-[#051d40]">
              Your safety is our top priority. URBank protects your money and
              information with cutting-edge security technologies and continuous
              monitoring.
            </p>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow p-6 hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#051d40] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Video Walkthrough */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#051d40] mb-4">
            Watch How We Protect You
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            A short video showing how URBank ensures your money and data stay
            safe at all times.
          </p>
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Security Video"
              allowFullScreen
              className="rounded-xl shadow-md w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Testimonials & Trust Badges */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-[#051d40] mb-4">
              Trusted by Customers
            </h2>
            <div className="space-y-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 p-4 rounded-lg shadow"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                >
                  <p className="text-gray-700 italic">“{t.quote}”</p>
                  <p className="text-sm text-[#051d40] font-bold mt-2">
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/trust-badges.png"
              alt="Security Certifications"
              className="max-w-xs"
            />
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#051d40] mb-6">
            URBank vs. Other Banks
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left shadow-md rounded-lg">
              <thead className="bg-[#051d40] text-white">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3">URBank</th>
                  <th className="px-4 py-3">Other Banks</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {[
                  ["Biometric Login", "✅", "❌"],
                  ["Real-Time Alerts", "✅", "✅"],
                  ["Encryption Grade", "256-bit AES", "128-bit SSL"],
                  ["Device Linking Control", "✅", "❌"],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-t"
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
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

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-[#051d40] mb-4">
            Ready for Truly Secure Mobile Banking?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Experience the power of protection + performance. Explore our mobile
            banking features.
          </p>
          <a
            href="/services/mobile-banking"
            className="inline-block px-6 py-3 bg-[#051d40] text-white font-semibold rounded-xl hover:bg-[#03306b] transition"
          >
            Go to Mobile Banking
          </a>
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
