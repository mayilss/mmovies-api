import Express from "express";
import mongoose from "mongoose";
import { connectDB } from "./src/config/db-connect";
import { logger } from "./src/middleware/logger";
import dotenv from "dotenv";
dotenv.config();
const app = Express();
const port = 3000;

connectDB();

app.use(logger);

app.get("/", (_req: Express.Request, res: Express.Response) => {
  res.send("Hello World!");
});

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
