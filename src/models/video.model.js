// Import mongoose and required plugins
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define the schema for the Video model
const videoSchema = new Schema(
  {
    // URL of the video file stored on Cloudinary
    videoFile: {
      type: String, //cloudinary url
      required: true,
    },
    // URL of the video's thumbnail image stored on Cloudinary
    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
    // Title of the video
    title: {
      type: String,
      required: true,
    },
    // Description of the video content
    description: {
      type: String,
      required: true,
    },
    // Duration of the video in seconds
    duration: {
      type: Number,
      required: true,
    },
    // Number of views the video has received
    views: {
      type: Number,
      default: 0,
    },
    // Indicates if the video is published and visible to users
    isPublished: {
      type: Boolean,
      default: true,
    },
    // Reference to the User who owns/uploaded the video
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  // Automatically add createdAt and updatedAt timestamps
  { timestamps: true }
);

// Add aggregate pagination plugin to the schema
videoSchema.plugin(mongooseAggregatePaginate)

// Export the Video model for use in other parts of the application
export const Video = mongoose.model("Video", videoSchema);
