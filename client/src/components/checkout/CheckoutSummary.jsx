import { useCart } from "../../context/CartContext";

function CheckoutSummary() {
  const { cart, totalPrice } = useCart();

  return (
    <div className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="mb-6 text-2xl font-black">
        خلاصه سفارش
      </h2>

      <div className="mb-6 space-y-4">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.weight}`}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <p className="font-bold">
                {item.title}
              </p>

              <p className="text-sm text-gray-500">
                {item.weight} × {item.quantity}
              </p>
            </div>

            <span className="whitespace-nowrap font-bold">
              {(item.price * item.quantity).toLocaleString()}
              {" "}
              تومان
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-5">
        <div className="flex items-center justify-between">
          <span className="font-bold">
            مبلغ نهایی
          </span>

          <span className="text-xl font-black text-green-700">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;