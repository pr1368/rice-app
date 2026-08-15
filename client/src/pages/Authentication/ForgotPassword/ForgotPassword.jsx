import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const value = identifier.trim();

    if (!value) {
      setError("لطفاً ایمیل یا شماره موبایل خود را وارد کنید.");
      return;
    }

    const isPhone = /^09\d{9}$/.test(value);

    const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isPhone && !isEmail) {
      setError(
        "لطفاً یک ایمیل معتبر یا شماره موبایل معتبر وارد کنید."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          identifier: isEmail ? value.toLowerCase() : value,
        }
      );

      setMessage(
        response.data?.message ||
          "اگر اطلاعات واردشده در سیستم ثبت شده باشد، لینک بازیابی ارسال خواهد شد."
      );

      setIdentifier("");
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.response?.data?.message ||
          "درخواست بازیابی رمز با خطا مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-[calc(100vh-160px)] bg-gray-50 flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          فراموشی رمز عبور
        </h1>

        <p className="mt-3 mb-6 text-center text-sm text-gray-500">
          ایمیل یا شماره موبایل حساب کاربری خود را وارد کنید.
        </p>

        {message && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="identifier"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ایمیل یا شماره موبایل
          </label>

          <input
            id="identifier"
            name="identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="09123456789 یا example@email.com"
            disabled={loading}
            autoComplete="username"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-gray-900 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "در حال بررسی..."
              : "بازیابی رمز عبور"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;