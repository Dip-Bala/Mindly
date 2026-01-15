// models/Logo.ts
import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // "axiom", "github"
    title: String,
    category: {
      type:  [String],
      default: []
    },
    url: String,
    route: {
      light: String,
      dark: String,
    },
  },
  { timestamps: true }
);

export const Logo =
  mongoose.models.Logo || mongoose.model("Logo", LogoSchema);
