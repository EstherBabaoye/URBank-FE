import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState("/default-avatar.jpg");

  const user = JSON.parse(localStorage.getItem("urbank_user"));
  const token = user?.token;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    document.title = "User Profile | URBank";

    if (!user?.email || !token) return;

    axios
      .get(`${baseURL}/api/internetbanking/profile/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);

        if (res.data.passportPhoto) {
          setPhoto(`${baseURL}/uploads/${res.data.passportPhoto}`);
        } else {
          setPhoto("/default-avatar.jpg");
        }
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
      });
  }, []);

  if (!profile) {
    return (
      <section className="min-h-screen mt-24 bg-[#e8f9fd] px-6 py-10">
        <div className="text-center text-gray-600">Loading profile...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen  bg-[#e8f9fd] px-6 py-10">
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
        <h1 className="text-xl font-semibold">User Profile</h1>
      </div>

      <div className="max-w-2xl mx-auto bg-[#f4fcff] shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <img
            src={photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#72cded]"
          />
        </div>

        <h1 className="text-2xl font-bold text-[#051d40] mb-6">User Profile</h1>

        <div className="space-y-5 text-sm">
          <ProfileItem label="Account Name" value={profile.accountName} />
          <ProfileItem label="Account Number" value={profile.accountNumber} />
          <ProfileItem label="BVN" value={profile.bvn} />
          <ProfileItem label="Home Address" value={profile.address} />
          <ProfileItem label="Email" value={profile.email} />
          <ProfileItem label="Phone Number" value={profile.phone} />
        </div>
      </div>
    </section>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-[#051d40] font-medium">{label}</p>
      <p className="text-gray-700 mt-1">{value || "N/A"}</p>
    </div>
  );
}
