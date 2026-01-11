import { Schema, model, models, Types } from "mongoose";

const ContentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["link", "video", "pdf", "image", "tweet", "note"],
      required: true,
    },

    source: {
      type: String,
      enum: [
        "youtube",
        "twitter",
        "instagram",
        "github",
        "web",
        "upload",
        "other",
      ],
      required: true,
    },

    domain: {
      type: String, 
    },

    url: {
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
