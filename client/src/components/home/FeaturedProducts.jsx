import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">
            محصولات ویژه
          </h2>

          <p className="mt-3 text-gray-500">
            تازه‌ترین برنج‌های آماده فروش
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;