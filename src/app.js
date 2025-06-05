import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create an Express application instance
const app = express();

// Enable CORS with the specified origin from environment variables
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Parse incoming JSON requests with a size limit
app.use(express.json({ limit: "16kb" }));
// Parse URL-encoded data with a size limit
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// Serve static files from the 'public' directory
app.use(express.static("public"));
// Parse cookies attached to the client request object
app.use(cookieParser());


//routes import
import userRouter from "./routes/user.router.js";


//routes declaration
app.use("/api/v1/users", userRouter)

// Export the configured Express app
export { app };
