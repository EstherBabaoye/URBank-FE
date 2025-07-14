import { useEffect, useState } from "react";
import {
  FaBolt, FaTrash, FaBoxOpen, FaSchool, FaCreditCard, FaWifi,
  FaPiggyBank, FaFileInvoice, FaHandsHelping, FaPrayingHands,
  FaLandmark, FaGlobe, FaTv, FaShoppingBag, FaStore, FaTags,
  FaMobileAlt, FaKey, FaShieldAlt, FaSimCard, FaCar, FaHotel
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const billCategories = [
  { label: "Electricity", icon: <FaBolt /> },
  { label: "Waste bill", icon: <FaTrash /> },
  { label: "Products and Services", icon: <FaBoxOpen /> },
  { label: "School & Exam", icon: <FaSchool /> },
  { label: "Credit and Loans", icon: <FaCreditCard /> },
  { label: "Internet Services", icon: <FaWifi /> },
  { label: "Financial Services", icon: <FaPiggyBank /> },
  { label: "Invoice Payments", icon: <FaFileInvoice /> },
  { label: "Aid Grants and Donations", icon: <FaHandsHelping /> },
  { label: "Religious", icon: <FaPrayingHands /> },
  { label: "Government Payments", icon: <FaLandmark /> },
  { label: "Embassies", icon: <FaGlobe /> },
  { label: "TV (Others)", icon: <FaTv /> },
  { label: "Shopping", icon: <FaShoppingBag /> },
  { label: "Online Shopping", icon: <FaStore /> },
  { label: "Merchant Payments", icon: <FaTags /> },
  { label: "Blackberry", icon: <FaMobileAlt /> },
  { label: "PayChoice", icon: <FaKey /> },
  { label: "Commerce Retail Transactions", icon: <FaShieldAlt /> },
  { label: "Prepaid Card Services", icon: <FaSimCard /> },
  { label: "International Airtime", icon: <FaGlobe /> },
  { label: "Transport & Toll", icon: <FaCar /> },
  { label: "Travel & Hotel", icon: <FaHotel /> },
];

export default function Bills() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    document.title = "Bill Payments | URBank";
  }, []);

  const handleClick = (label) => {
    setSelectedLabel(label);
    setShowModal(true);
  };

  return (
    <section className="min-h-screen  pt-10 pb-20 px-4 bg-[#f9fafb]">
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
        <h1 className="text-xl font-semibold">BILLS PAYMENT</h1>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {billCategories.map(({ label, icon }, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(label)}
            className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-lg shadow-sm hover:bg-[#f4fcff] transition"
          >
            <div className="text-yellow-500 text-2xl">{icon}</div>
            <p className="text-xs text-[#051d40] font-medium text-center">{label}</p>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md text-center shadow-lg w-[90%] max-w-xs">
            <h2 className="text-lg font-bold text-[#051d40] mb-2">Coming Soon</h2>
            <p className="text-sm text-gray-600 mb-4">{selectedLabel} will be available shortly.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-[#fbbf24] text-[#051d40] font-semibold rounded-md hover:bg-yellow-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
