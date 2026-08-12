import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthInput from "../../../components/auth/AuthInput";
import { useAuth } from "../../../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    loading,
    error: authError,
  } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "نام را وارد کنید.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی را وارد کنید.";
    }

    if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "شماره موبایل باید ۱۱ رقم و با 09 شروع شود.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email = "ایمیل معتبر وارد کنید.";
    }

    if (formData.password.length < 6) {
      newErrors.password =
        "رمز عبور باید حداقل ۶ کاراکتر باشد.";
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "تکرار رمز عبور با رمز عبور مطابقت ندارد.";
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
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
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
      <div className="mx-auto max-w-xl px-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              👤
            </div>

            <h1 className="text-3xl font-black text-gray-900">
              ایجاد حساب کاربری
            </h1>

            <p className="mt-3 text-gray-500">
              برای خرید راحت‌تر در RiceShop ثبت‌نام کنید.
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
            <div className="grid gap-5 sm:grid-cols-2">
              <AuthInput
                label="نام"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="نام"
                error={errors.firstName}
              />

              <AuthInput
                label="نام خانوادگی"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="نام خانوادگی"
                error={errors.lastName}
              />
            </div>

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
              label="ایمیل"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              error={errors.email}
            />

            <AuthInput
              label="رمز عبور"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="حداقل ۶ کاراکتر"
              error={errors.password}
            />

            <AuthInput
              label="تکرار رمز عبور"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="رمز عبور را دوباره وارد کنید"
              error={errors.confirmPassword}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "در حال ایجاد حساب..."
                : "ایجاد حساب"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            قبلاً حساب ساخته‌اید؟

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

export default Register;