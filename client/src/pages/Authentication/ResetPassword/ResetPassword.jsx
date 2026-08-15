import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("لینک بازیابی رمز معتبر نیست.");
      return;
    }

    if (!password) {
      setError("رمز عبور جدید را وارد کنید.");
      return;
    }

    if (password.length < 6) {
      setError(
        "رمز عبور باید حداقل ۶ کاراکتر باشد."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "رمز عبور و تکرار آن یکسان نیستند."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(
        response.data.message ||
          "رمز عبور با موفقیت تغییر کرد."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err);

      setError(
        err.response?.data?.message ||
          "تغییر رمز عبور با خطا مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          تغییر رمز عبور
        </h1>

        <p className="text-sm text-gray-500 text-center mt-3 mb-6">
          رمز عبور جدید خود را وارد کنید.
        </p>

        {message && (
          <div className="mb-4 rounded-lg bg-green-100 text-green-700 p-3 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            رمز عبور جدید
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="حداقل ۶ کاراکتر"
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
          />

          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2 mt-4"
          >
            تکرار رمز عبور
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="رمز عبور را دوباره وارد کنید"
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-gray-900 text-white rounded-lg py-3 hover:bg-gray-800 disabled:opacity-50"
          >
            {loading
              ? "در حال تغییر رمز..."
              : "تغییر رمز عبور"}
          </button>
        </form>

        <div className="text-center mt-5">
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

export default ResetPassword;