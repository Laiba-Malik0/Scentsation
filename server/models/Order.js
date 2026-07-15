import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  shippingAddress: { 
    type: String, 
    required: true 
  },
  orderItems: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Relational link with Product collection
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      }
    }
  ],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['COD', 'Stripe'] // Strict methods defined in specification
  },
  isPaid: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  paidAt: { 
    type: Date 
  }
}, { 
  timestamps: true 
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
