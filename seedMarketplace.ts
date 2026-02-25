import mongoose from 'mongoose';
import 'dotenv/config';
import MarketplaceListing from './server/models/MarketplaceListing.js';

const demoListings = [
  {
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

async function seedMarketplace() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');

    const count = await MarketplaceListing.countDocuments();
    if (count > 0) {
      console.log(`⚠️  Found ${count} existing listings. Skipping seed.`);
      console.log('To re-seed, delete listings from MongoDB first.');
      mongoose.connection.close();
      return;
    }

    await MarketplaceListing.insertMany(demoListings);
    console.log(`✅ Added ${demoListings.length} demo listings with images`);

    mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding marketplace:', error);
    process.exit(1);
  }
}

seedMarketplace();
