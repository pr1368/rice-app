import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaEye,
  FaBox,
} from "react-icons/fa";

import Container from "../../components/ui/Container";
import { getMyOrders } from "../../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyOrders();

        setOrders(response.orders || []);
      } catch (error) {
        console.error("Get orders error:", error);

        setError(
          error.response?.data?.message ||
            "دریافت سفارش‌ها با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
      <Container>
        <div className="mx-auto max-w-5xl">

          {/* Header */}

          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl text-green-700">
                <FaShoppingBag />
              </div>

              <div>
                <h1 className="text-3xl font-black text-gray-900">
                  سفارش‌های من
                </h1>

                <p className="mt-1 text-gray-500">
                  سفارش‌های ثبت‌شده خود را مشاهده کنید.
                </p>
              </div>
            </div>
          </div>

          {/* Loading */}

          {loading && (
            <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
              <p className="font-bold text-gray-600">
                در حال دریافت سفارش‌ها...
              </p>
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
              <p className="font-bold text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Empty */}

          {!loading && !error && orders.length === 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl text-gray-400">
                <FaBox />
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                هنوز سفارشی ثبت نکرده‌اید
              </h2>

              <p className="mt-3 text-gray-500">
                بعد از ثبت سفارش، سفارش‌های شما در اینجا نمایش داده می‌شوند.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex rounded-2xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
              >
                مشاهده محصولات
              </Link>
            </div>
          )}

          {/* Orders */}

          {!loading && !error && orders.length > 0 && (
            <div className="space-y-5">
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                />
              ))}
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}

function OrderCard({ order }) {
  const status = getStatus(order.status);

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Top */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm text-gray-500">
            شماره سفارش
          </p>

          <p className="mt-1 break-all font-black text-gray-900">
            {order.orderNumber || order._id}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${status.className}`}
        >
          {status.label}
        </span>

      </div>

      {/* Info */}

      <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">

        <div>
          <p className="text-sm text-gray-500">
            مبلغ سفارش
          </p>

          <p className="mt-1 font-black text-gray-900">
            {Number(order.totalPrice || 0).toLocaleString()} تومان
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            تعداد اقلام
          </p>

          <p className="mt-1 font-black text-gray-900">
            {order.items?.length || 0} محصول
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            تاریخ سفارش
          </p>

          <p className="mt-1 font-bold text-gray-800">
            {formatDate(order.createdAt)}
          </p>
        </div>

      </div>

      {/* Items Preview */}

      {order.items?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">

          {order.items.slice(0, 4).map((item, index) => (
            <div
              key={`${item.productId}-${index}`}
              className="flex items-center gap-3 rounded-2xl bg-gray-50 px-3 py-2"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-gray-400">
                  <FaBox />
                </div>
              )}

              <div>
                <p className="max-w-[160px] truncate text-sm font-bold text-gray-800">
                  {item.name}
                </p>

                <p className="text-xs text-gray-500">
                  {item.quantity} عدد
                </p>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* Action */}

      <div className="mt-6 border-t border-gray-100 pt-5">

        <Link
          to={`/orders/${order._id}`}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 font-bold text-gray-700 transition hover:border-green-600 hover:text-green-700"
        >
          <FaEye />
          مشاهده جزئیات
        </Link>

      </div>

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

export default Orders;