import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String, // hashed
    image: String,
    provider: {
      type: String,
      default: "credentials",
    },
  },
  { timestamps: true }
);

export const User =  models.User || model("User", UserSchema);
