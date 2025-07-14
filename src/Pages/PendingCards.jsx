import { useEffect, useState } from "react";
import axios from "axios";

export default function PendingCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [loadingIds, setLoadingIds] = useState([]);

  useEffect(() => {
    document.title = "Pending Card Approvals";
    fetchPendingCards();
  }, []);

  const fetchPendingCards = () => {
    const token = localStorage.getItem("admin_token");

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/cards/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCards(res.data))
      .catch((err) => console.error("Failed to fetch cards:", err))
      .finally(() => setLoading(false));
  };

  const handleAction = async (id, action) => {
    const token = localStorage.getItem("admin_token");
    setLoadingIds((prev) => [...prev, id]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/cards/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error(`${action} failed:`, err);
      setMessage("Something went wrong.");
    } finally {
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  return (
    <div className="p-4 sm:p-8 mt-24">
      <h2 className="text-2xl font-bold mb-4 text-[#051d40] text-center sm:text-left">
        Pending Card Applications
      </h2>

      {message && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md max-w-4xl mx-auto">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : cards.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending card applications.
        </p>
      ) : (
        <div className="overflow-x-auto max-w-full">
          <table className="w-full table-auto border shadow-lg rounded overflow-hidden min-w-[600px]">
            <thead>
              <tr className="bg-[#051d40] text-white text-sm sm:text-base">
                <th className="p-2 sm:p-3 border text-left">Full Name</th>
                <th className="p-2 sm:p-3 border text-left">Email</th>
                <th className="p-2 sm:p-3 border text-left">Card Type</th>
                <th className="p-2 sm:p-3 border text-left">Reason</th>
                <th className="p-2 sm:p-3 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr
                  key={card.id}
                  className="border-t even:bg-gray-50 text-xs sm:text-sm"
                >
                  <td className="p-2 sm:p-3 border">{card.full_name}</td>
                  <td className="p-2 sm:p-3 border break-all">{card.email}</td>
                  <td className="p-2 sm:p-3 border">
                    {card.card_type} - {card.sub_card_type}
                  </td>
                  <td className="p-2 sm:p-3 border">{card.reason}</td>
                  <td className="p-2 sm:p-3 border">
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                      <button
                        disabled={loadingIds.includes(card.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleAction(card.id, "approve")}
                      >
                        {loadingIds.includes(card.id)
                          ? "Processing..."
                          : "Approve"}
                      </button>

                      <button
                        disabled={loadingIds.includes(card.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleAction(card.id, "reject")}
                      >
                        {loadingIds.includes(card.id)
                          ? "Processing..."
                          : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
