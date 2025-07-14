import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import URBankLogo from "../assets/URB LOGO2.png";

export default function Header2() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-8 w-full z-50 bg-white shadow-lg h-20 flex items-center justify-between px-4 lg:px-10">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src={URBankLogo} alt="URBank Logo" className="h-16 w-auto" />
      </a>

      {/* Centered Motto */}
      <p className="absolute left-1/2 transform -translate-x-1/2 text-sm text-[#051d40] font-bold">
        YOUR BANK, YOUR MONEY, YOUR FUTURE
      </p>

      {/* Search + CTA */}
      <div className="flex items-center space-x-4 relative print:hidden" ref={searchRef}>
        {/* Search Icon */}
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="text-[#051d40] hover:text-[#fbbf24]"
        >
          <i className="fas fa-search text-lg" />
        </button>

        {/* Always render input, only toggle visibility */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#72cded] transition-all duration-200 ${
              showSearch ? "visible opacity-100 w-40 ml-2" : "invisible opacity-0 w-0"
            }`}
          />
        </form>

        {/* Contact Button */}
        <button
          onClick={() => navigate("/support/contact-us")}
          className="bg-[#72cded] print:hidden hover:text-[#fbbf24] text-sm text-[#051d40] font-semibold px-4 py-2 rounded"
        >
          CONTACT US
        </button>
      </div>
    </header>
  );
}
