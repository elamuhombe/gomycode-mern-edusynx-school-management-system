import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI as string; // Type assertion
    // Alternatively, you can use nullish coalescing operator to provide a default value
    // const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/mydatabase';
    
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export { connectDB };
