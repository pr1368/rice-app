import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import ProductGrid from "../../components/product/ProductGrid";
import { getProducts } from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("دریافت محصولات با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section>
        <Container>
          <SectionTitle
            title="همه محصولات"
            subtitle="خرید مستقیم از شالیزار"
          />

          <p className="py-10 text-center">
            در حال دریافت محصولات...
          </p>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Container>
          <SectionTitle
            title="همه محصولات"
            subtitle="خرید مستقیم از شالیزار"
          />

          <p className="py-10 text-center text-red-500">
            {error}
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <SectionTitle
          title="همه محصولات"
          subtitle="خرید مستقیم از شالیزار"
        />

        <ProductGrid products={products} />
      </Container>
    </section>
  );
};

export default Products;