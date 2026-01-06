import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,

  mongoUri: process.env.MONGODB_URI!,
  mongoTestUri: process.env.MONGODB_TEST_URI!,

  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  redisTtlSeconds: Number(process.env.REDIS_TTL_SECONDS) || 60,
};
