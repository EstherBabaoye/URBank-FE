import { useEffect } from "react";
import { ChartBarIcon, BellAlertIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function TrackFinances() {
  useEffect(() => {
    document.title = "Track Finances";
  }, []);

  return (
    <div className="mt-32 pt-16 sm:mt-16 mb-24 px-6 max-w-6xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#051d40] mb-4">Track Your Finances Effortlessly</h1>
        <p className="text-lg text-gray-600">
          URBank helps you take control of your money with real-time insights, budgeting tools, and smart notifications.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <ChartBarIcon className="w-10 h-10 text-[#051d40] mx-auto mb-4" />
          <h3 className="font-semibold text-xl text-[#051d40] mb-2">Spending Insights</h3>
          <p className="text-gray-600 text-sm">
            Instantly visualize where your money goes with daily, weekly, and monthly breakdowns. Know your habits and improve them.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <CurrencyDollarIcon className="w-10 h-10 text-[#051d40] mx-auto mb-4" />
          <h3 className="font-semibold text-xl text-[#051d40] mb-2">Smart Budgeting</h3>
          <p className="text-gray-600 text-sm">
            Set savings goals, track budgets by category, and receive friendly nudges when you’re overspending.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <BellAlertIcon className="w-10 h-10 text-[#051d40] mx-auto mb-4" />
          <h3 className="font-semibold text-xl text-[#051d40] mb-2">Real-time Alerts</h3>
          <p className="text-gray-600 text-sm">
            Get instant notifications for transactions, balance changes, and suspicious activity — so you're always in the know.
          </p>
        </div>
      </section>

      <section className="bg-[#051d40] text-white p-10 rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Finance Made Simple</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Whether you're managing daily expenses or preparing for the future, URBank gives you the clarity and tools to grow confidently.
        </p>
        <a
          href="/accounts/open-account"
          className="inline-block bg-white text-[#051d40] font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition"
        >
          Get Started Now
        </a>
      </section>
    </div>
  );
}
