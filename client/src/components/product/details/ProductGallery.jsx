import { useState } from "react";

function ProductGallery({ product }) {
  const defaultImage =
    "https://placehold.co/800x800?text=RiceShop";

  const images =
    product.images?.filter(Boolean)?.length > 0
      ? product.images.filter(Boolean)
      : product.image
        ? [product.image]
        : [defaultImage];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-6">

      {/* تصویر اصلی */}
      <div className="overflow-hidden rounded-3xl bg-gray-100">
        <img
          src={selectedImage}
          alt={product.title}
          className="
            h-[500px]
            w-full
            object-cover
          "
        />
      </div>

      {/* تصاویر کوچک */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-2xl border-2 transition ${
              selectedImage === image
                ? "border-green-600"
                : "border-gray-200 hover:border-green-400"
            }`}
          >
            <img
              src={image}
              alt={`${product.title}-${index + 1}`}
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
}

export default ProductGallery;