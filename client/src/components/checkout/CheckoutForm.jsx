import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";

function CheckoutForm() {
  const navigate = useNavigate();

  const { cart, totalPrice } = useCart();
  const { createOrder } = useOrder();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    postalCode: "",
    address: "",
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

    if (!/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode =
        "کد پستی باید ۱۰ رقم باشد.";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "آدرس کامل را وارد کنید.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    createOrder({
      customer: formData,
      cart,
      totalPrice,
    });

    navigate("/order-review");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="mb-8 text-2xl font-black text-gray-900">
        اطلاعات گیرنده
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="نام"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="مثلاً علی"
        />

        <Input
          label="نام خانوادگی"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="مثلاً رضایی"
        />

        <Input
          label="شماره موبایل"
          name="phone"
          type="tel"
          inputMode="numeric"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="09123456789"
        />

        <Input
          label="کد پستی"
          name="postalCode"
          type="text"
          inputMode="numeric"
          value={formData.postalCode}
          onChange={handleChange}
          error={errors.postalCode}
          placeholder="1234567890"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="address"
          className="mb-2 block font-bold text-gray-700"
        >
          آدرس کامل
        </label>

        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={5}
          placeholder="استان، شهر، خیابان، کوچه، پلاک..."
          className={`w-full resize-none rounded-2xl border px-4 py-3 outline-none transition ${
            errors.address
              ? "border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100"
          }`}
        />

        {errors.address && (
          <p className="mt-2 text-sm text-red-500">
            {errors.address}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800"
      >
        ثبت اطلاعات و ادامه
      </button>
    </form>
  );
}

function Input({
  label,
  name,
  type = "text",
  inputMode,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-bold text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100"
        }`}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default CheckoutForm;