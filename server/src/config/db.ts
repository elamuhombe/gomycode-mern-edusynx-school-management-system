import mongoose from 'mongoose';

// Function to connect to the MongoDB database
const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI as string; // Type assertion to treat MONGODB_URI as string
    
    // Connect to MongoDB using the provided URI
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure if connection fails
  }
};

// Export the connectDB function for use in other modules
export { connectDB };
