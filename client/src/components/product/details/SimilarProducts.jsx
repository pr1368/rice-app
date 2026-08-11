import { useEffect, useState } from "react";

import ProductCard from "../ProductCard";

import { getProducts } from "../../../services/productService";

function SimilarProducts({ currentId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const data = await getProducts();

        const allProducts = data.products || [];

        const similarProducts = allProducts.filter(
          (product) => product._id !== currentId
        );

        setProducts(similarProducts);
      } catch (error) {
        console.error(
          "Similar products error:",
          error
        );
      }
    };

    fetchSimilarProducts();
  }, [currentId]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <h2
        className="
          mb-8
          text-3xl
          font-black
          text-gray-900
        "
      >
        محصولات مشابه
      </h2>

      <div
        className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
          />
        ))}
      </div>
    </section>
  );
}

export default SimilarProducts;