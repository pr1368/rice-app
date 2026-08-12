import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaSave } from "react-icons/fa";

import AuthInput from "../../../components/auth/AuthInput";
import { useAuth } from "../../../context/AuthContext";

function EditProfile() {
  const navigate = useNavigate();

  const {
    user,
    updateProfile,
    loading,
    error,
  } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

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

    setSuccess("");
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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        postalCode: formData.postalCode,
      });

      setSuccess("اطلاعات پروفایل با موفقیت ذخیره شد.");

      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (error) {
      // خطا داخل AuthContext مدیریت شده
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/profile"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm transition hover:text-green-700"
          >
            <FaArrowRight />
          </Link>

          <div>
            <h1 className="text-3xl font-black text-gray-900">
              ویرایش پروفایل
            </h1>

            <p className="mt-2 text-gray-500">
              اطلاعات حساب کاربری خود را ویرایش کنید.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">

              <AuthInput
                label="نام"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="نام"
                error={errors.firstName}
              />

              <AuthInput
                label="نام خانوادگی"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="نام خانوادگی"
                error={errors.lastName}
              />

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

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

            </div>

            <AuthInput
              label="کد پستی"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="کد پستی"
            />

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                آدرس
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="آدرس کامل خود را وارد کنید"
                rows={4}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSave />

                {loading
                  ? "در حال ذخیره..."
                  : "ذخیره تغییرات"}
              </button>

              <Link
                to="/profile"
                className="flex flex-1 items-center justify-center rounded-2xl border border-gray-200 px-6 py-4 font-bold text-gray-700 transition hover:border-green-600 hover:text-green-700"
              >
                انصراف
              </Link>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;