import Button from "../ui/Button";

function CartSummary({ cart }) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-black">
        خلاصه سفارش
      </h2>

      <div className="mb-4 flex justify-between">
        <span>جمع کل</span>

        <span className="font-bold">
          {totalPrice.toLocaleString()} تومان
        </span>
      </div>

      <Button fullWidth>
        ادامه خرید
      </Button>

    </div>
  );
}

export default CartSummary;