import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPen, FaUniversity } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";

export default function Transfers() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    document.title = "Transfer | URBank";
  }, []);

  const favorites = [{ initials: "BO" }, { initials: "BO" }];

  const localTransfers = [
    { label: "To URBank Account", icon: "URB", path: "/URB-transfer" },
    { label: "To Other Bank Account", icon: <FaUniversity />, path: "/other" },
    {
      label: "Send To Saved Beneficiary",
      icon: <FaUniversity />,
      path: "/beneficiary",
    },
  ];

  const foreignTransfers = [
    { label: "FX Sales", icon: <HiCurrencyDollar className="text-xl" /> },
  ];

  const handleClick = (label, path) => {
    if (label === "FX Sales") {
      setModalMessage("Coming soon...");
      setShowModal(true);
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <section className="min-h-screen bg-[#f9fafb] pt-10 pb-20 px-4">
      {/* Header */}
      <div className="bg-[#051d40] text-white px-8 py-6 flex items-center gap-4  -mt-10 mb-6">
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
        <h1 className="text-xl font-semibold">User Profile</h1>
      </div>
      {/* Favorites */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-[#051d40]">MY FAVORITES</h2>
        <button className="text-xs flex items-center gap-1 text-[#051d40] hover:text-[#fbbf24]">
          <FaPen className="text-sm" /> Edit
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {favorites.map((fav, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md"
          >
            <div className="bg-yellow-400 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">
              {fav.initials}
            </div>
          </div>
        ))}
      </div>

      {/* Local Currency Transfers */}
      <h2 className="text-sm font-bold text-[#051d40] mb-2">
        LOCAL CURRENCY TRANSFERS
      </h2>
      <div className="space-y-3 mb-6">
        {localTransfers.map(({ label, icon, path }, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(label, path)}
            className="w-full flex justify-between items-center bg-white rounded-md shadow-sm px-4 py-3 text-[#051d40] hover:bg-[#f4fcff] transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 text-yellow-500 p-2 rounded-full text-lg">
                {typeof icon === "string" ? <span>{icon}</span> : icon}
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
            <FaArrowRight className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Foreign Currency Transfers */}
      <h2 className="text-sm font-bold text-[#051d40] mb-2">
        FOREIGN CURRENCY TRANSFERS
      </h2>
      <div className="space-y-3">
        {foreignTransfers.map(({ label, icon }, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(label)}
            className="w-full flex justify-between items-center bg-white rounded-md shadow-sm px-4 py-3 text-[#051d40] hover:bg-[#f4fcff] transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 text-yellow-500 p-2 rounded-full">
                {icon}
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
            <FaArrowRight className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80 shadow-md text-center">
            <h2 className="text-lg font-semibold text-[#051d40] mb-3">
              Notice
            </h2>
            <p className="text-sm text-gray-700">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 px-4 py-2 bg-[#fbbf24] text-[#051d40] font-semibold rounded hover:bg-yellow-300 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
