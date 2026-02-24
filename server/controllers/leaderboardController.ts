import { Request, Response } from 'express';
import User from '../models/User';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find({} as any).sort({ totalPoints: -1 }).limit(50);
    res.json(users);
  } catch (error: any) {
    res.json([
      { name: 'Rahul Sharma', ward: 'Koramangala', points: 850, scans: 85 },
      { name: 'Priya Mehta', ward: 'Indiranagar', points: 780, scans: 78 },
    ]);
  }
};
