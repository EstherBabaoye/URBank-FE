import { useState, useEffect } from "react";
import {
  QrCodeIcon,
  PhoneIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";

export default function CardlessWithdrawal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "URBank Cardless & QR Services";
  }, []);

  const cardlessFeatures = [
    {
      icon: <QrCodeIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Generate Code",
      description: "Use the URBank app to generate a secure withdrawal code.",
    },
    {
      icon: <PhoneIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Share or Scan",
      description: "Send the code to someone or scan it at an ATM.",
    },
    {
      icon: <BuildingLibraryIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Withdraw Anywhere",
      description: "Access your cash from any URBank ATM — no card needed.",
    },
  ];

  const qrPaymentFeatures = [
    {
      icon: <DevicePhoneMobileIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Tap or Scan",
      description: "Make payments by simply tapping your phone or scanning a QR code.",
    },
    {
      icon: <WifiIcon className="h-8 w-8 text-[#051d40]" />,
      title: "No Network? No Problem",
      description: "QR works offline. Just scan and go.",
    },
    {
      icon: <QrCodeIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Secure & Instant",
      description: "All payments are encrypted and processed in seconds.",
    },
  ];

  return (
    <div className="mt-28 pt-8 mb-24 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#051d40] mb-4">
          URBank Cardless & QR Services
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Experience the freedom of banking without cards. Whether you’re
          withdrawing cash or making a payment, URBank’s upcoming cardless and
          QR solutions have you covered.
        </p>
      </div>

      {/* Cardless Features */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-[#051d40] text-center mb-6">
          Cardless Withdrawal Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cardlessFeatures.map((feature, index) => (
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
      </div>

      {/* QR Payment Features */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-[#051d40] text-center mb-6">
          Contactless / QR Payments
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {qrPaymentFeatures.map((feature, index) => (
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
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#051d40] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#123269] transition"
        >
          Explore These Features
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-[#051d40] mb-3">Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              Cardless withdrawals and QR payments will be available soon.
              Stay tuned!
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
