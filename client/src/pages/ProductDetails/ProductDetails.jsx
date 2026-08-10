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

        const apiProduct = data.product;

        if (!apiProduct) {
          setError("محصول پیدا نشد");
          return;
        }

        // تبدیل ساختار MongoDB به ساختار مورد انتظار کامپوننت‌های فعلی
        const normalizedProduct = {
          ...apiProduct,

          // MongoDB
          id: apiProduct._id,

          // name در API → title در UI
          title: apiProduct.name,

          // موجودی عددی → وضعیت موجودی
          stock: apiProduct.stock > 0,
        };

        setProduct(normalizedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("دریافت اطلاعات محصول با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <section>
        <Container>
          <div className="py-20 text-center">
            <p className="text-lg text-gray-500">
              در حال دریافت اطلاعات محصول...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // Error / Not Found
  if (error || !product) {
    return (
      <section>
        <Container>
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {error || "محصول پیدا نشد"}
            </h2>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />

        <SimilarProducts currentId={product.id} />
      </Container>
    </section>
  );
}

export default ProductDetails;