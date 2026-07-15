import Order from "../models/Order.js";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "dummy_key_for_now"
);

// ==============================
// Create Order
// POST /api/orders
// ==============================
export const createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      email,
      shippingAddress,
      orderItems,
      totalPrice,
      paymentMethod,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No items found in your order");
    }

    const order = new Order({
      customerName,
      email,
      shippingAddress,
      orderItems,
      totalPrice,
      paymentMethod,
      isPaid: paymentMethod === "Stripe",
      paidAt: paymentMethod === "Stripe" ? new Date() : null,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// ==============================
// Stripe Checkout Session
// POST /api/orders/stripe-checkout
// ==============================
export const createStripeSession = async (req, res, next) => {
  try {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:5173/order-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
    });

    res.status(200).json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// Get All Orders
// GET /api/orders
// ==============================
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("orderItems.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};