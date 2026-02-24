import express from 'express';
import { classifyImage } from '../controllers/classifyController';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/', upload.single('image'), classifyImage);

export default router;
