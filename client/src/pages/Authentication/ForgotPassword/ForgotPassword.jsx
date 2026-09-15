import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ======================================================
  // تغییر مقدار ورودی
  // ======================================================

  const handleChange = (event) => {
    setIdentifier(event.target.value);

    // پاک کردن پیام‌های قبلی هنگام تایپ
    if (error) {
      setError("");
    }

    if (message) {
      setMessage("");
    }
  };

  // ======================================================
  // ارسال درخواست بازیابی
  // ======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const value = identifier.trim();

    // -----------------------------
    // خالی بودن
    // -----------------------------

    if (!value) {
      setError(
        "لطفاً ایمیل یا شماره موبایل خود را وارد کنید."
      );
      return;
    }

    // -----------------------------
    // تشخیص شماره موبایل
    // -----------------------------

    const isPhone = /^09\d{9}$/.test(value);

    // -----------------------------
    // تشخیص ایمیل
    // -----------------------------

    const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // -----------------------------
    // اعتبارسنجی
    // -----------------------------

    if (!isPhone && !isEmail) {
      setError(
        "لطفاً یک ایمیل معتبر یا شماره موبایل معتبر وارد کنید."
      );
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // ارسال به Backend
      // -----------------------------

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          identifier: isEmail
            ? value.toLowerCase()
            : value,
        }
      );

      // -----------------------------
      // موفقیت
      // -----------------------------

      setMessage(
        response.data?.message ||
          "لینک بازیابی رمز عبور ارسال شد."
      );

      setIdentifier("");
    } catch (err) {
      console.error(
        "Forgot password error:",
        err
      );

      // -----------------------------
      // خطای Backend
      // -----------------------------

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError(
          "ارتباط با سرور برقرار نشد. لطفاً روشن بودن Backend را بررسی کنید."
        );
      } else {
        setError(
          "درخواست بازیابی رمز عبور با خطا مواجه شد."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <section
      dir="rtl"
      className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-gray-50 px-4 py-12"
    >
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          {/* ==================================================
              Header
          ================================================== */}

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              🔑
            </div>

            <h1 className="text-3xl font-black text-gray-900">
              فراموشی رمز عبور
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              ایمیل یا شماره موبایل حساب کاربری خود را وارد کنید.
            </p>
          </div>

          {/* ==================================================
              Success Message
          ================================================== */}

          {message && (
            <div className="mb-5 rounded-2xl bg-green-50 p-4 text-center text-sm font-bold leading-6 text-green-700">
              {message}
            </div>
          )}

          {/* ==================================================
              Error Message
          ================================================== */}

          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 p-4 text-center text-sm font-bold leading-6 text-red-600">
              {error}
            </div>
          )}

          {/* ==================================================
              Form
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Identifier */}

            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                ایمیل یا شماره موبایل
              </label>

              <input
                id="identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={handleChange}
                placeholder="09123456789 یا example@gmail.com"
                disabled={loading}
                autoComplete="username"
                dir="ltr"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "در حال ارسال..."
                : "ارسال لینک بازیابی"}
            </button>
          </form>

          {/* ==================================================
              Back To Login
          ================================================== */}

          <div className="mt-6 text-center text-sm text-gray-500">
            رمز عبورتان را به یاد آوردید؟

            <Link
              to="/login"
              className="mr-2 font-bold text-green-700 transition hover:text-green-800"
            >
              ورود به حساب
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;