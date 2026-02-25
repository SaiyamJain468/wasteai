import { Request, Response } from 'express';
import MarketplaceListing from '../models/MarketplaceListing';
import MarketplaceMessage from '../models/MarketplaceMessage';
import SellerRating from '../models/SellerRating';

export const createListing = async (req: Request, res: Response) => {
  try {
    const listing = new MarketplaceListing({
      ...req.body,
      userId: req.user.id,
      userName: req.user.name
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

export const getListings = async (req: Request, res: Response) => {
  try {
    const { category, ward, isFree, status } = req.query;
    const filters: any = {};
    
    if (category) filters.category = category;
    if (ward) filters['location.ward'] = ward;
    if (isFree !== undefined) filters.isFree = isFree === 'true';
    if (status) filters.status = status;

    const listings = await MarketplaceListing.find(filters).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

export const getListing = async (req: Request, res: Response) => {
  try {
    const listing = await MarketplaceListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const listing = await MarketplaceListing.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!listing) return res.status(404).json({ error: 'Listing not found or unauthorized' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listing = await MarketplaceListing.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!listing) return res.status(404).json({ error: 'Listing not found or unauthorized' });
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const message = new MarketplaceMessage({
      ...req.body,
      senderId: req.user.id
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await MarketplaceMessage.find({
      listingId: req.params.listingId,
      $or: [{ senderId: req.user.id }, { receiverId: req.user.id }]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const rateSeller = async (req: Request, res: Response) => {
  try {
    const rating = new SellerRating({
      ...req.body,
      buyerId: req.user.id
    });
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit rating' });
  }
};

export const getSellerRating = async (req: Request, res: Response) => {
  try {
    const ratings = await SellerRating.find({ sellerId: req.params.sellerId });
    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;
    res.json({ avgRating, totalRatings: ratings.length, ratings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};
