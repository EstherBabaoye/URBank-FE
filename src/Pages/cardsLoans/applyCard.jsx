import { useEffect, useState } from "react";
import axios from "axios";

export default function CardApplication() {
  useEffect(() => {
    document.title = "Card Application";
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phone: "",
    cardType: "",
    subCardType: "",
    reason: "",
    otherReason: "",
    accountNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.surname) newErrors.surname = "Surname is required";

    if (!form.email || !emailRegex.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone || form.phone.length < 10)
      newErrors.phone = "Phone number must be at least 10 digits";
    if (!form.cardType) newErrors.cardType = "Card type is required";
    if (
      (form.cardType === "credit" || form.cardType === "debit") &&
      !form.subCardType
    )
      newErrors.subCardType = "Please select a card option";

    if (!form.reason)
      newErrors.reason = "Please select a reason for your application";
    if (form.reason === "Other" && !form.otherReason) {
      newErrors.otherReason =
        "Please provide your reason for selecting 'Other'";
    }
    if (!form.accountNumber || form.accountNumber.length < 10)
      newErrors.accountNumber = "Valid 10-digit account number is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false); // hide any prior success
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSuccess(false);
    setServerError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/card/apply`,
        form
      );

      if (res.data?.success) {
        setSuccess(true);
        setErrors({});
        setServerError("");

        // ✅ reset form
        setForm({
          firstName: "",
          middleName: "",
          surname: "",
          email: "",
          phone: "",
          cardType: "",
          subCardType: "",
          reason: "",
          otherReason: "",
          accountNumber: "",
        });

        // ✅ scroll to top to show success
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setServerError("Failed to submit. Please try again later.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setServerError(
        error.response?.data?.error ||
          "Failed to submit. Please try again later."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const debitOptions = [
    "Naira Mastercard",
    "Naira Visa Card",
    "Verve",
    "Dollar Mastercard",
    "Dollar Visa Card",
  ];

  const creditOptions = ["Basic", "Rewards", "Savings"];

  return (
    <div className="mt-32 pt-16 sm:mt-16 mb-24 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#051d40] mb-4 text-center">
        Apply for a Smart Card
      </h1>
      <p className="text-center text-sm text-red-600 mb-8">
        Please ensure your account is funded. A charge of ₦1,250 (or its
        equivalent) will be deducted as the card application fee.
      </p>

      {success && (
        <div className="transition-opacity duration-1000 opacity-100 bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl mb-8 text-center">
          Your application was submitted! We’ll contact you via email within
          24–48 hours.
        </div>
      )}

      {serverError && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl mb-8 text-center">
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-xl rounded-xl p-8"
      >
        <fieldset disabled={isSubmitting} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Account Number
            </label>
            <input
              name="accountNumber"
              type="text"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accountNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Middle Name
            </label>
            <input
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Surname</label>
            <input
              name="surname"
              value={form.surname}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            />
            {errors.surname && (
              <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Type</label>
            <select
              name="cardType"
              value={form.cardType}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            >
              <option value="">Select a card type</option>
              <option value="debit">Debit Card</option>
              <option value="credit">Credit Card</option>
            </select>
            {errors.cardType && (
              <p className="text-red-500 text-sm mt-1">{errors.cardType}</p>
            )}
          </div>

          {(form.cardType === "debit" || form.cardType === "credit") && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {form.cardType === "debit"
                  ? "Debit Card Options"
                  : "Credit Card Options"}
              </label>
              <select
                name="subCardType"
                value={form.subCardType}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
              >
                <option value="">Select an option</option>
                {(form.cardType === "debit" ? debitOptions : creditOptions).map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>
              {errors.subCardType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subCardType}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Reason for Application
            </label>
            <select
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
            >
              <option value="">Select a reason</option>
              <option value="New Application">New Application</option>
              <option value="Misplaced Card">Misplaced Card</option>
              <option value="Expired Card">Expired Card</option>
              <option value="Damaged Card">Damaged Card</option>
              <option value="Change Card Type">Change Card Type</option>
              <option value="Other">Other</option>
            </select>
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
            )}
          </div>

          {form.reason === "Other" && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Please write out your reason
              </label>
              <input
                name="otherReason"
                value={form.otherReason}
                onChange={handleChange}
                className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#051d40]"
              />
              {errors.otherReason && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otherReason}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#051d40] text-white hover:bg-[#03306b]"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
