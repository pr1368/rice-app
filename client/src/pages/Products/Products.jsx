import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import ProductGrid from "../../components/product/ProductGrid";
import products from "../../data/products";



const Products = () => {
  return (
    <section className="py-20">
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