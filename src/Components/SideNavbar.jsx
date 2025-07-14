import {
  FaUserCircle,
  FaHistory,
  FaUsers,
  FaCalendarAlt,
  FaCreditCard,
  FaExclamationCircle,
  FaWallet,
  FaCog,
  FaBook,
  FaCommentDots,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

export default function SideNavbar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useAuth();

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (onClose) onClose();
  }, [location.pathname]);

  const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/services/internet-banking");
  };

  const menuItems = [
    { label: "My Account", icon: <FaUserCircle />, path: "/profile" },
    { label: "Frequent Transactions", icon: <FaHistory />, path: "/frequent" },
    { label: "Beneficiaries", icon: <FaUsers />, special: "no-beneficiaries" },
    { label: "Scheduled Payments", icon: <FaCalendarAlt />, special: "coming-soon" },
    { label: "Card Services", icon: <FaCreditCard />, special: "coming-soon" },
    { label: "Self Service", icon: <FaExclamationCircle />, special: "coming-soon" },
    { label: "Loans", icon: <span className="text-lg font-bold">₦</span>, special: "coming-soon" },
  ];

  const settingsItems = [
    { label: "Account Settings", icon: <FaCog />, path: "/acc-settings" },
    { label: "Privacy Policy", icon: <FaBook />, path: "/support/privacy-policy" },
    { label: "Feedback", icon: <FaCommentDots />, path: "/support/contact-us" },
    { label: "Logout", icon: <FaSignOutAlt />, action: logout },
  ];

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#72cded] text-[#051d40] z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-[-100%]"}
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="pt-5 px-5 mb-6 h-full overflow-y-auto flex flex-col gap-1">
          {/* Mobile Close Button */}
          <div className="flex justify-end md:hidden">
            <button onClick={onClose} className="text-[#051d40]">
              <FaTimes />
            </button>
          </div>

          {/* URB Logo */}
          <div className="flex justify-center mb-4">
            <img src="/URB LOGO.png" alt="URBank Logo" className="h-12" />
          </div>

          {/* Menu Items */}
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2 hover:text-[#fbbf24] cursor-pointer text-sm"
              onClick={() => {
                if (item.special === "no-beneficiaries") {
                  openModal("No beneficiaries added yet.");
                } else if (item.special === "coming-soon") {
                  openModal("Coming soon...");
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}

          <hr className="my-4 border-[#051d40]" />

          {/* Settings Items */}
          {settingsItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2 hover:text-[#fbbf24] cursor-pointer text-sm"
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (
                  item.path === "/support/contact-us" ||
                  item.path === "/support/privacy-policy"
                ) {
                  window.open(item.path, "_blank");
                } else {
                  navigate(item.path);
                }
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80 shadow-md text-center">
            <h2 className="text-lg font-semibold text-[#051d40] mb-3">Notice</h2>
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
    </>
  );
}
