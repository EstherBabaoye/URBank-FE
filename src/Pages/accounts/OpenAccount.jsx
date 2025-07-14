import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  CreditCardIcon,
  BriefcaseIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function OpenAccount() {
  useEffect(() => {
    document.title = "Open an Account";
  }, []);

  const accountTypes = [
    {
      name: "Savings Account",
      path: "/accounts/savings",
      icon: <BanknotesIcon className="w-10 h-10 text-[#051d40]" />,
      description:
        "Build your future with a secure, interest-earning savings account. Ideal for daily savers and long-term planners.",
    },
    {
      name: "Current Account",
      path: "/accounts/current",
      icon: <CreditCardIcon className="w-10 h-10 text-[#051d40]" />,
      description:
        "For everyday banking. Enjoy seamless transactions, bill payments, and debit card access with no hassle.",
    },
    {
      name: "Business Account",
      path: "/accounts/business",
      icon: <BriefcaseIcon className="w-10 h-10 text-[#051d40]" />,
      description:
        "Manage your business finances with features tailored to entrepreneurs, SMEs, and corporate clients.",
    },
    {
      name: "Student Account",
      path: "/accounts/student",
      icon: <AcademicCapIcon className="w-10 h-10 text-[#051d40]" />,
      description:
        "Designed for students, this account comes with no maintenance fees, easy transfers, and learning tools.",
    },
  ];

  return (
    <div className="pt-16 mt-24 mb-24 px-6 max-w-6xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#051d40] mb-4">
          Choose the Right Account for You
        </h1>
        <p className="text-gray-600 text-lg">
          URBank offers flexible account options to match your lifestyle, goals, and business needs.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-16">
        {accountTypes.map(({ name, path, icon, description }) => (
          <div
            key={name}
            className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">{icon}<h2 className="text-2xl font-semibold text-[#051d40]">{name}</h2></div>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link
              to={path}
              className="text-[#051d40] underline hover:text-[#03306b] font-medium"
            >
              Learn more →
            </Link>
          </div>
        ))}
      </section>

      <div className="text-center">
        <Link
          to="/accounts/account-opening-form"
          className="inline-block bg-[#051d40] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#03306b] transition duration-300 transform hover:scale-105"
        >
          Open an Account Now
        </Link>
      </div>
    </div>
  );
}
