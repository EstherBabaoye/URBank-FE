import { useEffect } from "react";
import { FaArrowLeft, FaMoneyBillAlt, FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TransactionHistory() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Transaction History | URBank";
  }, []);

  // Example transactions – replace with dynamic data later
  const transactions = [
    {
      id: 1,
      type: "Transfer",
      amount: "-₦10,000.00",
      date: "15/06/2025",
      time: "08:45 AM",
      icon: <FaExchangeAlt />,
      status: "Successful",
    },
    {
      id: 2,
      type: "Bill Payment",
      amount: "-₦5,200.00",
      date: "14/06/2025",
      time: "04:12 PM",
      icon: <FaMoneyBillAlt />,
      status: "Successful",
    },
    {
      id: 3,
      type: "Transfer",
      amount: "+₦15,000.00",
      date: "13/06/2025",
      time: "02:30 PM",
      icon: <FaExchangeAlt />,
      status: "Received",
    },
  ];

  return (
    <section className="min-h-screen  bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-[#051d40] text-white px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-lg">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Transaction History</h1>
      </div>

      {/* Transaction List */}
      <div className="p-4">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No transactions yet.</p>
        ) : (
          transactions.map((txn) => (
            <div key={txn.id} className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full text-lg">
                  {txn.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#051d40]">{txn.type}</h3>
                  <p className="text-xs text-gray-500">{txn.date} • {txn.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${txn.amount.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
                  {txn.amount}
                </p>
                <p className="text-xs text-gray-500">{txn.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
