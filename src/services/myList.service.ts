import { MongoServerError } from "mongodb";
import { MyListModel } from "../models/myList.model";
import { redis } from "../cache/redis";
import { env } from "../config/env";

export class MyListService {
  async addItem(userId: string, contentId: string, contentType: string) {
    try {
      await MyListModel.create({
        userId,
        contentId,
        contentType,
      });

      await this.clearCache(userId);
      return { success: true };
    } catch (err: any) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw { status: 409, message: "Item already exists in My List" };
      }
      throw err;
    }
  }

  async removeItem(userId: string, contentId: string) {
    await MyListModel.deleteOne({ userId, contentId });
    await this.clearCache(userId);
    return { success: true };
  }

  async listItems(userId: string, page: number, limit: number) {
    const cacheKey = `mylist:${userId}:${page}:${limit}`;
    //if have data in redis then use that else get data from database and stpre it in redis
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const items = await MyListModel.find({ userId })
      .sort({ addedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const response = {
      items,
      page,
      limit,
      hasMore: items.length === limit,
    };

    await redis.set(cacheKey, JSON.stringify(response), "EX", env.redisPort);

    return response;
  }

  private async clearCache(userId: string) {
    const keys = await redis.keys(`mylist:${userId}:*`);
    if (keys.length) {
      await redis.del(keys);
    }
  }
}
