import ProductCard from "./ProductCard";

const MenCollection = ({
  products,
  openAuth,
  openProduct,
}) => {

  const menProducts = products.filter(
    (product) =>
      product.gender?.trim().toLowerCase() === "men"
  );

  return (
    <section
      id="men"
      data-aos="fade-right"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
    >

      {/* Heading */}
      <div className="text-center mb-12">

        <p className="uppercase tracking-[5px] text-[#C9A96E] text-sm">
          For Him
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-3">
          Men's Collection
        </h2>

        <button className="mt-6 border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white duration-300">
          View All
        </button>

      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">

        {menProducts.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
            openAuth={openAuth}
            openProduct={openProduct}
          />

        ))}

      </div>

    </section>
  );
};

export default MenCollection;