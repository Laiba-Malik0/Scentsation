import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../services/api";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Login Check
    const loggedInUser = localStorage.getItem("user");

    if (!loggedInUser) {
      alert("Please login first to continue payment.");
      return;
    }

    if (!stripe || !elements) return;

    try {
      setLoading(true);

      // Create Payment Intent
      const { data } = await api.post(
        "/payment/create-payment-intent",
        {
          amount,
        }
      );

      // Confirm Payment
      const result = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        alert(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {

        const cart =
          JSON.parse(localStorage.getItem("cart")) || [];

        const user =
          JSON.parse(localStorage.getItem("user")) || {};

        // Save Order
        await api.post("/orders", {
          customerName: user.name,
          email: user.email,
          shippingAddress: user.address || "Pakistan",

          orderItems: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity || 1,
          })),

          totalPrice: amount,
          paymentMethod: "Stripe",
        });

        alert("Payment Successful 🎉");

        localStorage.removeItem("cart");

        window.location.href = "/";
      }

    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
    >
      <div className="border rounded-xl p-4 mb-6">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white py-3 rounded-full hover:bg-[#C9A96E] duration-300"
      >
        {loading ? "Processing..." : `Pay Rs ${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;