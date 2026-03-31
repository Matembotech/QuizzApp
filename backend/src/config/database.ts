import mongoose from 'mongoose';

// ============================================
// DATABASE CONFIGURATION
// ============================================

// Get MongoDB connection URI from environment variable
// Falls back to local MongoDB if MONGO_URI is not set (for development)
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizzapp';

// Connection options (modern mongoose doesn't require these options anymore)
// Kept for reference if needed for specific MongoDB versions
const options: mongoose.ConnectOptions = {};

// ============================================
// DATABASE CONNECTION FUNCTIONS
// ============================================

/**
 * Connect to MongoDB database
 * Establishes connection using mongoose.connect() with the URI from environment
 * Logs success or error messages to console
 *
 * @returns {Promise<void>} Resolves when connected, rejects on error
 */
export const connectDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB using the connection string
    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    // Log detailed error and exit process if connection fails
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit with failure code - critically important connection failed
  }
};

/**
 * Disconnect from MongoDB database
 * Gracefully closes the database connection
 *
 * @returns {Promise<void>} Resolves when disconnected
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB Atlas disconnected successfully');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
  }
};

// Default export for convenience - use named exports instead
export default connectDB;
