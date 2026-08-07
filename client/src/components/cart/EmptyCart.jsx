import { Link } from "react-router-dom";

import Button from "../ui/Button";

function EmptyCart() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">

      <h2 className="mb-4 text-3xl font-black">
        سبد خرید شما خالی است
      </h2>

      <p className="mb-8 text-gray-500">
        هنوز محصولی به سبد خرید اضافه نکرده‌اید.
      </p>

      <Link to="/products">
        <Button>
          مشاهده محصولات
        </Button>
      </Link>

    </div>
  );
}

export default EmptyCart;