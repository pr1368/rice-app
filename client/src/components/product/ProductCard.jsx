import { FaShoppingCart, FaStar } from "react-icons/fa";

function ProductCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">
      <img
        src="https://picsum.photos/500/350"
        alt="Rice"
        className="h-60 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">برنج طارم ممتاز</h3>

        <p className="mt-2 text-sm text-gray-500">
          برداشت ۱۴۰۴ - استان مازندران
        </p>

        <div className="mt-3 flex items-center gap-2 text-yellow-500">
          <FaStar />
          <span>4.9</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-green-700">
            ۲,۸۵۰,۰۰۰ تومان
          </span>

          <button className="rounded-xl bg-green-700 p-3 text-white hover:bg-green-800">
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;