import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("cart")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(items);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(
      (item) => item._id !== id
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

    setCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

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
        My Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-5" />

          <h3 className="text-3xl font-serif">
            Cart Empty
          </h3>

          <p className="text-gray-500 mt-3">
            Add perfumes to your cart 🛒
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {cart.map((product) => (

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
                    className="w-full mt-5 bg-red-500 text-white py-3 rounded-xl hover:bg-red-700 duration-300"
                  >
                    <FaTrash className="inline mr-2" />
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="w-full max-w-sm mx-auto mt-12">

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

              <h3 className="text-2xl font-serif mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between text-xl mb-6">
                <span>Total:</span>

                <span className="font-bold text-[#C9A96E]">
                  Rs {total}
                </span>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm amount={total} />
              </Elements>

            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default Cart;