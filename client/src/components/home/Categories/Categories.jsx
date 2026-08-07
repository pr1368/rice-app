import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "برنج هاشمی",
    image: "/images/categories/hashemi.jpg",
  },
  {
    title: "برنج طارم",
    image: "/images/categories/tarom.jpg",
  },
  {
    title: "برنج فجر",
    image: "/images/categories/fajr.jpg",
  },
];

const Categories = () => {
  return (
    <section className="bg-gray-50 py-24">
      <Container>

        <SectionTitle
          title="دسته‌بندی محصولات"
          subtitle="بهترین برنج‌های شمال ایران"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
            />
          ))}

        </div>

      </Container>
    </section>
  );
};

export default Categories;