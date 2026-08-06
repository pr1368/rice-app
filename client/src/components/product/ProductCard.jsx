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
  id,
  title,
  image,
  price,
  oldPrice,
  weight,
  rating = 5,
  badge,
  stock = true,
}) => {
  const hasDiscount = oldPrice > price;

  const discount = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <Card
      padding={false}
      className="group overflow-hidden"
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <Link to={`/products/${id}`}>

          <img
            src={image}
            alt={title}
            className="
              h-72
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />

        </Link>

        {/* Favorite */}

        <button
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

        <Link to={`/products/${id}`}>
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
            {title}
          </h3>
        </Link>

        {/* Rating */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <FaStar className="text-yellow-400" />

            <span className="font-medium">
              {rating}
            </span>

          </div>

          <span
            className={`text-sm font-semibold ${
              stock
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {stock ? "موجود" : "ناموجود"}
          </span>

        </div>

        {/* Weight */}

<div className="flex items-center justify-between text-sm">
  <span className="text-gray-500">وزن بسته</span>

  <span className="font-semibold text-gray-700">
    {weight}
  </span>
</div>

        {/* Price */}

        <div>

          {hasDiscount && (
            <p className="text-sm text-gray-400 line-through">
              {oldPrice.toLocaleString()} تومان
            </p>
          )}

          <h3 className="text-3xl font-black text-green-700">
            {price.toLocaleString()} تومان
          </h3>

        </div>

        {/* Button */}

        <Button
          fullWidth
          icon={<FaShoppingCart />}
        >
          افزودن به سبد خرید
        </Button>

      </div>
    </Card>
  );
};

export default ProductCard;