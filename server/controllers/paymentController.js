import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "dummy_key_for_now"
);

// ==============================
// Stripe Checkout Session (makePayment)
// POST /api/payment/create-checkout-session
// ==============================
export const makePayment = async (req, res, next) => {
  try {
    const { cartItems } = req.body;

    // FRONTEND_URL ko .env file se uthayenge, nahi to fallback localhost par hoga
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Decimal values se bachne ke liye Math.round zaroori hai
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/cart`,
    });

    res.status(200).json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
};