import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FaArrowRight,
  FaBox,
  FaCheckCircle,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

import Container from "../../components/ui/Container";

import {
  getOrderById,
  payOrder,
  cancelOrder,
} from "../../services/orderService";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrderById(id);

        setOrder(response.order);
      } catch (error) {
        console.error("Get order details error:", error);

        setError(
          error.response?.data?.message ||
            "دریافت جزئیات سفارش با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handlePay = async () => {
    try {
      setActionLoading(true);
      setError("");

      const response = await payOrder(id);

      setOrder(response.order);
    } catch (error) {
      console.error("Pay order error:", error);

      setError(
        error.response?.data?.message ||
          "پرداخت سفارش با خطا مواجه شد."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "آیا از لغو این سفارش مطمئن هستید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      const response = await cancelOrder(id);

      setOrder(response.order);
    } catch (error) {
      console.error("Cancel order error:", error);

      setError(
        error.response?.data?.message ||
          "لغو سفارش با خطا مواجه شد."
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <p className="font-bold text-gray-600">
              در حال دریافت جزئیات سفارش...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (error && !order) {
    return (
      <section className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-500">
              <FaTimesCircle />
            </div>

            <h1 className="mt-5 text-2xl font-black text-gray-900">
              سفارش پیدا نشد
            </h1>

            <p className="mt-3 text-red-600">
              {error}
            </p>

            <Link
              to="/orders"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
            >
              <FaArrowRight />
              بازگشت به سفارش‌ها
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  if (!order) {
    return null;
  }

  const status = getStatus(order.status);

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
      <Container>
        <div className="mx-auto max-w-5xl">

          {/* Back */}

          <div className="mb-6">
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="inline-flex items-center gap-2 font-bold text-gray-600 transition hover:text-green-700"
            >
              <FaArrowRight />
              بازگشت به سفارش‌های من
            </button>
          </div>

          {/* Header */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  شماره سفارش
                </p>

                <p className="mt-1 break-all text-lg font-black text-gray-900">
                  {order.orderNumber || order._id}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-5 py-2 text-sm font-bold ${status.className}`}
              >
                {status.label}
              </span>

            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-center">
              <p className="font-bold text-red-600">
                {error}
              </p>
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Main */}

            <div className="space-y-6 lg:col-span-2">

              {/* Products */}

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <FaBox />
                  </div>

                  <h2 className="text-xl font-black text-gray-900">
                    محصولات سفارش
                  </h2>
                </div>

                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex flex-col gap-4 rounded-2xl bg-gray-50 p-4 sm:flex-row sm:items-center"
                    >

                      {/* Image */}

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-2xl text-gray-400">
                          <FaBox />
                        </div>
                      )}

                      {/* Info */}

                      <div className="min-w-0 flex-1">
                        <h3 className="font-black text-gray-900">
                          {item.name}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <span>
                            وزن: {item.weight}
                          </span>

                          <span>
                            تعداد: {item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Price */}

                      <div className="text-right sm:text-left">
                        <p className="font-black text-gray-900">
                          {Number(item.price || 0).toLocaleString()} تومان
                        </p>

                        {item.quantity > 1 && (
                          <p className="mt-1 text-xs text-gray-500">
                            {Number(item.price || 0).toLocaleString()} ×{" "}
                            {item.quantity}
                          </p>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Customer */}

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <FaUser />
                  </div>

                  <h2 className="text-xl font-black text-gray-900">
                    اطلاعات گیرنده
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  <Info
                    icon={<FaUser />}
                    label="نام و نام خانوادگی"
                    value={`${order.customer?.firstName || ""} ${
                      order.customer?.lastName || ""
                    }`}
                  />

                  <Info
                    icon={<FaPhone />}
                    label="شماره موبایل"
                    value={order.customer?.phone || "-"}
                  />

                  <Info
                    icon={<FaMapMarkerAlt />}
                    label="کد پستی"
                    value={order.customer?.postalCode || "-"}
                  />

                  <Info
                    icon={<FaMapMarkerAlt />}
                    label="آدرس"
                    value={order.customer?.address || "-"}
                  />

                </div>
              </div>

            </div>

            {/* Sidebar */}

            <div className="lg:col-span-1">

              <div className="sticky top-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-black text-gray-900">
                  خلاصه سفارش
                </h2>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between text-gray-600">
                    <span>تعداد اقلام</span>

                    <span className="font-bold text-gray-900">
                      {order.items?.length || 0} محصول
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-600">
                        مبلغ کل
                      </span>

                      <span className="text-xl font-black text-green-700">
                        {Number(
                          order.totalPrice || 0
                        ).toLocaleString()}{" "}
                        تومان
                      </span>
                    </div>
                  </div>

                </div>

                {/* Actions */}

                {order.status === "pending" && (
                  <div className="mt-6 space-y-3">

                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={actionLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FaCreditCard />

                      {actionLoading
                        ? "در حال پردازش..."
                        : "پرداخت سفارش"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={actionLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 px-5 py-4 font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FaTimesCircle />
                      لغو سفارش
                    </button>

                  </div>
                )}

                {order.status === "paid" && (
                  <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-green-50 p-4 text-center font-bold text-green-700">
                    <FaCheckCircle />
                    سفارش پرداخت شده است
                  </div>
                )}

                {order.status === "cancelled" && (
                  <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-red-50 p-4 text-center font-bold text-red-600">
                    <FaTimesCircle />
                    این سفارش لغو شده است
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-green-700">
        <span>{icon}</span>

        <span className="text-sm font-bold">
          {label}
        </span>
      </div>

      <p className="break-words font-bold leading-7 text-gray-800">
        {value}
      </p>
    </div>
  );
}

function getStatus(status) {
  switch (status) {
    case "paid":
      return {
        label: "پرداخت شده",
        className: "bg-green-100 text-green-700",
      };

    case "confirmed":
      return {
        label: "تأیید شده",
        className: "bg-blue-100 text-blue-700",
      };

    case "shipped":
      return {
        label: "ارسال شده",
        className: "bg-purple-100 text-purple-700",
      };

    case "delivered":
      return {
        label: "تحویل داده شده",
        className: "bg-green-100 text-green-700",
      };

    case "cancelled":
      return {
        label: "لغو شده",
        className: "bg-red-100 text-red-700",
      };

    case "pending":
    default:
      return {
        label: "در انتظار پرداخت",
        className: "bg-orange-100 text-orange-700",
      };
  }
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("fa-IR");
}

export default OrderDetails;