import { Link, Navigate } from "react-router-dom";

import Container from "../../components/ui/Container";

import { useOrder } from "../../context/OrderContext";

function OrderSuccess() {
  const { order } = useOrder();

  if (!order) {
    return <Navigate to="/cart" replace />;
  }

  const {
    _id,
    orderNumber,
    customer,
    totalPrice,
    status,
  } = order;

  const isPaid = status === "paid";

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Success Header */}

          <div className="rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm sm:p-10">
            {/* Icon */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="mt-6 text-3xl font-black text-gray-900 sm:text-4xl">
              سفارش شما با موفقیت ثبت شد
            </h1>

            <p className="mt-4 leading-7 text-gray-500">
              پرداخت سفارش با موفقیت انجام شد و سفارش شما
              برای پردازش ثبت شده است.
            </p>

            {/* Order Number */}

            <div className="mt-8 rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                شماره سفارش
              </p>

              <p className="mt-2 break-all text-lg font-black text-gray-900">
                {orderNumber || _id}
              </p>
            </div>

            {/* Order Info */}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Info
                label="مبلغ پرداختی"
                value={`${Number(
                  totalPrice || 0
                ).toLocaleString()} تومان`}
              />

              <Info
                label="وضعیت پرداخت"
                value={
                  isPaid
                    ? "پرداخت شده"
                    : "در انتظار پرداخت"
                }
                valueClassName={
                  isPaid
                    ? "text-green-700"
                    : "text-orange-600"
                }
              />
            </div>

            {/* Customer */}

            <div className="mt-5 rounded-2xl bg-gray-50 p-5 text-right">
              <p className="mb-3 text-sm text-gray-500">
                گیرنده سفارش
              </p>

              <p className="font-bold text-gray-800">
                {customer?.firstName}{" "}
                {customer?.lastName}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {customer?.phone}
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {customer?.address}
              </p>
            </div>

            {/* Actions */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="flex-1 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800"
              >
                بازگشت به فروشگاه
              </Link>

              <Link
                to="/products"
                className="flex-1 rounded-2xl border border-gray-200 px-6 py-4 font-bold text-gray-700 transition hover:border-green-600 hover:text-green-700"
              >
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Info({
  label,
  value,
  valueClassName = "text-gray-900",
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5 text-right">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p
        className={`mt-2 font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}

export default OrderSuccess;