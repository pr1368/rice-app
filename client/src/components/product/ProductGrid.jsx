import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.name}
          image={product.image}
          price={product.price}
          oldPrice={product.oldPrice}
          weight={product.weight}
          rating={product.rating || 5}
          badge={product.badge}
          stock={product.stock > 0}
        />
      ))}
    </div>
  );
};

export default ProductGrid;