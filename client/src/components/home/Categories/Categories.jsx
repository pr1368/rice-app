import { useEffect, useState } from "react";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import CategoryCard from "./CategoryCard";

import { getProducts } from "../../../services/productService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProducts();
        const products = data.products || [];

        const categoryMap = new Map();

        products.forEach((product) => {
          if (!product.category || categoryMap.has(product.category)) {
            return;
          }

          categoryMap.set(product.category, {
            title: product.category,
            image:
              product.images?.[0] ||
              "https://placehold.co/800x600?text=RiceShop",
          });
        });

        setCategories(Array.from(categoryMap.values()));
      } catch (error) {
        console.error("Categories error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <SectionTitle
          title="دسته‌بندی محصولات"
          subtitle="بهترین برنج‌های شمال ایران"
        />

        {loading ? (
          <div className="py-10 text-center text-gray-500">
            در حال دریافت دسته‌بندی‌ها...
          </div>
        ) : categories.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            دسته‌بندی‌ای برای نمایش وجود ندارد.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                {...category}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Categories;