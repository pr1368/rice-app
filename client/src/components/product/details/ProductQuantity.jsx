import { FaMinus, FaPlus } from "react-icons/fa";

function ProductQuantity({ value, onChange }) {
  const increase = () => {
    onChange(value + 1);
  };

  const decrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-800">
        تعداد
      </h3>

      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200">

        <button
          type="button"
          onClick={decrease}
          className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
        >
          <FaMinus size={14} />
        </button>

        <span className="flex h-12 w-14 items-center justify-center border-x text-lg font-bold">
          {value}
        </span>

        <button
          type="button"
          onClick={increase}
          className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
        >
          <FaPlus size={14} />
        </button>

      </div>
    </div>
  );
}

export default ProductQuantity;