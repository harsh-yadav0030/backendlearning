import mongoose, { Schema } from "mongoose";

// Import pagination plugin for aggregation queries
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
  {
    videoFile: {
      type: String,        // stores video URL ( Cloudinary link)
      required: true,     
    },

    thumbnail: {
      type: String,        
      required: true,
    },

    title: {
      type: String,        
      required: true,
    },

    description: {
      type: String,       
      required: true,
    },

    duration: {
      type: Number,       
      required: true,
    },

    views: {
      type: Number,       
      default: 0,        
    },

    isPublished: {
      type: Boolean,      
      default: true,
    },

    owner: {
      type: Schema.Types.ObjectId, 
      ref: "User",                 
    }
  },
  {
    timestamps: true,     
  }
);

// Attach plugin → adds aggregatePaginate() method to this schema
videoSchema.plugin(mongooseAggregatePaginate);

// Create model → MongoDB collection will be "videos"
export const Video = mongoose.model("Video", videoSchema);