import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import ProductGrid from "../../components/product/ProductGrid";

import { getProducts } from "../../services/productService";

const Products = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        const allProducts = data.products || [];

        const filteredProducts = category
          ? allProducts.filter(
              (product) => product.category === category
            )
          : allProducts;

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Products error:", error);
        setError("دریافت محصولات با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="py-16">
      <Container>
        <SectionTitle
          title={category ? category : "همه محصولات"}
          subtitle={
            category
              ? `محصولات دسته ${category}`
              : "خرید مستقیم از شالیزار"
          }
        />

        {loading && (
          <div className="py-20 text-center text-gray-500">
            در حال دریافت محصولات...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            محصولی در این دسته پیدا نشد.
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </Container>
    </section>
  );
};

export default Products;