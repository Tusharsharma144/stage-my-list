// middlewares/mockAuth.middleware.ts
import { Request, Response, NextFunction } from "express";

export function mockAuth(req: Request, _res: Response, next: NextFunction) {
  req.user = { id: "user_1" };
  next();
}
