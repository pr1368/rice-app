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
    product.weight || "10 کیلوگرم"
  );

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        weight: selectedWeight,
        quantity,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Badge */}

      {product.badge && (
        <Badge>{product.badge}</Badge>
      )}

      {/* Title */}

      <h1 className="text-4xl font-black leading-relaxed text-gray-900">
        {product.title}
      </h1>

      {/* Rating */}

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />

          <span className="font-bold">
            {product.rating}
          </span>
        </div>

        <span className="text-gray-500">
          امتیاز کاربران
        </span>
      </div>

      {/* Product Features */}

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            مبدا
          </p>

          <p className="font-bold text-green-700">
            {product.province}
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            کیفیت
          </p>

          <p className="font-bold text-green-700">
            {product.quality}
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            سال برداشت
          </p>

          <p className="font-bold text-green-700">
            {product.harvest}
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-sm text-gray-500">
            وضعیت
          </p>

          <p
            className={`font-bold ${
              product.stock
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {product.stock ? "موجود" : "ناموجود"}
          </p>
        </div>
      </div>

      {/* Price */}

      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
        {product.oldPrice && (
          <p className="mb-2 text-lg text-gray-400 line-through">
            {product.oldPrice.toLocaleString()} تومان
          </p>
        )}

        <h2 className="text-5xl font-black text-green-700">
          {product.price.toLocaleString()} تومان
        </h2>
      </div>

      {/* Weight */}

      <ProductWeight
        value={selectedWeight}
        onChange={setSelectedWeight}
      />

      {/* Quantity */}

      <ProductQuantity
        value={quantity}
        onChange={setQuantity}
      />

      {/* Add To Cart */}

      <Button
        fullWidth
        icon={<FaTruck />}
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید
      </Button>

      {/* Trust Box */}

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