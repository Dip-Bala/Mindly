import { Schema, model, models, Types } from "mongoose";

const ContentSchema = new Schema(
  {
    userId: {                      //get email from session -> get _id from User model
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,        //user provided - client sends in req
      // required: true,
      trim: true,
    },

    type: {                  //auto-detect in backend
      type: String,
      enum: ["link", "video", "pdf", "image", "tweet", "note"],
      required: true,
    },

    // source: {           //auto-detect in backend
    //   type: String,
    //   enum: [
    //     "youtube",
    //     "twitter",
    //     "instagram",
    //     "github",
    //     "web",
    //     "upload",
    //   ],
    // },

    domain: {              //implies the hostname   //auto-detect in backend
      type: String, 
    },

    url: {               //user provided 
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
    },

    summary: {
      type: String, 
    },

    tags: {
      type: [String],
      default: [],
    },

    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    logoId: {
      type: Types.ObjectId,
      ref: "Logo"
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev
export const Content =
  models.Content || model("Content", ContentSchema);
