import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function URBTransfer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destinationAccount: "",
    amount: "",
    narration: "",
  });

  useEffect(() => {
    document.title = "Transfer | URBank";
  }, []);

  // Format number with commas (e.g. 1000000 → 1,000,000)
  const formatWithCommas = (numStr) => {
    if (!numStr) return "";
    return parseInt(numStr, 10).toLocaleString("en-NG");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "destinationAccount") {
      const formatted = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === "amount") {
      const numeric = value.replace(/\D/g, "").slice(0, 9); // max 1,000,000
      setForm((prev) => ({ ...prev, amount: numeric }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContinue = () => {
    const { destinationAccount, amount } = form;

    if (!destinationAccount || destinationAccount.length !== 10) {
      alert("Please enter a valid 10-digit destination account number.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (Number(amount) > 1000000) {
      alert("Amount exceeds ₦1,000,000.00 limit.");
      return;
    }

    alert(`Transferring ₦${formatWithCommas(amount)} to ${destinationAccount}`);
  };

  return (
    <section className="min-h-screen pt-24 px-6 pb-32 bg-[#f9fafb]">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#051d40] text-white py-4 px-6 flex items-center gap-4 z-50 shadow">
        <button onClick={() => navigate(-1)} className="text-xl">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">To URBank</h1>
      </div>

      {/* Limit Info */}
      <div className="text-center mt-6">
        <p className="text-sm text-[#051d40] font-medium">
          Available Daily Transaction Limit:
        </p>
        <p className="text-xl font-bold text-[#051d40]">₦ 1,000,000.00</p>
      </div>

      {/* Form */}
      <div className="mt-10 space-y-6 text-sm text-[#051d40]">
        <div>
          <label className="block mb-1 text-xs font-semibold">
            Destination Account <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="destinationAccount"
            value={form.destinationAccount}
            onChange={handleChange}
            placeholder="Enter destination account"
            className="w-full border-b border-gray-400 py-2 bg-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-xs font-semibold">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="amount"
            value={formatWithCommas(form.amount)}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="w-full border-b border-gray-400 py-2 bg-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-xs font-semibold">Narration</label>
          <input
            type="text"
            name="narration"
            value={form.narration}
            onChange={handleChange}
            placeholder="Enter Narration"
            className="w-full border-b border-gray-400 py-2 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-10">
        <button
          onClick={handleContinue}
          className="w-full bg-[#fbbf24] text-[#051d40] py-3 rounded-full font-bold text-sm hover:bg-yellow-400 transition"
        >
          CONTINUE
        </button>
      </div>
    </section>
  );
}
