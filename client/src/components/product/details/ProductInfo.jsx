import { useState } from "react";

import {
  FaStar,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

import ProductWeight from "./ProductWeight";
import ProductQuantity from "./ProductQuantity";

import { useCart } from "../../../context/CartContext";

function ProductInfo({ product }) {
  const { dispatch } = useCart();

  const [selectedWeight, setSelectedWeight] = useState(
    product.weight || 5
  );

  const [quantity, setQuantity] = useState(1);

  const isInStock = Number(product.stock) > 0;

  // قیمت بسته بر اساس وزن انتخاب‌شده
  const pricePerKg = Number(product.price) / Number(product.weight || 5);

  const selectedPrice = Math.round(
    pricePerKg * Number(selectedWeight)
  );

  const handleAddToCart = () => {
    if (!isInStock) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product._id,
        name: product.name,
        image:
          product.images?.[0] ||
          "https://placehold.co/800x600?text=RiceShop",
        price: selectedPrice,
        weight: Number(selectedWeight),
        quantity,
      },
    });
  };

  return (
    <div className="space-y-8">
      {product.badge && <Badge>{product.badge}</Badge>}

      <h1 className="text-4xl font-black leading-relaxed text-gray-900">
        {product.name}
      </h1>

      <div className="text-gray-500">
        دسته‌بندی:
        <span className="mr-2 font-bold text-green-700">
          {product.category}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />

          <span className="font-bold">
            {product.rating || 5}
          </span>
        </div>

        <span className="text-gray-500">
          امتیاز کاربران
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            وزن پایه
          </p>

          <p className="font-bold text-green-700">
            {product.weight} کیلوگرم
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            دسته‌بندی
          </p>

          <p className="font-bold text-green-700">
            {product.category || "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            موجودی
          </p>

          <p
            className={`font-bold ${
              isInStock
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {isInStock
              ? `${product.stock} بسته`
              : "ناموجود"}
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            وضعیت
          </p>

          <p
            className={`font-bold ${
              product.isActive && isInStock
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {product.isActive && isInStock
              ? "فعال و موجود"
              : "ناموجود"}
          </p>
        </div>
      </div>

      {product.description && (
        <div>
          <h3 className="mb-2 text-lg font-bold text-gray-900">
            توضیحات
          </h3>

          <p className="leading-8 text-gray-600">
            {product.description}
          </p>
        </div>
      )}

      {/* قیمت بسته انتخاب‌شده */}
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
        <p className="mb-2 text-sm text-gray-500">
          قیمت بسته {selectedWeight} کیلوگرمی
        </p>

        <h2 className="text-5xl font-black text-green-700">
          {selectedPrice.toLocaleString()} تومان
        </h2>
      </div>

      <ProductWeight
        value={selectedWeight}
        onChange={setSelectedWeight}
      />

      <ProductQuantity
        value={quantity}
        onChange={setQuantity}
      />

      <Button
        fullWidth
        icon={<FaTruck />}
        onClick={handleAddToCart}
        disabled={!isInStock}
      >
        {isInStock
          ? "افزودن به سبد خرید"
          : "محصول ناموجود است"}
      </Button>

      <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <FaTruck className="text-green-700" />

          <span className="text-gray-700">
            ارسال سریع به سراسر کشور
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FaShieldAlt className="text-green-700" />

          <span className="text-gray-700">
            تضمین کیفیت و اصالت محصول
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;