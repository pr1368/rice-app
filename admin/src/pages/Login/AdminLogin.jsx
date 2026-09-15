import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { adminLogin } from "../../services/adminService";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await adminLogin(phone, password);

      if (!data?.success || !data?.token) {
        throw new Error(
          data?.message || "ورود به پنل مدیریت انجام نشد."
        );
      }

      if (data.user?.role !== "admin") {
        throw new Error(
          "این حساب دسترسی ورود به پنل مدیریت را ندارد."
        );
      }

login(data.token, data.user);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "ورود به پنل مدیریت انجام نشد."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            ورود مدیر
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            ورود به پنل مدیریت RiceShop
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              شماره موبایل
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="09xxxxxxxxx"
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              رمز عبور
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="رمز عبور"
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "در حال ورود..." : "ورود به پنل"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;