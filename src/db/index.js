// Import mongoose for MongoDB connection
import mongoose from "mongoose";
// Import database name constant
import { DB_NAME } from "../constants.js";

// Function to connect to MongoDB database
const dbConnect = async () => {
  try {
    // Attempt to connect to MongoDB using the URI and database name
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // Log success message with the connected host
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Log error and exit process if connection fails
    console.log("MONGODB connection error ", error);
    process.exit(1);
  }
};

// Export the dbConnect function for use in other parts of the application
export default dbConnect;
