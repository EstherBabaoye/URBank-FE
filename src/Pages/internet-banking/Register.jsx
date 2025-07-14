import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  useEffect(() => {
    document.title = "Internet Banking Registration | URBank";
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("verified") === "true") {
      alert(" Email verified! You can now log in.");
    }
  }, []);

  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    accountNumber: "",
    bvn: "",
    atmFirst4: "",
    atmLast6: "",
    atm_pin: "",
    email: "",
    login_pin: "",
    secQuestion1: "",
    secAnswer1: "",
    secQuestion2: "",
    secAnswer2: "",
  });

  const [showError, setShowError] = useState(false);

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was your childhood nickname?",
    "What city were you born in?",
    "What is your favorite food?",
    "What is your first school's name?",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "accountNumber",
      "bvn",
      "atmFirst4",
      "atmLast6",
      "atm_pin",
      "login_pin",
    ];
    const sanitizedValue = numericFields.includes(name)
      ? value.replace(/\D/g, "")
      : value;

    setForm((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const {
      firstName,
      middleName,
      surname,
      accountNumber,
      bvn,
      atmFirst4,
      atmLast6,
      atm_pin,
      email,
      login_pin,
      secQuestion1,
      secAnswer1,
      secQuestion2,
      secAnswer2,
    } = form;

    if (
      !firstName ||
      !middleName || // <-- add ! here
      !surname || // <-- add ! here
      accountNumber.length !== 10 ||
      bvn.length !== 11 ||
      atmFirst4.length !== 4 ||
      atmLast6.length !== 6 ||
      atm_pin.length !== 4 ||
      !email ||
      login_pin.length !== 6 ||
      !secQuestion1 ||
      !secAnswer1 ||
      !secQuestion2 ||
      !secAnswer2
    ) {
      setShowError(true);

      return;
    }
    setLoading(true);
    try {
      const payload = {
        first_name: form.firstName,
        middle_name: form.middleName,
        surname: form.surname,
        account_number: form.accountNumber,
        bvn: form.bvn,
        atm_first4: form.atmFirst4,
        atm_last6: form.atmLast6,
        atm_pin: form.atm_pin.toString(),
        email: form.email,
        login_pin: form.login_pin.toString(),
        sec_question1: form.secQuestion1,
        sec_answer1: form.secAnswer1,
        sec_question2: form.secQuestion2,
        sec_answer2: form.secAnswer2,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register-internet-banking`,
        payload
      );

      console.log(" Registration Success:", res.data);
      setSuccessMessage(
        "Registration successful! Check your email for verification."
      );
      setTimeout(() => {
        navigate("/services/internet-banking");
      }, 5000); // Wait 4 seconds before redirecting
    } catch (err) {
      console.error(" Registration Error:", err.response?.data || err.message);
      alert("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen mt-24 bg-gradient-to-b from-sky-900 to-slate-900 text-white px-6 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Register for Internet Banking
        </h1>

        {/* INPUT FIELDS */}
        {[
          { name: "firstName", label: "First Name" },
          { name: "middleName", label: "Middle Name" },
          { name: "surname", label: "Surname" },
          {
            name: "accountNumber",
            label: "Account Number (10 digits)",
            max: 10,
          },
          { name: "bvn", label: "BVN (11 digits)", max: 11 },
          { name: "atmFirst4", label: "First 4 digits of ATM Card", max: 4 },
          { name: "atmLast6", label: "Last 6 digits of ATM Card", max: 6 },
          {
            name: "atm_pin",
            label: "ATM PIN (4 digits)",
            max: 4,
            type: "password",
          },
          { name: "email", label: "Email Address" },
          {
            name: "login_pin",
            label: "Create Login mPIN (6 digits)",
            max: 6,
            type: "password",
          },
        ].map(({ name, label, max, type }, idx) => (
          <div key={idx} className="mb-4">
            <label className="block text-sm mb-1">{label}</label>
            <input
              type={type || "text"}
              name={name}
              value={form[name]}
              onChange={handleChange}
              maxLength={max}
              className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}

        {/* SECURITY QUESTION 1 */}
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Select Security Question 1
          </label>
          <select
            name="secQuestion1"
            value={form.secQuestion1}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
          >
            <option value="">-- Select a question --</option>
            {securityQuestions.map((q, i) => (
              <option key={i} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Answer to Security Question 1
          </label>
          <input
            type="text"
            name="secAnswer1"
            value={form.secAnswer1}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
          />
        </div>

        {/* SECURITY QUESTION 2 */}
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Select Security Question 2
          </label>
          <select
            name="secQuestion2"
            value={form.secQuestion2}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
          >
            <option value="">-- Select another question --</option>
            {securityQuestions.map((q, i) => (
              <option key={i} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Answer to Security Question 2
          </label>
          <input
            type="text"
            name="secAnswer2"
            value={form.secAnswer2}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-yellow-400 text-[#051d40] font-semibold py-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button
          onClick={() => navigate("/services/internet-banking")}
          className="w-full text-sm mt-6 text-yellow-300 hover:underline"
        >
          Back to Login
        </button>
      </div>

      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold text-green-600 mb-2">Success</h2>
            <p className="text-gray-700 text-sm mb-4">{successMessage}</p>
          </div>
        </div>
      )}

      {/* ❌ Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold text-red-600 mb-2">
              Incomplete or Invalid Fields
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              Please complete all fields with valid entries.
            </p>
            <button
              onClick={() => setShowError(false)}
              className="bg-yellow-400 text-[#051d40] px-4 py-2 rounded font-semibold hover:bg-yellow-300"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
