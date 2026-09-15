function ProductWeight({ value, onChange }) {
  const weights = [
    { value: 5, label: "5 کیلوگرم" },
    { value: 10, label: "10 کیلوگرم" },
    { value: 20, label: "20 کیلوگرم" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-800">
        انتخاب وزن
      </h3>

      <div className="flex flex-wrap gap-3">
        {weights.map((weight) => (
          <button
            key={weight.value}
            type="button"
            onClick={() => onChange(weight.value)}
            className={`rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              Number(value) === weight.value
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 bg-white hover:border-green-500 hover:text-green-700"
            }`}
          >
            {weight.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductWeight;