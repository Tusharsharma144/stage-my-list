import { Request, Response } from "express";
import { MyListService } from "../services/myList.service";

const service = new MyListService();

const VALID_CONTENT_TYPES = ["MOVIE", "TV_SHOW"];

export const addToMyList = async (req: Request, res: Response) => {
  const { contentId, contentType } = req.body;

  if (!contentId || !contentType) {
    return res
      .status(400)
      .json({ message: "contentId and contentType are required" });
  }

  if (!VALID_CONTENT_TYPES.includes(contentType)) {
    return res.status(400).json({ message: "Invalid contentType" });
  }
  const userId = req.user.id;

  const result = await service.addItem(userId, contentId, contentType);
  res.status(201).json(result);
};

export const removeFromMyList = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { contentId } = req.params;

  const result = await service.removeItem(userId, contentId);
  res.json(result);
};

export const listMyItems = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);

  if (page <= 0 || limit <= 0 || Number.isNaN(page) || Number.isNaN(limit)) {
    return res.status(400).json({ message: "Invalid pagination parameters" });
  }

  const result = await service.listItems(userId, page, limit);
  res.json(result);
};
