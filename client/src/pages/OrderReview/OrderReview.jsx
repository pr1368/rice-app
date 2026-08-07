import { Link, Navigate } from "react-router-dom";

import Container from "../../components/ui/Container";
import { useOrder } from "../../context/OrderContext";

function OrderReview() {
  const { order } = useOrder();

  if (!order) {
    return <Navigate to="/cart" replace />;
  }

  const { customer, items, totalPrice } = order;

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900">
            بررسی سفارش
          </h1>

          <p className="mt-3 text-gray-500">
            اطلاعات سفارش خود را قبل از ادامه بررسی کنید.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Order Details */}

          <div className="space-y-8 lg:col-span-2">

            {/* Customer */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-black">
                اطلاعات گیرنده
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <Info
                  label="نام و نام خانوادگی"
                  value={`${customer.firstName} ${customer.lastName}`}
                />

                <Info
                  label="شماره موبایل"
                  value={customer.phone}
                />

                <Info
                  label="کد پستی"
                  value={customer.postalCode}
                />

                <Info
                  label="آدرس"
                  value={customer.address}
                />
              </div>
            </div>

            {/* Products */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-black">
                محصولات سفارش
              </h2>

              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.weight}`}
                    className="flex flex-col gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        وزن: {item.weight}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        تعداد: {item.quantity}
                      </p>
                    </div>

                    <p className="font-black text-green-700">
                      {(item.price * item.quantity).toLocaleString()}
                      {" "}
                      تومان
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}

          <div className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-6 text-2xl font-black">
              خلاصه نهایی
            </h2>

            <div className="mb-6 flex items-center justify-between border-b pb-5">
              <span className="text-gray-500">
                تعداد کالا
              </span>

              <span className="font-bold">
                {items.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold">
                مبلغ نهایی
              </span>

              <span className="text-xl font-black text-green-700">
                {totalPrice.toLocaleString()} تومان
              </span>
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800"
            >
              تأیید سفارش و ادامه پرداخت
            </button>

            <Link
              to="/checkout"
              className="mt-4 block text-center font-bold text-gray-500 transition hover:text-green-700"
            >
              بازگشت به اطلاعات گیرنده
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="mb-1 text-sm text-gray-500">
        {label}
      </p>

      <p className="font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default OrderReview;