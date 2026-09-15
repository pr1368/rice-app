
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiLogOut,
  FiUser,
  FiChevronLeft,
} from "react-icons/fi";

import { useAdminAuth } from "../../context/AdminAuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed right-0 top-0 z-40 flex h-screen w-64 flex-col border-l border-gray-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-gray-200">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">
            RiceShop
          </h1>

          <p className="mt-0.5 text-xs text-gray-400">
            پنل مدیریت
          </p>
        </div>
      </div>

      {/* Admin Profile */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <FiUser size={19} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800">
              {user
                ? `${user.firstName || ""} ${
                    user.lastName || ""
                  }`.trim() || "مدیر سایت"
                : "مدیر سایت"}
            </p>

            <p className="mt-0.5 truncate text-xs text-gray-400">
              مدیر سیستم
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-medium text-gray-400">
          منوی اصلی
        </p>

        <div>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                location.pathname === "/"
                  ? "bg-white/10"
                  : "bg-gray-100 group-hover:bg-white"
              }`}
            >
              <FiGrid size={19} />
            </span>

            <span className="mr-3 flex-1">
              داشبورد
            </span>

            <FiChevronLeft
              size={16}
              className="opacity-50"
            />
          </NavLink>
        </div>
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition group-hover:bg-red-100">
            <FiLogOut size={19} />
          </span>

          <span className="mr-3">
            خروج از حساب
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

