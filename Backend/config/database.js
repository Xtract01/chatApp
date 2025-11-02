import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {})
    .catch((error) => {
      console.log("MongoDB connection failed", error);
    });
};
export default connectDB;
