import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBars,
  FaExchangeAlt,
  FaMoneyBill,
  FaPhoneAlt,
  FaQrcode,
  FaCreditCard,
  FaLandmark,
  FaBell,
  FaEye,
  FaEyeSlash,
  FaUserFriends,
  FaHeart,
  FaCommentAlt,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../Components/AuthContext";
import SideNavbar from "../Components/SideNavbar";
import axios from "axios";

export default function WelcomeDashboard() {
  const [showBalance, setShowBalance] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [userData, setUserData] = useState({});
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 16) return "Good Afternoon";
    if (hour >= 16 && hour < 19) return "Good Evening";
    return "Good Night";
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("urbank_user");
    navigate("/services/internet-banking");
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("urbank_user"));
    if (!savedUser || !savedUser.token) {
      logout();
      return;
    }

    console.log("Saved user from localStorage:", savedUser);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/internetbanking/profile/${
            savedUser.email
          }`,
          {
            headers: {
              Authorization: `Bearer ${savedUser.token}`,
            },
          }
        );
        setUserData({ ...savedUser, ...response.data });
      } catch (err) {
        console.error("Error fetching profile:", err);

        // 🔐 Only logout if it's truly unauthorized
        if (err.response?.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          logout();
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }
    };

    fetchProfile();

    const now = new Date();
    const formatted =
      now.toLocaleDateString("en-GB") +
      " " +
      now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setLastLogin(formatted);
  }, []);

  const features = [
    { label: "Transfer", icon: <FaExchangeAlt />, path: "/transfer" },
    { label: "Pay Bills", icon: <FaMoneyBill />, path: "/bills" },
    { label: "Buy Airtime/Data", icon: <FaPhoneAlt />, alert: true },
    { label: "QR Payment", icon: <FaQrcode />, alert: true },
    { label: "Loans", icon: <FaLandmark />, alert: true },
    { label: "Virtual Cards", icon: <FaCreditCard />, alert: true },
  ];

  return (
    <div className="flex min-h-screen">
      <SideNavbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="md:hidden flex justify-between items-center px-4 py-3 bg-[#72cded] text-[#051d40] shadow-md z-20">
          <FaBars
            className="text-xl cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="w-6" />
        </div>

        {/* Page Body */}
        <section className="bg-slate-100 flex-1 pb-0">
          <div className="bg-[#72cded] text-[#051d40] px-4 py-6 relative">
            <div className="absolute right-4 top-4">
              <FaBell className="text-[#051d40] text-xl" />
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm">
                  {getGreeting()},{" "}
                  <strong>
                    {userData?.accountName || userData?.fullName || "User"}
                  </strong>
                </p>
                <p className="text-xs text-[#051d40]/70">
                  Last Login {lastLogin}
                </p>
              </div>
              <Link
                to="/transaction-history"
                className="text-xs font-semibold text-[#051d40]"
              >
                HISTORY
              </Link>
            </div>

            <div className="bg-white/20 rounded-md mt-4 px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-xs text-[#051d40]/70">
                  ACCOUNT #{" "}
                  {(userData?.accountNumber || "0000000000").replace(
                    /(\d{4})(?=\d)/g,
                    "$1 "
                  )}
                </p>
                <p className="text-lg font-bold mt-1">
                  ₦ {showBalance ? "0.00" : "*****"}
                </p>
              </div>
              <div
                className="flex items-end gap-1 cursor-pointer"
                onClick={() => setShowBalance((prev) => !prev)}
              >
                {showBalance ? (
                  <FaEye className="text-[#051d40] text-lg" />
                ) : (
                  <FaEyeSlash className="text-[#051d40] text-lg" />
                )}
              </div>
            </div>
          </div>

          <div className="grid pb-48 grid-cols-3 gap-4 px-6 py-6 bg-white shadow-sm rounded-b-lg -mt-4 z-10 relative">
            {features.map((feature, idx) => {
              const commonClasses =
                "flex flex-col items-center text-[#051d40] hover:text-[#fbbf24] transition-colors";
              return feature.alert ? (
                <button
                  key={idx}
                  onClick={() => setShowComingSoon(true)}
                  className={commonClasses}
                >
                  <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full text-xl">
                    {feature.icon}
                  </div>
                  <p className="text-xs mt-2 text-center">{feature.label}</p>
                </button>
              ) : (
                <Link to={feature.path} key={idx} className={commonClasses}>
                  <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full text-xl">
                    {feature.icon}
                  </div>
                  <p className="text-xs mt-2 text-center">{feature.label}</p>
                </Link>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <nav className="w-full bg-white border-t border-gray-300 flex justify-around py-2 shadow-md fixed bottom-0 md:static md:border-none md:shadow-none">
            <Link
              to="/dashboard"
              className="flex flex-col items-center text-[#051d40] text-sm hover:text-[#fbbf24]"
            >
              <FaExchangeAlt />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/frequent"
              className="flex flex-col items-center text-gray-500 text-sm hover:text-[#fbbf24]"
            >
              <FaHeart />
              <span>Frequent</span>
            </Link>
            <Link
              to="/support/contact-us"
              className="flex flex-col items-center text-gray-500 text-sm hover:text-[#fbbf24]"
            >
              <FaCommentAlt />
              <span>Feedback</span>
            </Link>
            <Link
              to="/acc-settings"
              className="flex flex-col items-center text-gray-500 text-sm hover:text-[#fbbf24]"
            >
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>

          {/* Modal for Coming Soon */}
          {showComingSoon && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
                <h2 className="text-lg font-semibold text-[#051d40] mb-2">
                  🚧 Coming Soon
                </h2>
                <p className="text-sm text-gray-700">
                  This feature will be available in a future update.
                </p>
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="mt-5 px-4 py-2 bg-[#fbbf24] text-[#051d40] font-semibold rounded hover:bg-yellow-300 transition"
                >
                  Got it
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
