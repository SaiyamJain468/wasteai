import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  ward: string;
  city: string;
  totalPoints: number;
  totalScans: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ward: { type: String, required: true },
  city: { type: String, default: 'Bangalore' },
  totalPoints: { type: Number, default: 0 },
  totalScans: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
