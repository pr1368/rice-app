import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";

import products from "../../data/products";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <Container className="py-20">
        <h2 className="text-center text-3xl font-bold">
          محصول پیدا نشد
        </h2>
      </Container>
    );
  }

  const {
    title,
    image,
    price,
    oldPrice,
    rating,
    province,
    weight,
    quality,
    harvest,
    description,
    badge,
  } = product;

  return (
    <section className="py-16">
      <Container>

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Image */}

          <div>

            <img
              src={image}
              alt={title}
              className="w-full rounded-3xl border object-cover shadow-lg"
            />

          </div>

          {/* Info */}

          <div>

            {badge && (
              <Badge>
                {badge}
              </Badge>
            )}

            <h1 className="mt-5 text-4xl font-black">
              {title}
            </h1>

            <div className="mt-5 flex items-center gap-3">

              <FaStar className="text-yellow-400" />

              <span>{rating}</span>

            </div>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between border-b pb-3">

                <span>مبدا</span>

                <span>{province}</span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span>کیفیت</span>

                <span>{quality}</span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span>وزن</span>

                <span>{weight}</span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span>برداشت</span>

                <span>{harvest}</span>

              </div>

            </div>

            <div className="mt-8">

              {oldPrice && (
                <p className="text-lg text-gray-400 line-through">
                  {oldPrice.toLocaleString()} تومان
                </p>
              )}

              <h2 className="text-5xl font-black text-green-700">
                {price.toLocaleString()} تومان
              </h2>

            </div>

            <div className="mt-10">

              <Button
                fullWidth
                icon={<FaShoppingCart />}
              >
                افزودن به سبد خرید
              </Button>

            </div>

          </div>

        </div>

        {/* Description */}

        <div className="mt-20">

          <h2 className="mb-5 text-3xl font-bold">
            توضیحات محصول
          </h2>

          <p className="leading-9 text-gray-600">
            {description}
          </p>

        </div>

      </Container>
    </section>
  );
};

export default ProductDetails;