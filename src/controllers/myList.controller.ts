import { Request, Response } from "express";
import { MyListService } from "../services/myList.service";

const service = new MyListService();

export const addToMyList = async (req: Request, res: Response) => {
  const { contentId, contentType } = req.body;
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

  const result = await service.listItems(userId, page, limit);
  res.json(result);
};
