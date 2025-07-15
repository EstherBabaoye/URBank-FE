import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPin() {
  const [form, setForm] = useState({
    accountNumber: "",
    email: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 👈 loading state

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is your favorite teacher's name?",
    "What was your childhood nickname?",
    "What is your favorite food?",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = async () => {
    const { accountNumber, email, securityQuestion, securityAnswer } = form;

    setShowError(false);
    setApiError("");
    setSuccess("");

    if (!accountNumber || !email || !securityQuestion || !securityAnswer) {
      setShowError(true);
      return;
    }

    const payload = {
      account_number: accountNumber,
      email,
      sec_question: securityQuestion,
      sec_answer: securityAnswer,
    };

    setIsLoading(true); // 👈 start loading
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/forgot-pin`,
        payload
      );

      if (res.status === 200) {
        setSuccess("Reset email sent! Check your inbox.");
        setTimeout(() => {
          navigate("/services/internet-banking");
        }, 1500);
      }
    } catch (err) {
      console.error("Forgot PIN error:", err.response?.data || err.message);
      setApiError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false); // 👈 stop loading
    }
  };

  return (
    <section className="min-h-screen mt-16 pt-24 px-6 pb-32 bg-[#f9fafb]">
      <h1 className="text-xl font-bold text-[#051d40] mb-6 text-center">
        Forgot PIN
      </h1>

      <div className="space-y-6 max-w-md mx-auto text-sm text-[#051d40]">
        <input
          type="text"
          name="accountNumber"
          value={form.accountNumber}
          onChange={handleChange}
          placeholder="Enter your Account Number"
          className="w-full border-b border-gray-400 py-2 bg-transparent outline-none"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your Registered Email"
          className="w-full border-b border-gray-400 py-2 bg-transparent outline-none"
        />

        <select
          name="securityQuestion"
          value={form.securityQuestion}
          onChange={handleChange}
          className="w-full border-b border-gray-400 py-2 bg-transparent outline-none"
        >
          <option value="">Select a Security Question</option>
          {securityQuestions.map((q, i) => (
            <option key={i} value={q}>
              {q}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="securityAnswer"
          value={form.securityAnswer}
          onChange={handleChange}
          placeholder="Answer to Security Question"
          className="w-full border-b border-gray-400 py-2 bg-transparent outline-none"
        />

        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`w-full ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#fbbf24] hover:bg-yellow-400"
          } text-[#051d40] py-3 rounded-full font-bold text-sm transition`}
        >
          {isLoading ? "Processing..." : "CONTINUE"}
        </button>

        {/* Message Display */}
        {showError && (
          <p className="text-red-600 text-sm">
            Please complete all fields with valid entries.
          </p>
        )}

        {apiError && <p className="text-red-600 text-sm">{apiError}</p>}

        {success && <p className="text-green-600 text-sm">{success}</p>}
      </div>
    </section>
  );
}
