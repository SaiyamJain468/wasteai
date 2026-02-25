import mongoose from 'mongoose';

const marketplaceListingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['plastic', 'paper', 'metal', 'glass', 'electronics', 'other'],
    required: true 
  },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ['kg', 'pieces', 'bags'], required: true },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  images: [{ type: String }],
  location: {
    ward: { type: String, required: true },
    coordinates: { type: [Number], default: undefined }
  },
  status: { 
    type: String, 
    enum: ['available', 'reserved', 'sold'],
    default: 'available'
  }
}, { timestamps: true });

export default mongoose.model('MarketplaceListing', marketplaceListingSchema);
