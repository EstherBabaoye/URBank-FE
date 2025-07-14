import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

export default function BusinessAccount() {
  useEffect(() => {
    document.title = "Business Account";
  }, []);

  return (
    <div className="pt-16 mt-24 mb-24 px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div
        className="rounded-xl overflow-hidden bg-cover bg-center mb-16 h-64 flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/business-account.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/50 absolute inset-0"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl font-bold text-[#051d40] mb-4 animate-slide-up">
            URBank Business Account
          </h1>

          <p className="text-gray-700 font-semibold text-lg animate-fade-in delay-200">
            Built to power your business operations, scale securely, and simplify payments.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 animate-fade-in">
        <FeatureCard
          Icon={BriefcaseIcon}
          title="Business Tools"
          desc="Access tailored features for entrepreneurs and corporate clients alike."
        />
        <FeatureCard
          Icon={ChartBarIcon}
          title="Financial Insights"
          desc="Track expenses, earnings, and projections with real-time dashboards."
        />
        <FeatureCard
          Icon={ShieldCheckIcon}
          title="Secure Transactions"
          desc="Robust fraud detection, encrypted logins, and regulatory compliance."
        />
        <FeatureCard
          Icon={DevicePhoneMobileIcon}
          title="Online Banking"
          desc="Manage payroll, bulk transfers, and invoicing from any device."
        />
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/accounts/account-opening-form"
          className="inline-block bg-[#051d40] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#03306b] transition duration-300 transform hover:scale-105"
        >
          Open a Business Account
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
