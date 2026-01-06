import { Schema, model } from "mongoose";

const EpisodeSchema = new Schema(
  {
    episodeNumber: Number,
    seasonNumber: Number,
    releaseDate: Date,
    director: String,
    actors: [String],
  },
  { _id: false }
);

const TVShowSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  genres: [{ type: String }],
  episodes: [EpisodeSchema],
});

export const TVShowModel = model("TVShow", TVShowSchema);
