import { useEffect, useState } from "react";
import {
  FaRetweet,
  FaShareAlt,
  FaSyncAlt,
  FaQuestionCircle,
  FaFingerprint,
  FaCog,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function AccSettings() {
  useEffect(() => {
    document.title = "Account Settings | URBank";
  }, []);

  const [showAd, setShowAd] = useState(true);
  const navigate = useNavigate();


  const settingsOptions = [
    {
      label: "Change mPIN",
      icon: <FaRetweet />,
      action: () => alert("Change mPIN"),
    },
    {
      label: "Change Transaction PIN",
      icon: <FaRetweet />,
      action: () => alert("Change Transaction PIN"),
    },
    {
      label: "Reset Transaction PIN",
      icon: <FaSyncAlt />,
      action: () => alert("Resetting PIN"),
    },
    {
      label: "Reset Questions & Answers",
      icon: <FaQuestionCircle />,
      action: () => alert("Reset Q&A"),
    },
    {
      label: "Biometric",
      icon: <FaFingerprint />,
      action: () => alert("Biometric Login Coming Soon..."),
    },
  ];

  return (
    <section className="min-h-screen bg-[#f9fafb] pt-10 pb-16 px-4">
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
        <h1 className="text-xl font-semibold">ACCOUNT SETTINGS</h1>
      </div>

      <div className="space-y-3">
        {settingsOptions.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="w-full flex justify-between items-center bg-white rounded-md shadow-sm px-4 py-3 text-[#051d40] hover:bg-[#f4fcff] transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 text-yellow-500 p-2 rounded-full text-lg">
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <span className="text-xl text-gray-400">→</span>
          </button>
        ))}
      </div>

      

      {/* Delete Profile */}
      <div className="mt-10">
        <button
          onClick={() => alert("Profile deletion requested.")}
          className="w-full text-red-600 font-semibold py-3 border border-red-300 bg-red-50 rounded-md hover:bg-red-100 transition"
        >
          DELETE PROFILE
        </button>
      </div>
    </section>
  );
}
