import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Container from "../../components/ui/Container";

import { useOrder } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";

function OrderReview() {
  const navigate = useNavigate();

  const {
    order,
    payOrder,
    paymentLoading,
    paymentError,
  } = useOrder();

  const { dispatch } = useCart();

  if (!order) {
    return <Navigate to="/cart" replace />;
  }

  const {
    _id,
    orderNumber,
    customer,
    items = [],
    totalPrice,
    status,
  } = order;

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const isPaid = status === "paid";

  const handlePayment = async () => {
    if (paymentLoading || isPaid) {
      return;
    }

    try {
      await payOrder();

      // فقط بعد از پرداخت موفق، سبد خرید خالی می‌شود
      dispatch({
        type: "CLEAR_CART",
      });

      navigate("/order-success");
    } catch (error) {
      // خطا در OrderContext مدیریت می‌شود
      console.error("Payment error:", error);
    }
  };

  return (
    <section className="py-16">
      <Container>
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900">
            بررسی سفارش
          </h1>

          <p className="mt-3 text-gray-500">
            اطلاعات سفارش خود را قبل از پرداخت بررسی کنید.
          </p>

          {(orderNumber || _id) && (
            <p className="mt-3 text-sm font-bold text-green-700">
              شماره سفارش: {orderNumber || _id}
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* =========================
              Order Details
          ========================= */}

          <div className="space-y-8 lg:col-span-2">
            {/* Customer Information */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-black text-gray-900">
                اطلاعات گیرنده
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <Info
                  label="نام و نام خانوادگی"
                  value={`${customer?.firstName || ""} ${
                    customer?.lastName || ""
                  }`}
                />

                <Info
                  label="شماره موبایل"
                  value={customer?.phone || "-"}
                />

                <Info
                  label="کد پستی"
                  value={customer?.postalCode || "-"}
                />

                <div className="rounded-2xl bg-gray-50 p-4 sm:col-span-2">
                  <p className="mb-1 text-sm text-gray-500">
                    آدرس
                  </p>

                  <p className="font-bold leading-7 text-gray-800">
                    {customer?.address || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-black text-gray-900">
                محصولات سفارش
              </h2>

              {items.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500">
                  محصولی در این سفارش وجود ندارد.
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item, index) => {
                    const price = Number(item.price || 0);
                    const quantity = Number(item.quantity || 0);
                    const itemTotal = price * quantity;

                    return (
                      <div
                        key={
                          item.productId ||
                          `${item.name}-${item.weight}-${index}`
                        }
                        className="flex flex-col gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                      >
                        {/* Product Image */}

                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name || "محصول"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                              بدون تصویر
                            </div>
                          )}
                        </div>

                        {/* Product Information */}

                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">
                            {item.name || "محصول"}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            وزن: {item.weight || "-"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            تعداد: {quantity}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            قیمت واحد:{" "}
                            {price.toLocaleString()} تومان
                          </p>
                        </div>

                        {/* Product Total */}

                        <p className="font-black text-green-700">
                          {itemTotal.toLocaleString()} تومان
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* =========================
              Summary
          ========================= */}

          <div className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-6 text-2xl font-black text-gray-900">
              خلاصه نهایی
            </h2>

            {/* Total Items */}

            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-5">
              <span className="text-gray-500">
                تعداد کالا
              </span>

              <span className="font-bold text-gray-900">
                {totalItems}
              </span>
            </div>

            {/* Total Price */}

            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold text-gray-900">
                مبلغ نهایی
              </span>

              <span className="text-xl font-black text-green-700">
                {Number(totalPrice || 0).toLocaleString()} تومان
              </span>
            </div>

            {/* Order Status */}

            <div className="mb-6 rounded-2xl bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500">
                وضعیت سفارش
              </p>

              <p
                className={`mt-2 font-bold ${
                  isPaid
                    ? "text-green-700"
                    : "text-orange-600"
                }`}
              >
                {isPaid
                  ? "پرداخت شده"
                  : "در انتظار پرداخت"}
              </p>
            </div>

            {/* Payment Error */}

            {paymentError && (
              <div className="mb-4 rounded-2xl bg-red-50 p-4 text-center text-sm font-bold leading-6 text-red-600">
                {paymentError}
              </div>
            )}

            {/* Payment Button */}

            <button
              type="button"
              onClick={handlePayment}
              disabled={paymentLoading || isPaid}
              className="w-full rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paymentLoading
                ? "در حال پردازش پرداخت..."
                : isPaid
                  ? "پرداخت شده"
                  : "تأیید سفارش و ادامه پرداخت"}
            </button>

            {/* Back */}

            {!isPaid && (
              <Link
                to="/checkout"
                className="mt-4 block text-center font-bold text-gray-500 transition hover:text-green-700"
              >
                بازگشت به اطلاعات گیرنده
              </Link>
            )}
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

      <p className="font-bold leading-7 text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default OrderReview;