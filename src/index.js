// Import the Express app, database connection function, and dotenv for environment variables
import { app } from "./app.js";
import dbConnect from "./db/index.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

// Connect to the database, then start the server if successful
dbConnect()
  .then(() => {
    // Start the Express server on the specified port
    app.listen(process.env.PORT || 8000, () => {
      console.log(`The server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    // Log an error if the database connection fails
    console.log("MongoDB connection failed !!!", error);
  });
