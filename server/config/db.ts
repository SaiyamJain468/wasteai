import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn(`Error connecting to MongoDB: ${error.message}`);
    console.warn('Running in offline/mock mode (DB not connected)');
    console.warn('To connect to MongoDB, create a .env file with MONGODB_URI=your_connection_string');
    // process.exit(1); // Don't exit, allow app to run without DB for frontend preview
  }
};

export default connectDB;
