function ProductWeight({ value, onChange }) {
  const weights = [
    "5 کیلوگرم",
    "10 کیلوگرم",
    "20 کیلوگرم",
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-800">
        انتخاب وزن
      </h3>

      <div className="flex flex-wrap gap-3">
        {weights.map((weight) => (
          <button
            key={weight}
            type="button"
            onClick={() => onChange(weight)}
            className={`rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              value === weight
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 bg-white hover:border-green-500 hover:text-green-700"
            }`}
          >
            {weight}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductWeight;