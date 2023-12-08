import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
  } catch (error) {
    throw new Error("Database connection failed.");
  }
};

export default connectDB;
