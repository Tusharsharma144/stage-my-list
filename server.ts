// server.ts
import mongoose from "mongoose";
import app from "./src/app";
import { env } from "./src/config/env";

async function start() {
  await mongoose.connect(env.mongoUri);

  app.listen(env.port, () => {
    console.log("Server running on port 3000");
  });
}

start();
