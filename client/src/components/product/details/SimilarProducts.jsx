import products from "../../../data/products";

import ProductCard from "../ProductCard";


function SimilarProducts({
  currentId,
}) {

  const similarProducts = products.filter(
    (product) => product.id !== currentId
  );


  if (similarProducts.length === 0) {
    return null;
  }


  return (
    <section className="mt-20">

      <h2 className="
        mb-8
        text-3xl
        font-black
        text-gray-900
      ">
        محصولات مشابه
      </h2>


      <div className="
        grid
        gap-8
        sm:grid-cols-2
        lg:grid-cols-3
      ">

        {similarProducts.map((product) => (

          <ProductCard
            key={product.id}
            {...product}
          />

        ))}

      </div>


    </section>
  );
}


export default SimilarProducts;