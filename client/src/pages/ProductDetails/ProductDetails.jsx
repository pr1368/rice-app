import { useParams } from "react-router-dom";

import products from "../../data/products";

import Container from "../../components/ui/Container";

import ProductGallery from "../../components/product/details/ProductGallery";
import ProductInfo from "../../components/product/details/ProductInfo";
import ProductTabs from "../../components/product/details/ProductTabs";
import SimilarProducts from "../../components/product/details/SimilarProducts";

function ProductDetails() {
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

  return (
    <section className="py-16">
      <Container>

        <div className="grid gap-16 lg:grid-cols-2">

          <ProductGallery product={product} />

          <ProductInfo product={product} />

        </div>

        <ProductTabs product={product} />

        <SimilarProducts
          currentId={product.id}
        />

      </Container>
    </section>
  );
}

export default ProductDetails;