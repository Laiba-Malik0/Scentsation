import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaArrowLeft } from "react-icons/fa";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWishlist(items);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter(
      (item) => item._id !== id
    );

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

    setWishlist(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-2 border border-black px-5 py-2 rounded-full hover:bg-black hover:text-white duration-300"
      >
        <FaArrowLeft />
        Back to Home
      </button>

      <h2 className="text-4xl font-serif mb-10 text-center">
        My Wishlist
      </h2>

      {wishlist.length === 0 ? (

        <div className="text-center py-20">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-5" />

          <h3 className="text-3xl font-serif">
            Wishlist Empty
          </h3>

          <p className="text-gray-500 mt-3">
            Add your favourite perfumes ❤️
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {wishlist.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-serif">
                  {product.name}
                </h3>

                <p className="text-[#C9A96E] text-xl mt-2">
                  Rs {product.price}
                </p>

                <button
                  onClick={() => removeItem(product._id)}
                  className="w-full mt-5 bg-red-500 text-white py-3 rounded-xl hover:bg-red-700 duration-300 flex items-center justify-center gap-2"
                >
                  <FaTrash />
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Wishlist;