// app.ts
import express from "express";
import myListRoutes from "./routes/myList.routes";
import { mockAuth } from "./middlewares/mockAuth.middleware";

const app = express();

app.use(express.json());
app.use(mockAuth);

app.use("/my-list", myListRoutes);

export default app;
