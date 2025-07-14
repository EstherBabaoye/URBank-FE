import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Personal', path: '/personal' },
    { label: 'Business', path: '/business' },
    { label: 'About Us', path: '/about' },
    { label: 'Admin', path: '/admin-login' },
  ];

  return (
    <header className="fixed top-0 print:hidden w-full z-50 bg-[#72cded] shadow-lg h-8 flex items-center justify-center px-4 lg:px-10">
      <nav>
        <ul className="flex space-x-10 font-semibold text-base lg:text-sm uppercase">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`relative group transition-all duration-200 ${
                  location.pathname === item.path ? 'text-[#051d40]' : ''
                }`}
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out rounded bg-gray-300 group-hover:bg-[#fbbf24]"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
