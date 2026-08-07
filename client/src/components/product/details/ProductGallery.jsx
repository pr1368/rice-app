import { useState } from "react";

function ProductGallery({ product }) {
  const images =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-6">
      {/* تصویر اصلی */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <img
          src={selectedImage}
          alt={product.title}
          className="h-[500px] w-full object-cover transition-transform duration-500 hover:scale-105"
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