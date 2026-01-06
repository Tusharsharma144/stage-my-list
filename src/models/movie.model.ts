import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  genres: [{ type: String }],
  releaseDate: { type: Date },
  director: { type: String },
  actors: [{ type: String }],
});

export const MovieModel = model("Movie", MovieSchema);
