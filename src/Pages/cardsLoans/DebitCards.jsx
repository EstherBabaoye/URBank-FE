import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CreditCardIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function DebitCards() {
  const [expandedCard, setExpandedCard] = useState(null); // ✅ Moved inside the function

  useEffect(() => {
    document.title = "URBank Debit Cards";
  }, []);

  const toggleCard = (name) => {
    setExpandedCard((prev) => (prev === name ? null : name));
  };

  const cardOptions = [
    {
      name: "Naira Mastercard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
      description:
        "The Naira MasterCard is ideal for local and international transactions in Naira. Accepted globally.",
    },
    {
      name: "Naira Visa Card",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
      description:
        "Shop seamlessly with your Naira Visa card. It works both locally and for online global payments.",
    },
    {
      name: "Verve",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Verve_Card_logo.svg/320px-Verve_Card_logo.svg.png",
      description:
        "Verve is a locally accepted debit card perfect for domestic payments and ATM withdrawals.",
    },
    {
      name: "Dollar Mastercard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
      description:
        "The Dollar MasterCard is designed for international transactions and online purchases in USD.",
    },
    {
      name: "Dollar Visa Card",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
      description:
        "Spend in dollars anywhere in the world. Ideal for travelers and global shoppers.",
    },
  ];

  const features = [
    {
      icon: <CreditCardIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Seamless Payments",
      description:
        "Shop online or in-store worldwide with ease and full security.",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-[#051d40]" />,
      title: "24/7 Fraud Protection",
      description:
        "Advanced security to protect your transactions and identity.",
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Cashback & Rewards",
      description: "Earn rewards every time you swipe your debit card.",
    },
  ];

  return (
    <div className="mt-28 pt-8 mb-24 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#051d40] mb-4">
          URBank Debit Cards
        </h1>
        <p className="text-gray-600 text-lg">
          Simple, secure, and smart. Your key to fast, safe, and rewarding
          transactions.
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

      {/* Card Options */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-bold text-[#051d40] mb-4">Card Options</h2>
        <p className="text-gray-600 mb-6">
          Choose from a variety of debit cards tailored to your needs.
        </p>
        <ul className="grid sm:grid-cols-2 gap-4 text-left px-4">
          {cardOptions.map((card) => (
            <li
              key={card.name}
              onClick={() => toggleCard(card.name)}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={card.logo}
                  alt={`${card.name} logo`}
                  className="h-6 w-auto"
                />
                <span className="text-[#051d40] font-medium">{card.name}</span>
              </div>
              {expandedCard === card.name && (
                <p className="text-sm text-gray-600 mt-3">{card.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/cards-loans/applycard"
          className="bg-[#051d40] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#123269] transition"
        >
          Get Your Debit Card
        </Link>
      </div>
    </div>
  );
}
