import { useEffect } from "react";
import {
  FaUniversity,
  FaBuilding,
  FaBolt,
  FaMobileAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Added this

export default function Frequent() {
  const navigate = useNavigate(); // ✅ Added this

  useEffect(() => {
    document.title = "Frequent Actions | URBank";
  }, []);

  const actions = [
    {
      label: "Frequent Transfers (URBank)",
      icon: <FaUniversity />,
      onClick: () => alert("Navigating to frequent URBank transfers..."),
    },
    {
      label: "Frequent Transfers (Other Banks)",
      icon: <FaBuilding />,
      onClick: () =>
        alert("Navigating to frequent transfers to other banks..."),
    },
    {
      label: "Frequent Bills",
      icon: <FaBolt />,
      onClick: () => alert("Navigating to frequent bill payments..."),
    },
    {
      label: "Frequent Airtime/Data",
      icon: <FaMobileAlt />,
      onClick: () => alert("Navigating to frequent airtime/data purchases..."),
    },
  ];

  return (
    <section className="min-h-screen bg-[#f9fafb] px-6">
      {/* Header */}
      <div className="bg-[#051d40] text-white px-8 py-6 flex items-center gap-4">
        <button
          onClick={() => {
            if (window.history.state && window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/dashboard");
            }
          }}
          className="text-lg"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-xl font-semibold">Frequent Transactions</h1>
      </div>

      <div className="grid grid-cols-1 p-4 sm:grid-cols-1 mt-4 gap-6 max-w-xl mx-auto">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-4 px-8 py-6 bg-[#72cded] text-[#051d40] hover:text-[#fbbf24] rounded-lg shadow-md transition duration-200"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
