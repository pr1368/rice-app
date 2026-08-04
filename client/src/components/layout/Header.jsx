import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-3xl font-bold text-green-700">
          RiceShop
        </div>

        {/* Desktop Menu */}
        <nav className="hidden gap-8 md:flex">
          <a href="#" className="hover:text-green-600 transition">
            خانه
          </a>

          <a href="#" className="hover:text-green-600 transition">
            محصولات
          </a>

          <a href="#" className="hover:text-green-600 transition">
            درباره ما
          </a>

          <a href="#" className="hover:text-green-600 transition">
            تماس با ما
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          <button>
            <FaUser size={20} />
          </button>

          <button className="relative">
            <FaShoppingCart size={22} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              0
            </span>

          </button>

          <button className="md:hidden">
            <HiOutlineMenuAlt3 size={28} />
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;