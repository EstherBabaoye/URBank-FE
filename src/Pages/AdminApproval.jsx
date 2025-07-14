import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminApproval() {
  const [accounts, setAccounts] = useState([]);
  const [reasons, setReasons] = useState({});
  const [selectedAction, setSelectedAction] = useState(null); // { id, type }
  const [showModal, setShowModal] = useState(false);
  const [loadingIds, setLoadingIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_token");
    if (!isAuthenticated) {
      navigate("/admin-login");
      return;
    }
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/accounts/pending`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      setAccounts(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/admin-login");
      } else {
        toast.error("Failed to fetch pending accounts", {
          toastId: "fetch-error",
        });
      }
    }
  };

  const confirmApprove = (id) => {
    setSelectedAction({ id, type: "approve" });
    setShowModal(true);
  };

  const confirmReject = (id) => {
    setSelectedAction({ id, type: "reject" });
    setShowModal(true);
  };

  const handleAction = async () => {
    if (!selectedAction) return;
    const { id, type } = selectedAction;

    setLoadingIds((prev) => [...prev, id]);

    try {
      const token = localStorage.getItem("admin_token");

      if (type === "approve") {
        await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/admin/accounts/${id}/approve`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Account approved successfully!", {
          toastId: `approve-${id}`,
        });
      } else {
        const reason = reasons[id] || "No reason provided";
        await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/admin/accounts/${id}/reject`,
          { reason },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Account approval rejected!", {
          toastId: `reject-${id}`,
        });
      }

      setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    } catch (err) {
      toast.error(`${type === "approve" ? "Approval" : "Rejection"} failed`, {
        toastId: `action-error-${id}`,
      });
    } finally {
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
      setSelectedAction(null);
      setShowModal(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl mt-20 mb-6 font-bold text-center sm:text-left">
        Pending Account Openings
      </h1>

      {accounts.length === 0 ? (
        <p className="text-center text-gray-600">No pending accounts</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-xs sm:text-sm">
                <th className="p-2 sm:p-3 border">Full Name</th>
                <th className="p-2 sm:p-3 border">Email</th>
                <th className="p-2 sm:p-3 border">BVN</th>
                <th className="p-2 sm:p-3 border">Phone</th>
                <th className="p-2 sm:p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => {
                const isLoading = loadingIds.includes(acc.id);
                return (
                  <tr
                    key={acc.id}
                    className="text-xs sm:text-sm border-t even:bg-gray-50"
                  >
                    <td className="p-2 sm:p-3 border">
                      {acc.first_name} {acc.surname}
                    </td>
                    <td className="p-2 sm:p-3 border break-words">
                      {acc.email}
                    </td>
                    <td className="p-2 sm:p-3 border">{acc.bvn}</td>
                    <td className="p-2 sm:p-3 border">{acc.phone}</td>
                    <td className="p-2 sm:p-3 border">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                        <button
                          disabled={isLoading}
                          onClick={() => confirmApprove(acc.id)}
                          className={`bg-green-500 text-white px-3 py-1 rounded ${
                            isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-green-600"
                          }`}
                        >
                          {isLoading ? "Processing..." : "Approve"}
                        </button>
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <input
                            type="text"
                            placeholder="Reason"
                            value={reasons[acc.id] || ""}
                            onChange={(e) =>
                              setReasons({
                                ...reasons,
                                [acc.id]: e.target.value,
                              })
                            }
                            className="border px-2 py-1 rounded w-full sm:w-auto"
                            disabled={isLoading}
                          />
                          <button
                            disabled={isLoading}
                            onClick={() => confirmReject(acc.id)}
                            className={`bg-red-500 text-white px-3 py-1 rounded ${
                              isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-red-600"
                            }`}
                          >
                            {isLoading ? "Processing..." : "Reject"}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-center">
              Confirm{" "}
              {selectedAction?.type === "approve" ? "Approval" : "Rejection"}
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to {selectedAction?.type} this account?
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleAction}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loadingIds.includes(selectedAction?.id)}
              >
                {loadingIds.includes(selectedAction?.id)
                  ? "Processing..."
                  : "Confirm"}
              </button>
              <button
                onClick={() => {
                  setSelectedAction(null);
                  setShowModal(false);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
