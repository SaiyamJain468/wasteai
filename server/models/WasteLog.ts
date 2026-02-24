import mongoose, { Document, Model } from 'mongoose';

export interface IWasteLog extends Document {
  userId: mongoose.Types.ObjectId;
  imageUrl?: string;
  wasteType: 'Organic' | 'Recyclable' | 'Hazardous';
  confidence: number;
  binLabel: string;
  pointsEarned: number;
  ward?: string;
  city?: string;
  classifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const wasteLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String },
  wasteType: { type: String, enum: ['Organic', 'Recyclable', 'Hazardous'], required: true },
  confidence: { type: Number, required: true },
  binLabel: { type: String, required: true },
  pointsEarned: { type: Number, required: true },
  ward: { type: String },
  city: { type: String },
  classifiedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const WasteLog: Model<IWasteLog> = mongoose.models.WasteLog || mongoose.model<IWasteLog>('WasteLog', wasteLogSchema);
export default WasteLog;
