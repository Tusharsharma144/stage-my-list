import { Schema, model } from "mongoose";

const MyListSchema = new Schema({
  userId: { type: String, required: true },
  contentId: { type: String, required: true },
  contentType: {
    type: String,
    enum: ["MOVIE", "TV_SHOW"],
    required: true,
  },
  addedAt: { type: Date, default: Date.now },
});

MyListSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export const MyListModel = model("MyList", MyListSchema);
