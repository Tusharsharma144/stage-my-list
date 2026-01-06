import mongoose from "mongoose";
import { env } from "../config/env";
import { seedData } from "./seedData";

async function run() {
  await mongoose.connect(env.mongoUri);
  await seedData();
  await mongoose.connection.close();
}

run().catch(console.error);
