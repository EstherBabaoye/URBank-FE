import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCardIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  GiftIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function CreditCards() {
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    document.title = "URBank Credit Cards";
  }, []);

  const toggleCard = (name) => {
    setExpandedCard((prev) => (prev === name ? null : name));
  };

  const cardOptions = [
    {
      name: "Basic",
      icon: <CreditCardIcon className="h-6 w-6 text-[#051d40]" />,
      description:
        "Our Basic Credit Card is perfect for everyday purchases with low interest and no annual fees.",
    },
    {
      name: "Rewards",
      icon: <GiftIcon className="h-6 w-6 text-[#051d40]" />,
      description:
        "Earn cashback, points, and travel rewards every time you use your Rewards Credit Card.",
    },
    {
      name: "Savings",
      icon: <BanknotesIcon className="h-6 w-6 text-[#051d40]" />,
      description:
        "Get the most out of your savings with our low-interest Savings Credit Card. Ideal for budgeting.",
    },
  ];

  const features = [
    {
      icon: <CreditCardIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Smart Spending",
      description: "Spend confidently with control and flexibility.",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Security First",
      description: "Built-in fraud protection and real-time alerts.",
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8 text-[#051d40]" />,
      title: "Global Acceptance",
      description: "Accepted in stores and online, worldwide.",
    },
  ];

  return (
    <div className="mt-28 pt-8 mb-24 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#051d40] mb-4">
          URBank Credit Cards
        </h1>
        <p className="text-gray-600 text-lg">
          Flexible. Secure. Rewarding. Get the credit card that fits your
          lifestyle.
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
          Choose the credit card that matches your needs.
        </p>
        <ul className="grid sm:grid-cols-2 gap-4 text-left px-4">
          {cardOptions.map((card) => (
            <li
              key={card.name}
              onClick={() => toggleCard(card.name)}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {card.icon}
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
          Apply for a Credit Card
        </Link>
      </div>
    </div>
  );
}
