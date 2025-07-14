import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function SavingsAccount() {
  useEffect(() => {
    document.title = "Savings Account";
  }, []);

  return (
    <div className="pt-16 mt-24 mb-24 px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div
        className="rounded-xl overflow-hidden bg-cover bg-center mb-16 h-64 flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/savings-account.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/50 absolute inset-0"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl font-bold text-[#051d40] mb-4 animate-slide-up">
            URBank Savings Account
          </h1>

          <p className="text-gray-700 font-semibold text-lg animate-fade-in delay-200">
            Designed to help you grow your money effortlessly while keeping it
            secure.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 animate-fade-in">
        <FeatureCard
          Icon={CurrencyDollarIcon}
          title="Earn Competitive Interest"
          desc="Watch your money grow with interest rates that reward you for saving consistently."
        />
        <FeatureCard
          Icon={DevicePhoneMobileIcon}
          title="24/7 Account Access"
          desc="Monitor and manage your funds from anywhere with our secure mobile and internet banking."
        />
        <FeatureCard
          Icon={ShieldCheckIcon}
          title="Safe & Secure"
          desc="Fully regulated and insured—your savings are protected and in trusted hands."
        />
        <FeatureCard
          Icon={CreditCardIcon}
          title="Free Debit Card"
          desc="Get a complimentary card with instant transaction alerts and ATM access."
        />
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/accounts/account-opening-form"
          className="inline-block bg-[#051d40] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#03306b] transition duration-300 transform hover:scale-105"
        >
          Open Your Savings Account
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ Icon, title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-[#051d40] mr-3" />
        <h3 className="text-xl font-semibold text-[#051d40]">{title}</h3>
      </div>
      <p className="text-gray-700">{desc}</p>
    </div>
  );
}
