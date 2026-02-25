import api from '../services/api';

export interface MarketplaceListing {
  _id?: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: 'plastic' | 'paper' | 'metal' | 'glass' | 'electronics' | 'other';
  quantity: number;
  unit: 'kg' | 'pieces' | 'bags';
  price?: number;
  isFree: boolean;
  images: string[];
  location: {
    ward: string;
    coordinates?: [number, number];
  };
  status: 'available' | 'reserved' | 'sold';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MarketplaceMessage {
  _id?: string;
  listingId: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: Date;
}

export const marketplaceService = {
  // Listings
  createListing: async (listing: Omit<MarketplaceListing, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/marketplace/listings', listing);
    return response.data;
  },

  getListings: async (filters?: {
    category?: string;
    ward?: string;
    isFree?: boolean;
    status?: string;
  }) => {
    const response = await api.get('/marketplace/listings', { params: filters });
    return response.data;
  },

  getListing: async (id: string) => {
    const response = await api.get(`/marketplace/listings/${id}`);
    return response.data;
  },

  updateListing: async (id: string, updates: Partial<MarketplaceListing>) => {
    const response = await api.put(`/marketplace/listings/${id}`, updates);
    return response.data;
  },

  deleteListing: async (id: string) => {
    const response = await api.delete(`/marketplace/listings/${id}`);
    return response.data;
  },

  // Messages
  sendMessage: async (message: Omit<MarketplaceMessage, '_id' | 'createdAt'>) => {
    const response = await api.post('/marketplace/messages', message);
    return response.data;
  },

  getMessages: async (listingId: string) => {
    const response = await api.get(`/marketplace/messages/${listingId}`);
    return response.data;
  },

  // Ratings
  rateSeller: async (sellerId: string, rating: number, review: string) => {
    const response = await api.post('/marketplace/ratings', {
      sellerId,
      rating,
      review,
    });
    return response.data;
  },

  getSellerRating: async (sellerId: string) => {
    const response = await api.get(`/marketplace/ratings/${sellerId}`);
    return response.data;
  },
};
