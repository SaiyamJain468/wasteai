import express from 'express';
import { logWaste, getHistory } from '../controllers/wasteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/log', protect, logWaste);
router.get('/history', protect, getHistory);

export default router;
