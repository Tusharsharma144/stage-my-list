import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { env } from "../config/env";
import { seedData } from "../scripts/seedData";
import { seedUsers, seedMovies } from "../scripts/seedObjects";

beforeAll(async () => {
  console.log("Connecting to test DB...");
  await mongoose.connect(env.mongoTestUri);

  console.log("Seeding test DB...");
  await seedData();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("My List API", () => {
  it("adds item to my list", async () => {
    const user = seedUsers[0];
    const movie = seedMovies[0];

    console.log("Adding to My List:", {
      userId: user.id,
      contentId: movie.id,
    });

    await request(app)
      .post("/my-list")
      .set("x-user-id", user.id)
      .send({
        contentId: movie.id,
        contentType: "MOVIE",
      })
      .expect(201);
  });

  it("lists my items", async () => {
    const user = seedUsers[0];

    console.log("Listing My List for user:", user.id);

    const res = await request(app)
      .get("/my-list")
      .set("x-user-id", user.id)
      .expect(200);

    console.log("My List items:", res.body.items);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it("removes item", async () => {
    const user = seedUsers[0];
    const movie = seedMovies[0];

    console.log("Removing from My List:", {
      userId: user.id,
      contentId: movie.id,
    });

    await request(app)
      .delete(`/my-list/${movie.id}`)
      .set("x-user-id", user.id)
      .expect(200);
  });
});
