import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; // Ссылка на ID пользователя
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);