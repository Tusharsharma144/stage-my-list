import { UserModel } from "../models/user.model";
import { MovieModel } from "../models/movie.model";
import { TVShowModel } from "../models/tvShow.model";
import { seedUsers, seedMovies, seedTVShows } from "./seedObjects";

export async function seedData() {
  console.log("Seeding Users:", seedUsers);
  await UserModel.insertMany(seedUsers);

  console.log("Seeding Movies:", seedMovies);
  await MovieModel.insertMany(seedMovies);

  console.log("Seeding TV Shows:", seedTVShows);
  await TVShowModel.insertMany(seedTVShows);

  console.log("Seed data inserted successfully");
}
