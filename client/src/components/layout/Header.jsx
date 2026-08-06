import { useState } from "react";
import { NavLink } from "react-router-dom";


import {
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import { navLinks } from "../../constants/navigation";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <NavLink
          to="/"
          className="text-3xl font-black text-green-700"
        >
          RiceShop
        </NavLink>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "font-bold text-green-700"
                    : "text-gray-700 hover:text-green-700"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button className="text-xl">
            <FaUser />
          </button>

          <button className="relative text-xl">

            <FaShoppingCart />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              0
            </span>

          </button>

          <button
            className="text-3xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <nav className="border-t bg-white md:hidden">

          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 ${
                  isActive
                    ? "bg-green-100 font-bold text-green-700"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}

        </nav>
      )}
    </header>
  );
}

export default Header;