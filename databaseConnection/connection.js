import mongoose from 'mongoose';
// connection to database
export const connectToDatabase = async () =>{
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("database connected successfully");
    
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}