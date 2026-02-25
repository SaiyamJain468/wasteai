import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  sendMessage,
  getMessages,
  rateSeller,
  getSellerRating
} from '../controllers/marketplaceController';

const router = express.Router();

router.post('/listings', authMiddleware, createListing);
router.get('/listings', getListings);
router.get('/listings/:id', getListing);
router.put('/listings/:id', authMiddleware, updateListing);
router.delete('/listings/:id', authMiddleware, deleteListing);

router.post('/messages', authMiddleware, sendMessage);
router.get('/messages/:listingId', authMiddleware, getMessages);

router.post('/ratings', authMiddleware, rateSeller);
router.get('/ratings/:sellerId', getSellerRating);

export default router;
