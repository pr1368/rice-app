import { useState } from "react";

function ProductGallery({ product }) {
  const imageUrl =
    product.image ||
    "https://placehold.co/800x600?text=RiceShop";

  const images =
    product.images?.length > 0
      ? product.images
      : [imageUrl];

  const [selectedImage, setSelectedImage] = useState(
    images[0]
  );

  return (
    <div className="space-y-6">
      {/* تصویر اصلی */}
      <div className="overflow-hidden rounded-3xl bg-gray-100">
        <img
          src={selectedImage}
          alt={product.name || "محصول"}
          className="
            h-[500px]
            w-full
            object-cover
          "
        />
      </div>

      {/* تصاویر کوچک */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                setSelectedImage(image)
              }
              className={`overflow-hidden rounded-2xl border-2 transition ${
                selectedImage === image
                  ? "border-green-600"
                  : "border-gray-200 hover:border-green-400"
              }`}
            >
              <img
                src={image}
                alt={`${product.name}-${index + 1}`}
                className="h-24 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;