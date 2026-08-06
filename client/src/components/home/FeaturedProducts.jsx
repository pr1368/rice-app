import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

import ProductCard from "../product/ProductCard";

const products = [
  {
    id: 1,
    title: "برنج هاشمی درجه یک",
    image: "/images/products/hashemi.jpg",
    price: 245000,
    oldPrice: 270000,
    rating: 4.9,
    badge: "پرفروش",
  },
  {
    id: 2,
    title: "برنج طارم محلی",
    image: "/images/products/tarom.jpg",
    price: 230000,
    rating: 4.8,
    badge: "جدید",
  },
  {
    id: 3,
    title: "برنج فجر",
    image: "/images/products/fajr.jpg",
    price: 198000,
    rating: 4.7,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          title="محصولات ویژه"
          subtitle="محبوب‌ترین محصولات فروشگاه"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;