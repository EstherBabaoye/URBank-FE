import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);

  const handleNavigate = (path) => () => navigate(path);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin-login");
  };

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header: Title and Logout */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#051d40]">
          Welcome, Admin
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition"
        >
          Logout
        </button>
      </div>

      {/* Admin Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {[
          { label: "🔍 Pending Accounts", path: "/admin" },
          { label: "💳 Pending Cards", path: "/admin/pending-cards" },
          // { label: "👤 User Details", path: "/admin/users" },
          // { label: "🧾 Account Management", path: "/admin/manage-accounts" },
          // { label: "💼 Card Management", path: "/admin/manage-cards" },
        ].map(({ label, path }) => (
          <button
            key={path}
            onClick={handleNavigate(path)}
            className="w-full bg-[#051d40] text-white py-4 px-6 rounded-lg font-semibold 
              hover:bg-[#03306b] transition focus:outline-none focus:ring-4 focus:ring-[#051d40]/50
              min-h-[56px] text-base sm:text-lg"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
