import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

const ProductCard = ({
  _id,
  id,
  name,
  title,
  images = [],
  image,
  price,
  oldPrice,
  weight,
  rating = 5,
  badge,
  stock = 0,
}) => {
  // MongoDB uses _id
  // Mock data used id
  const productId = _id || id;

  // Product name from API
  // title is kept for compatibility with old data
  const productName = name || title || "محصول بدون نام";

  // First image from images array
  // image is kept for compatibility with old products
  const imageUrl =
    images?.[0] ||
    image ||
    "https://placehold.co/800x600?text=RiceShop";

  // Stock
  const isInStock = Number(stock) > 0;

  // Discount
  const hasDiscount =
    oldPrice &&
    Number(oldPrice) > Number(price);

  const discount = hasDiscount
    ? Math.round(
        ((Number(oldPrice) - Number(price)) /
          Number(oldPrice)) *
          100
      )
    : 0;

  return (
    <Card className="group overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${productId}`}>
          <img
            src={imageUrl}
            alt={productName}
            className="
              h-72
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/800x600?text=RiceShop";
            }}
          />
        </Link>

        {/* Favorite */}
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="
            absolute
            left-4
            top-4
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-lg
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          <FaHeart />
        </button>

        {/* Badge */}
        {badge && (
          <div className="absolute right-4 top-4">
            <Badge>{badge}</Badge>
          </div>
        )}

        {/* Discount */}
        {hasDiscount && (
          <div
            className="
              absolute
              bottom-4
              right-4
              rounded-full
              bg-red-600
              px-3
              py-1
              text-sm
              font-bold
              text-white
            "
          >
            %{discount}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        {/* Title */}
        <Link to={`/products/${productId}`}>
          <h3
            className="
              line-clamp-2
              text-xl
              font-bold
              text-gray-800
              transition
              hover:text-green-700
            "
          >
            {productName}
          </h3>
        </Link>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />

            <span className="font-medium">
              {rating}
            </span>
          </div>

          <span
            className={`text-sm font-semibold ${
              isInStock
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {isInStock ? "موجود" : "ناموجود"}
          </span>
        </div>

        {/* Weight */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>وزن بسته</span>

          <span className="font-semibold text-gray-700">
            {weight
              ? `${weight} کیلوگرم`
              : "ثبت نشده"}
          </span>
        </div>

        {/* Price */}
        <div>
          {hasDiscount && (
            <p className="text-sm text-gray-400 line-through">
              {Number(oldPrice).toLocaleString()} تومان
            </p>
          )}

          <h3 className="text-3xl font-black text-green-700">
            {Number(price).toLocaleString()} تومان
          </h3>
        </div>

        {/* Add To Cart */}
        <Button
          fullWidth
          icon={<FaShoppingCart />}
          disabled={!isInStock}
        >
          {isInStock
            ? "افزودن به سبد خرید"
            : "ناموجود"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;