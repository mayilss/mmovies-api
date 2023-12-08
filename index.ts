import express, { Request, Response, urlencoded, json } from "express";
import mongoose from "mongoose";
import connectDB from "./src/config/db-connect";
import logger from "./src/middleware/logger";
import dotenv from "dotenv";
import routesHandler from "./src/routes";

dotenv.config();
const app = express();
const port = 3000;

connectDB();

app.use(logger);

app.use(urlencoded({ extended: false }));
app.use(json());

routesHandler(app);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
