import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import {
  HiOutlineMenuAlt3,
} from "react-icons/hi";

import {
  IoClose,
} from "react-icons/io5";

import { navLinks } from "../../constants/navigation";

import { useCart } from "../../context/CartContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useCart();

  return (
    <header className="border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">

        {/* Logo */}

        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-black text-green-700 transition hover:text-green-800 sm:text-3xl"
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
                `font-medium transition ${
                  isActive
                    ? "font-bold text-green-700"
                    : "text-gray-700 hover:text-green-700"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}

          {/* Products */}

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "font-bold text-green-700"
                  : "text-gray-700 hover:text-green-700"
              }`
            }
          >
            محصولات
          </NavLink>
        </nav>

        {/* Right Actions */}

        <div className="flex items-center gap-4">

          {/* Profile */}

          <NavLink
            to="/profile"
            className="text-xl text-gray-700 transition hover:text-green-700"
            aria-label="پروفایل"
          >
            <FaUser />
          </NavLink>

          {/* Cart */}

          <NavLink
            to="/cart"
            className="relative text-xl text-gray-700 transition hover:text-green-700"
            aria-label="سبد خرید"
          >
            <FaShoppingCart />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Mobile Menu Button */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "بستن منو"
                : "باز کردن منو"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-gray-700 transition hover:text-green-700 md:hidden"
          >
            {menuOpen ? (
              <IoClose />
            ) : (
              <HiOutlineMenuAlt3 />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white md:hidden">

          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">

            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-green-50 font-bold text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}

            {/* Products */}

            <NavLink
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-green-50 font-bold text-green-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                }`
              }
            >
              محصولات
            </NavLink>

          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;