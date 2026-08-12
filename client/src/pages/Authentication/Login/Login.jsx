import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthInput from "../../../components/auth/AuthInput";
import { useAuth } from "../../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const {
    login,
    loading,
    error: authError,
  } = useAuth();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "شماره موبایل باید ۱۱ رقم و با 09 شروع شود.";
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور را وارد کنید.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({
        phone: formData.phone,
        password: formData.password,
      });

      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      // خطا داخل AuthContext مدیریت می‌شود
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gray-50 py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              👤
            </div>

            <h1 className="text-3xl font-black text-gray-900">
              ورود به حساب
            </h1>

            <p className="mt-3 text-gray-500">
              به حساب کاربری RiceShop خود وارد شوید.
            </p>
          </div>

          {authError && (
            <div className="mb-5 rounded-2xl bg-red-50 p-4 text-center text-sm font-bold leading-6 text-red-600">
              {authError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <AuthInput
              label="شماره موبایل"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="09123456789"
              error={errors.phone}
            />

            <AuthInput
              label="رمز عبور"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="رمز عبور خود را وارد کنید"
              error={errors.password}
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-bold text-green-700 transition hover:text-green-800"
              >
                رمز عبور را فراموش کرده‌اید؟
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "در حال ورود..." : "ورود به حساب"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            حساب کاربری ندارید؟

            <Link
              to="/register"
              className="mr-2 font-bold text-green-700 transition hover:text-green-800"
            >
              ثبت‌نام کنید
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Login;