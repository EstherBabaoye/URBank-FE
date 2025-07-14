import { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaPhoneAlt,
  FaUniversity,
  FaInfoCircle,
  FaCompass,
  FaWallet,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/AuthContext";
import axios from "axios";

export default function InternetBanking() {
  const [email, setEmail] = useState("");
  const [login_pin, setlogin_pin] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(null);
  const [showResend, setShowResend] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "Internet Banking";
    const handleEnterKey = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handleEnterKey);
    return () => window.removeEventListener("keydown", handleEnterKey);
  }, [login_pin]);

  useEffect(() => {
    if (resendSuccess) {
      const timer = setTimeout(() => setResendSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [resendSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "login_pin") {
      const sanitized = value.replace(/\D/g, "").slice(0, 6);
      setlogin_pin(sanitized);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (login_pin.length !== 6) {
      setShowErrorModal("Please enter your complete 6-digit PIN.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login-internet-banking`,
        { email, login_pin }
      );

      if (res.status === 200 && res.data?.message === "Login successful") {
        localStorage.setItem(
          "urbank_user",
          JSON.stringify({
            ...res.data.user, // ✅ FIXED
            token: res.data.token, // ✅ FIXED
          })
        );

        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setShowErrorModal("Login failed.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      setShowErrorModal(message);
      setShowResend(message === "Email not verified.");
    }
  };

  const handleResendEmail = async () => {
    setResending(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/resend-verification`,
        {
          email,
        }
      );

      setResending(false);
      setShowErrorModal(null); // close the modal
      setResendSuccess(true); // show success message
    } catch (err) {
      setResending(false);
      alert("Failed to resend email.");
      console.error(err);
    }
  };

  const features = [
    { label: "Quick Transfers", icon: <FaExchangeAlt /> },
    { label: "Quick Airtime", icon: <FaPhoneAlt /> },
    { label: "Balance Enquiry", icon: <FaWallet /> },
    { label: "Help / Contact", icon: <FaInfoCircle /> },
    { label: "Mobile Banking", icon: <FaUniversity /> },
    { label: "ATM / Branch Loc.", icon: <FaCompass /> },
  ];

  const handleFeatureClick = (label) => {
    switch (label) {
      case "Quick Transfers":
      case "Quick Airtime":
      case "Balance Enquiry":
        setShowComingSoon(`${label} feature coming soon.`);
        break;
      case "Help / Contact":
        navigate("/support/contact-us");
        break;
      case "Mobile Banking":
        navigate("/services/mobile-banking");
        break;
      case "ATM / Branch Loc.":
        setShowMap(true);
        break;
      default:
        break;
    }
  };

  return (
    <section className="min-h-screen mt-24 bg-gradient-to-b from-sky-900 to-slate-900 text-white px-4 py-10">
      <div className="text-center mb-10">
        <img
          src="/URB LOGO.png"
          alt="URBank Logo"
          className="mx-auto h-12 mb-2"
        />
        <h1 className="text-3xl font-bold">URBank</h1>
        <p className="text-sm mt-4 text-gray-300">
          YOUR BANK, YOUR MONEY, YOUR FUTURE
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center max-w-xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition duration-200 flex flex-col items-center justify-center text-yellow-400 cursor-pointer"
            onClick={() => handleFeatureClick(item.label)}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-sm font-medium text-white">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className=" mb-2 flex mt-12 justify-center text-sm text-gray-300">
          Registered Email Address
        </label>
        <div className="mb-6 flex justify-center">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="e.g. user@example.com"
            className="w-full max-w-sm text-center px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
      </div>

      <div className="max-w-md mx-auto mt-12 text-center px-4">
        <p className="text-gray-700 text-sm mb-4">{showErrorModal}</p>

        <input
          type="password"
          inputMode="numeric"
          maxLength="6"
          value={login_pin}
          onChange={handleInputChange}
          name="login_pin"
          autoFocus
          className="w-0 h-0 opacity-0 absolute"
        />

        <div
          className="flex justify-center gap-2 mb-4"
          onClick={() =>
            document.querySelector("input[name='login_pin']").focus()
          }
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-10 border-b-2 text-white text-center text-xl font-bold ${
                login_pin[i] ? "border-white" : "border-gray-500"
              }`}
            >
              {login_pin[i]
                ? "•"
                : i === login_pin.length && (
                    <span className="animate-pulse opacity-50">|</span>
                  )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-slate-900 px-6 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-300 mb-4"
        >
          Login with PIN
        </button>

        <div className="flex flex-col mb-4 text-sm text-yellow-300 hover:underline">
          <button onClick={() => navigate("/internet-banking/forgot-pin")}>
            Forgot PIN?
          </button>
        </div>
        <div className="flex flex-col text-sm text-yellow-300 hover:underline">
          <button onClick={() => navigate("/internet-banking/register")}>
            Register
          </button>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs mt-10">Version 1.0.0</p>

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold text-red-600 mb-2">
              Invalid Login Credentials
            </h2>
            <p className="text-gray-700 text-sm mb-4">{showErrorModal}</p>
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setShowErrorModal(null)}
                className="bg-yellow-400 text-[#051d40] px-4 py-2 rounded font-semibold hover:bg-yellow-300 w-full"
              >
                Try Again
              </button>

              {showResend && (
                <button
                  onClick={handleResendEmail}
                  disabled={resending}
                  className={`text-sm underline ${
                    resending
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  {resending ? "Sending..." : "Resend Verification Email"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {resendSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          Verification email sent successfully!
        </div>
      )}

      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold text-yellow-600 mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-700 text-sm mb-4">{showComingSoon}</p>
            <button
              onClick={() => setShowComingSoon(null)}
              className="bg-yellow-400 text-[#051d40] px-4 py-2 rounded font-semibold hover:bg-yellow-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-4xl relative">
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full"
              onClick={() => setShowMap(false)}
            >
              Close
            </button>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1160OarudgtG5qN4-xnIpX0wuppCQ6xo&ehbc=2E312F"
              className="w-full h-[500px] border-0"
              allowFullScreen
              loading="lazy"
              title="URBank Branch Locations"
            />
          </div>
        </div>
      )}
    </section>
  );
}
