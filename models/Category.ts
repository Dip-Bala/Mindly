import { model, models, Schema, Types } from "mongoose";

const CategorySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, unique: true },
    color: { type: String },
  },
  { timestamps: true }
);

export const Category = models.Category || model('Category', CategorySchema)

//Who owns categories? -- users. categories/user different and ever changing
//Categories - Inbox(Always exists), Learning, Working, Archieve, Ideas
//Color - 
//Content does not exist without category (fallback/default Inbox)
