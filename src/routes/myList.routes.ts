// routes/myList.routes.ts
import { Router } from "express";
import {
  addToMyList,
  removeFromMyList,
  listMyItems,
} from "../controllers/myList.controller";

const router = Router();

router.post("/", addToMyList);
router.delete("/:contentId", removeFromMyList);
router.get("/", listMyItems);

export default router;
