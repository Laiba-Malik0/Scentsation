import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  brand: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['Men', 'Women'] // Iske ilawa koi value accept nahi hogi
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  countInStock: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  isBlocked: { 
    type: Boolean, 
    required: true, 
    default: false // Admin toggle handle karega isko later
  }
}, { 
  timestamps: true // Auto created_at and updated_at fields
});

const Product = mongoose.model('Product', productSchema);
export default Product;