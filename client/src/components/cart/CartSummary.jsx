import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";


function CartSummary() {
  const { totalPrice, dispatch } = useCart();

  const handleClearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  return (
    <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-black text-gray-900">
        خلاصه سفارش
      </h2>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-500">
          جمع کل
        </span>

        <span className="font-bold">
          {totalPrice.toLocaleString()} تومان
        </span>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span className="text-gray-500">
          هزینه ارسال
        </span>

        <span className="font-bold text-green-700">
          رایگان
        </span>
      </div>

      <div className="mb-6 border-t border-gray-100 pt-5">
        <div className="flex items-center justify-between">
          <span className="font-bold">
            مبلغ قابل پرداخت
          </span>

          <span className="text-xl font-black text-green-700">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>
      </div>

<Link
  to="/checkout"
  className="block w-full rounded-2xl bg-green-700 px-6 py-4 text-center font-bold text-white transition hover:bg-green-800"
>
  ادامه ثبت سفارش
</Link>

      <button
        type="button"
        onClick={handleClearCart}
        className="mt-4 w-full rounded-xl border border-red-200 px-4 py-3 font-bold text-red-500 transition hover:bg-red-50"
      >
        خالی کردن سبد خرید
      </button>
    </div>
  );
}

export default CartSummary;