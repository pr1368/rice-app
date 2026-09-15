import { useEffect, useState } from "react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../product/ProductCard";

import { getProducts } from "../../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts((data.products || []).slice(0, 3));
      } catch (error) {
        console.error("Featured products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          title="محصولات ویژه"
          subtitle="محبوب‌ترین محصولات فروشگاه"
        />

        {loading ? (
          <div className="py-10 text-center text-gray-500">
            در حال دریافت محصولات...
          </div>
        ) : products.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            محصولی برای نمایش وجود ندارد.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProducts;