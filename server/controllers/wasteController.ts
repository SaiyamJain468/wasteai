import { Request, Response } from 'express';
import WasteLog from '../models/WasteLog';
import User from '../models/User';

export const logWaste = async (req: any, res: Response) => {
  const { wasteType, confidence, binLabel, pointsEarned, imageUrl, ward, city } = req.body;

  try {
    const log = await WasteLog.create({
      userId: req.user.id,
      wasteType,
      confidence,
      binLabel,
      pointsEarned,
      imageUrl,
      ward: ward || 'Unknown',
      city: city || 'Bangalore',
    });

    // Update user points
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalPoints: pointsEarned, totalScans: 1 },
    }, { new: true });

    res.status(201).json(log);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req: any, res: Response) => {
  try {
    const logs = await WasteLog.find({ userId: req.user.id } as any).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
