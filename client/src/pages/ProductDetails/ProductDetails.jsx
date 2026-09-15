import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../../components/ui/Container";

import ProductGallery from "../../components/product/details/ProductGallery";
import ProductInfo from "../../components/product/details/ProductInfo";
import ProductTabs from "../../components/product/details/ProductTabs";
import SimilarProducts from "../../components/product/details/SimilarProducts";

import { getProductById } from "../../services/productService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data.product);
      } catch (err) {
        console.error("Product details error:", err);

        setError("دریافت اطلاعات محصول با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-20">
        <div className="text-center text-lg text-gray-500">
          در حال دریافت اطلاعات محصول...
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-20">
        <h2 className="text-center text-3xl font-bold text-red-600">
          {error || "محصول پیدا نشد"}
        </h2>
      </Container>
    );
  }

  return (
    <section className="py-16">
      <Container>
        {/* Product Main Section */}
        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Similar Products */}
        <SimilarProducts currentId={product._id} />
      </Container>
    </section>
  );
}

export default ProductDetails;