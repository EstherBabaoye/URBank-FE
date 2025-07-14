import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import URBankLogo from "../assets/URB LOGO2.png";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  // Add 'path' to each nav item for NavLink
  const navItems = [
    { label: "HOME", icon: <HomeIcon />, path: "/" },
    { label: "PERSONAL", icon: <UserIcon />, path: "/personal" },
    { label: "BUSINESS", icon: <BriefcaseIcon />, path: "/business" },
    { label: "SUPPORT", icon: <SupportIcon />, path: "/support" },
    { label: "ABOUT US", icon: <InfoIcon />, path: "/about" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
      setShowSearch(false);
      setQuery("");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Navbar */}
      <div
        className="shadow-lg h-24 flex items-center justify-between px-4 z-50 relative bg-gradient-to-r"
        style={{
          backgroundImage:
            "linear-gradient(to right, #aef0f8, #6dbaf0, #4d8fd1)",
        }}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center" aria-label="URBank Home">
          <img src={URBankLogo} alt="URBank Logo" className="h-12 w-auto" />
        </NavLink>

        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button
            onClick={() => {
              setShowSearch(true); // show search bar
              setMenuOpen(false); // close hamburger menu
            }}
            className="text-[#051d40] print:hidden"
            aria-label="Toggle Search"
          >
            <SearchIcon />
          </button>

          {/* Hamburger Menu Toggle */}
          {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className="text-[#051d40] print:hidden"
              aria-label="Open Menu"
            >
              <MenuIcon />
            </button>
          )}

          {/* Close Button */}
          {menuOpen && (
            <button
              onClick={() => setMenuOpen(false)}
              className="text-[#051d40]"
              aria-label="Close Menu"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div
        ref={searchRef}
        className={`bg-white px-4 transition-all duration-300 ${
          showSearch ? "h-16 py-2" : "h-0 overflow-hidden"
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="flex items-center h-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#72cded]"
            autoFocus
            aria-label="Search URBank"
          />
        </form>
      </div>

      {/* Slide-in Menu */}
      <Transition
        show={menuOpen}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <nav
          className="fixed top-0 left-0 w-full h-full bg-white z-40 overflow-y-auto pt-24"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col px-6 pb-8 space-y-6 divide-y divide-gray-200 font-bold text-base">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 transition-colors ${
                      isActive
                        ? "text-yellow-500 font-extrabold"
                        : "text-gray-800 hover:text-yellow-500"
                    }`
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-100 text-xl rounded-full w-10 h-10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ArrowRightIcon />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Transition>
    </div>
  );
}

// Icons as React components for crisp SVG

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 21V9.75z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 22.5v-6h6v6"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3h-8v4h8V3z" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 8a6 6 0 01-12 0 6 6 0 0112 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14v4m-2 0h4"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#051d40"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#051d40"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#051d40"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
