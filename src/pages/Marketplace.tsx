import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Store, Plus, Search, Filter, MapPin, Package, DollarSign, MessageCircle, Star, X, Send } from 'lucide-react';
import { marketplaceService, MarketplaceListing } from '../services/marketplaceService';
import { useAuth } from '../context/AuthContext';

const DEMO_LISTINGS: MarketplaceListing[] = [
  {
    _id: 'demo1',
    userId: '1',
    userName: 'Admin',
    title: 'Clean Plastic Bottles - 50 pieces',
    description: 'Collected clean PET bottles from office. Perfect for recycling or DIY projects. All bottles are washed and labels removed.',
    category: 'plastic',
    quantity: 50,
    unit: 'pieces',
    price: 0,
    isFree: true,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'],
    location: { ward: 'Connaught Place' },
    status: 'available'
  },
  {
    _id: 'demo2',
    userId: '2',
    userName: 'Saiyam',
    title: 'Old Newspapers & Magazines',
    description: 'Stack of newspapers and magazines from last 3 months. Good condition, dry and clean. Great for paper recycling.',
    category: 'paper',
    quantity: 15,
    unit: 'kg',
    price: 150,
    isFree: false,
    images: ['https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=800'],
    location: { ward: 'Dwarka' },
    status: 'available'
  },
  {
    _id: 'demo3',
    userId: '1',
    userName: 'Admin',
    title: 'Cardboard Boxes - Moving Sale',
    description: 'Various sizes of cardboard boxes from recent move. Strong and reusable. Perfect for storage or shipping.',
    category: 'paper',
    quantity: 20,
    unit: 'pieces',
    price: 0,
    isFree: true,
    images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800'],
    location: { ward: 'Connaught Place' },
    status: 'available'
  },
  {
    _id: 'demo4',
    userId: '2',
    userName: 'Saiyam',
    title: 'Aluminum Cans - Soft Drink Cans',
    description: 'Collection of aluminum cans. Crushed and ready for recycling. High-quality aluminum.',
    category: 'metal',
    quantity: 5,
    unit: 'kg',
    price: 200,
    isFree: false,
    images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800'],
    location: { ward: 'Dwarka' },
    status: 'available'
  },
  {
    _id: 'demo5',
    userId: '1',
    userName: 'Admin',
    title: 'Glass Bottles & Jars',
    description: 'Assorted glass bottles and jars. All cleaned and ready for reuse. Great for storage or craft projects.',
    category: 'glass',
    quantity: 30,
    unit: 'pieces',
    price: 0,
    isFree: true,
    images: ['https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=800'],
    location: { ward: 'Rohini' },
    status: 'available'
  },
  {
    _id: 'demo6',
    userId: '2',
    userName: 'Saiyam',
    title: 'Old Electronics - Working Condition',
    description: 'Old mobile phones, chargers, and cables. All working. Perfect for e-waste recycling or spare parts.',
    category: 'electronics',
    quantity: 8,
    unit: 'pieces',
    price: 500,
    isFree: false,
    images: ['https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800'],
    location: { ward: 'Dwarka' },
    status: 'available'
  },
  {
    _id: 'demo7',
    userId: '1',
    userName: 'Admin',
    title: 'Plastic Containers & Tubs',
    description: 'Food-grade plastic containers from ice cream and butter. Clean and ready for reuse or recycling.',
    category: 'plastic',
    quantity: 25,
    unit: 'pieces',
    price: 100,
    isFree: false,
    images: ['https://images.unsplash.com/photo-1625740515823-4b6b2b5c0f8f?w=800'],
    location: { ward: 'Connaught Place' },
    status: 'available'
  },
  {
    _id: 'demo8',
    userId: '2',
    userName: 'Saiyam',
    title: 'Scrap Metal - Iron & Steel',
    description: 'Mixed scrap metal from home renovation. Includes iron rods, steel sheets, and metal fixtures.',
    category: 'metal',
    quantity: 20,
    unit: 'kg',
    price: 400,
    isFree: false,
    images: ['https://images.unsplash.com/photo-1563207153-f403bf289096?w=800'],
    location: { ward: 'Dwarka' },
    status: 'available'
  },
  {
    _id: 'demo9',
    userId: '1',
    userName: 'Admin',
    title: 'Wine & Beer Bottles',
    description: 'Collection of glass wine and beer bottles. Perfect for craft projects or recycling.',
    category: 'glass',
    quantity: 40,
    unit: 'pieces',
    price: 0,
    isFree: true,
    images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800'],
    location: { ward: 'Vasant Vihar' },
    status: 'available'
  },
  {
    _id: 'demo10',
    userId: '2',
    userName: 'Saiyam',
    title: 'Office Paper Waste',
    description: 'Shredded office paper and documents. Secure disposal done. Ready for recycling.',
    category: 'paper',
    quantity: 30,
    unit: 'kg',
    price: 300,
    isFree: false,
    images: ['https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800'],
    location: { ward: 'Dwarka' },
    status: 'available'
  },
  {
    _id: 'demo11',
    userId: '1',
    userName: 'Admin',
    title: 'Plastic Bags - Shopping Bags',
    description: 'Clean plastic shopping bags. Can be reused or recycled. Various sizes available.',
    category: 'plastic',
    quantity: 100,
    unit: 'pieces',
    price: 0,
    isFree: true,
    images: ['https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800'],
    location: { ward: 'Connaught Place' },
    status: 'available'
  },
  {
    _id: 'demo12',
    userId: '2',
    userName: 'Saiyam',
    title: 'Old Computer Parts',
    description: 'Motherboards, RAM, hard drives from old computers. Non-working but good for e-waste recycling.',
    category: 'electronics',
    quantity: 12,
    unit: 'pieces',
    price: 800,
    isFree: false,
    images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'],
    location: { ward: 'Dwarka' },
    status: 'available'
  }
];

export default function Marketplace() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, [selectedCategory]);

  const loadListings = async () => {
    try {
      setLoading(true);
      const data = await marketplaceService.getListings(
        selectedCategory ? { category: selectedCategory } : {}
      );
      
      if (data.length === 0) {
        const filtered = selectedCategory 
          ? DEMO_LISTINGS.filter(l => l.category === selectedCategory)
          : DEMO_LISTINGS;
        setListings(filtered);
      } else {
        setListings(data);
      }
    } catch (error) {
      console.error('Failed to load listings, using demo data');
      const filtered = selectedCategory 
        ? DEMO_LISTINGS.filter(l => l.category === selectedCategory)
        : DEMO_LISTINGS;
      setListings(filtered);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { id: '', label: 'ALL', icon: '🔄' },
    { id: 'plastic', label: 'PLASTIC', icon: '♻️' },
    { id: 'paper', label: 'PAPER', icon: '📄' },
    { id: 'metal', label: 'METAL', icon: '🔩' },
    { id: 'glass', label: 'GLASS', icon: '🍾' },
    { id: 'electronics', label: 'ELECTRONICS', icon: '💻' },
    { id: 'other', label: 'OTHER', icon: '📦' },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
            MARKETPLACE
          </h1>
          <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
            TRADE • SELL • GIVE AWAY RECYCLABLES
          </p>
        </div>
        {user && (
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              padding: '16px 32px',
              backgroundColor: colors.primary,
              color: '#000',
              fontSize: '14px',
              fontWeight: 900,
              border: `3px solid ${colors.primary}`,
              cursor: 'pointer',
              letterSpacing: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Plus size={20} strokeWidth={3} />
            CREATE LISTING
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: colors.textMuted }} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '56px',
              paddingLeft: '52px',
              backgroundColor: colors.surface,
              border: `3px solid ${colors.border}`,
              color: colors.textPrimary,
              fontSize: '14px',
              fontWeight: 700,
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '12px 24px',
              backgroundColor: selectedCategory === cat.id ? colors.primary : colors.surface,
              color: selectedCategory === cat.id ? '#000' : colors.textPrimary,
              border: `3px solid ${selectedCategory === cat.id ? colors.primary : colors.border}`,
              fontSize: '12px',
              fontWeight: 900,
              cursor: 'pointer',
              letterSpacing: '1px',
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px', color: colors.textMuted }}>
          Loading...
        </div>
      ) : filteredListings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '120px 40px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
          <Store size={80} color={colors.textMuted} strokeWidth={3} style={{ margin: '0 auto 32px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '1px' }}>
            NO LISTINGS FOUND
          </h2>
          <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700 }}>
            Be the first to create a listing!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredListings.map(listing => (
            <ListingCard
              key={listing._id}
              listing={listing}
              colors={colors}
              onClick={() => setSelectedListing(listing)}
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateListingModal
          colors={colors}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadListings();
          }}
        />
      )}

      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          colors={colors}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}

function ListingCard({ listing, colors, onClick }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.surface,
        border: `3px solid ${colors.border}`,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.primary}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
    >
      <div style={{ height: '200px', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `3px solid ${colors.border}` }}>
        {listing.images?.[0] ? (
          <img src={listing.images[0]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Package size={60} color={colors.textMuted} strokeWidth={3} />
        )}
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
            {listing.title}
          </h3>
          {listing.isFree ? (
            <span style={{ padding: '4px 12px', backgroundColor: colors.primary, color: '#000', fontSize: '10px', fontWeight: 900, letterSpacing: '1px' }}>
              FREE
            </span>
          ) : (
            <span style={{ fontSize: '18px', fontWeight: 900, color: colors.primary }}>
              ₹{listing.price}
            </span>
          )}
        </div>
        <p style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '16px', fontWeight: 600, lineHeight: '1.6' }}>
          {listing.description.substring(0, 80)}...
        </p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: colors.textMuted, fontWeight: 700 }}>
          <span>📦 {listing.quantity} {listing.unit}</span>
          <span>📍 {listing.location.ward}</span>
        </div>
      </div>
    </div>
  );
}

function CreateListingModal({ colors, onClose, onSuccess }: any) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'plastic',
    quantity: 1,
    unit: 'kg',
    price: 0,
    isFree: true,
    location: { ward: 'Connaught Place' },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await marketplaceService.createListing({
        ...formData,
        userId: user?.id || '',
        userName: user?.name || '',
        images: [],
        status: 'available',
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to create listing');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: colors.background, border: `3px solid ${colors.primary}`, maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ padding: '24px', borderBottom: `3px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: colors.primary, letterSpacing: '1px' }}>CREATE LISTING</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer' }}>
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{ width: '100%', padding: '16px', marginBottom: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            style={{ width: '100%', padding: '16px', marginBottom: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '14px', fontWeight: 700, resize: 'vertical' }}
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            style={{ width: '100%', padding: '16px', marginBottom: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}
          >
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="metal">Metal</option>
            <option value="glass">Glass</option>
            <option value="electronics">Electronics</option>
            <option value="other">Other</option>
          </select>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              required
              min="1"
              style={{ padding: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}
            />
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })}
              style={{ padding: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}
            >
              <option value="kg">KG</option>
              <option value="pieces">Pieces</option>
              <option value="bags">Bags</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) => setFormData({ ...formData, isFree: e.target.checked, price: e.target.checked ? 0 : formData.price })}
              style={{ width: '20px', height: '20px' }}
            />
            <span style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>FREE (Give Away)</span>
          </label>
          {!formData.isFree && (
            <input
              type="number"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              min="0"
              style={{ width: '100%', padding: '16px', marginBottom: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}
            />
          )}
          <button
            type="submit"
            style={{ width: '100%', padding: '16px', backgroundColor: colors.primary, color: '#000', fontSize: '14px', fontWeight: 900, border: `3px solid ${colors.primary}`, cursor: 'pointer', letterSpacing: '2px' }}
          >
            CREATE LISTING
          </button>
        </form>
      </div>
    </div>
  );
}

function ListingDetailModal({ listing, colors, onClose }: any) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;
    try {
      await marketplaceService.sendMessage({
        listingId: listing._id!,
        senderId: user.id,
        receiverId: listing.userId,
        message,
      });
      setMessage('');
      alert('Message sent!');
    } catch (error) {
      console.error('Failed to send message');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: colors.background, border: `3px solid ${colors.primary}`, maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ padding: '24px', borderBottom: `3px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: colors.primary, letterSpacing: '1px' }}>{listing.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer' }}>
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ height: '300px', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: `3px solid ${colors.border}` }}>
            {listing.images?.[0] ? (
              <img src={listing.images[0]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Package size={100} color={colors.textMuted} strokeWidth={3} />
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <p style={{ fontSize: '12px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>SELLER</p>
              <p style={{ fontSize: '16px', color: colors.textPrimary, fontWeight: 900 }}>{listing.userName}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>PRICE</p>
              {listing.isFree ? (
                <span style={{ padding: '8px 16px', backgroundColor: colors.primary, color: '#000', fontSize: '14px', fontWeight: 900, letterSpacing: '1px' }}>
                  FREE
                </span>
              ) : (
                <p style={{ fontSize: '24px', color: colors.primary, fontWeight: 900 }}>₹{listing.price}</p>
              )}
            </div>
          </div>
          <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '24px', lineHeight: '1.8', fontWeight: 600 }}>
            {listing.description}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
              <p style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>CATEGORY</p>
              <p style={{ fontSize: '14px', color: colors.textPrimary, fontWeight: 900, textTransform: 'uppercase' }}>{listing.category}</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
              <p style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>QUANTITY</p>
              <p style={{ fontSize: '14px', color: colors.textPrimary, fontWeight: 900 }}>{listing.quantity} {listing.unit}</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
              <p style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>LOCATION</p>
              <p style={{ fontSize: '14px', color: colors.textPrimary, fontWeight: 900 }}>{listing.location.ward}</p>
            </div>
          </div>
          {user && user.id !== listing.userId && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="Send a message to seller..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ flex: 1, padding: '16px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}
              />
              <button
                onClick={handleSendMessage}
                style={{ padding: '16px 32px', backgroundColor: colors.primary, color: '#000', fontSize: '14px', fontWeight: 900, border: `3px solid ${colors.primary}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Send size={16} strokeWidth={3} />
                SEND
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}