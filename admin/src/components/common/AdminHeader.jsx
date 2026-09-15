import { FiBell, FiUser } from "react-icons/fi";

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          پنل مدیریت
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
        >
          <FiBell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
            <FiUser size={18} />
          </div>

          <span className="text-sm font-medium text-gray-700">
            مدیر سایت
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;