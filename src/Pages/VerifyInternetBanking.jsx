import { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function VerifyInternetBanking() {
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false); // ✅ Prevent double trigger in dev

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token || hasVerified.current) return;

    hasVerified.current = true;

    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/verify-email?token=${token}`
        );

        const msg = res.data?.message?.toLowerCase() || "";

        if (msg.includes("already verified")) {
          setStatus("success"); // or use "already" if you want a separate message
        } else if (res.data?.success) {
          setStatus("success");
          setTimeout(() => navigate("/services/internet-banking"), 3000);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, []);

  const getContent = () => {
    switch (status) {
      case "verifying":
        return {
          title: "Verifying Email...",
          message: (
            <div className="flex flex-col items-center gap-2">
              <p>Please wait while we verify your email address.</p>
              <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ),
          color: "text-blue-600",
        };

      case "success":
        return {
          title: "✅ Email Verified!",
          message: "Redirecting to login...",
          color: "text-green-600",
        };

      case "already":
        return {
          title: "⚠️ Email Already Verified",
          message: "You may proceed to login.",
          color: "text-yellow-600",
        };

      case "error":
        return {
          title: "Verification Failed",
          message: "This link is invalid or has expired.",
          color: "text-red-600",
        };

      default:
        return {};
    }
  };

  const { title, message, color } = getContent();

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="bg-white text-slate-900 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <img
          src="/URB LOGO.png"
          alt="URBank Logo"
          className="h-12 mx-auto mb-4"
        />
        <h2 className={`text-xl font-bold mb-2 ${color}`}>{title}</h2>
        <div className="text-sm">{message}</div>

        {status === "error" && (
          <button
            onClick={() => {
              setIsButtonDisabled(true);
              navigate("/services/internet-banking");
            }}
            disabled={isButtonDisabled}
            className={`mt-4 px-4 py-2 rounded font-semibold transition ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-[#051d40] hover:bg-yellow-300"
            }`}
          >
            Back to Internet Banking
          </button>
        )}
      </div>
    </section>
  );
}
