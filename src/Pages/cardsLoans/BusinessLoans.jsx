import { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  BriefcaseIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function BusinessLoans() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "URBank Business Loans";
  }, []);

  const features = [
    {
      icon: <BuildingOfficeIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Empower Your Growth",
      description: "Finance equipment, inventory, or expansion with ease.",
    },
    {
      icon: <BriefcaseIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Tailored for Businesses",
      description: "Flexible loan structures to fit your business needs.",
    },
    {
      icon: <BanknotesIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Competitive Rates",
      description: "Affordable interest rates with transparent terms.",
    },
  ];

  return (
    <div className="mt-28 pt-8 mb-24 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#051d40] mb-4">
          URBank Business Loans
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Fuel your ambition with financing designed for SMEs and corporate ventures.
          Whether you’re scaling or starting out — URBank has your back.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4 text-[#051d40]">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#051d40] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#123269] transition"
        >
          Get Started
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-[#051d40] mb-3">Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              Business loan applications are coming soon. Stay tuned!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-4 py-2 bg-[#051d40] text-white rounded-full hover:bg-[#123269] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
