// Importing required modules from mongoose
import mongoose, { Schema } from "mongoose";

// Define the User schema with all necessary fields and validation
const userScheme = new Schema(
  {
    // Unique username for the user
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Unique email for the user
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true,
    },
    // Full name of the user
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // Avatar image URL (stored on Cloudinary)
    avatar: {
      type: String,
      required: true,
    },
    // Cover image URL (optional, stored on Cloudinary)
    coverImage: {
      type: String,
    },
    // Array of video IDs representing the user's watch history
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    // Hashed password for authentication
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Refresh token for session management
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save hook to hash the password before saving the user document
userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
  next();
});

// Instance method to check if the provided password matches the stored hash
userScheme.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Instance method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Instance method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Export the User model for use in other parts of the application
export const User = mongoose.model("User", userScheme);