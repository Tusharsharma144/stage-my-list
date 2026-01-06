import { Schema, model } from "mongoose";

const WatchHistorySchema = new Schema(
  {
    contentId: { type: String, required: true },
    watchedOn: { type: Date, required: true },
    rating: { type: Number },
  },
  { _id: false }
);

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }],
  },
  watchHistory: [WatchHistorySchema],
});

export const UserModel = model("User", UserSchema);
