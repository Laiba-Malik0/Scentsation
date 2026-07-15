import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import MenCollection from "../components/MenCollection";
import WomenCollection from "../components/WomenCollection";
import LuxuryBanner from "../components/LuxuryBanner";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import AdminModal from "../components/AdminModal";
import ProductModal from "../components/ProductModal";

import api from "../services/api";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");

      const formattedProducts = data.map((item) => ({
        ...item,
        gender: item.category || item.tag?.split(",")[0] || "Unisex",
        image: item.imageUrl || item.image,
        brand: item.brand || "SCENTASIA",
        description: item.description || item.notes,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error Fetching Products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar
        openAuth={() => setShowAuth(true)}
        openAdmin={() => setShowAdmin(true)}
      />

      <Slider />

      {/* Featured Products */}
      <section
  id="shop"
  data-aos="fade-up"
  className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
>
  <div className="text-center mb-12">
    <p className="uppercase tracking-[5px] text-[#C9A96E] text-sm">
      Premium Collection
    </p>

    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-3">
      Featured Fragrances
    </h2>

    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
      Explore our signature perfumes crafted with elegance,
      sophistication and timeless luxury.
    </p>
  </div>

  {loading ? (
    <h2 className="text-center text-xl">Loading Products...</h2>
  ) : products.length === 0 ? (
    <h2 className="text-center text-xl text-gray-500">
      No Products Found
    </h2>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-full max-w-[270px]"
        >
          <ProductCard
            product={product}
            openAuth={() => setShowAuth(true)}
            openProduct={setSelectedProduct}
          />
        </div>
      ))}
    </div>
  )}
</section>

      <MenCollection
        products={products}
        openAuth={() => setShowAuth(true)}
        openProduct={setSelectedProduct}
      />

      <WomenCollection
        products={products}
        openAuth={() => setShowAuth(true)}
        openProduct={setSelectedProduct}
      />

      <LuxuryBanner />

      <ContactSection />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        openAuth={() => setShowAuth(true)}
      />

      <Footer />

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />

      <AdminModal
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        onSuccess={() => navigate("/admin")}
      />
    </>
  );
};

export default Home;