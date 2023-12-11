import express, { Request, Response, urlencoded, json } from "express";
import mongoose from "mongoose";
import connectDB from "./src/config/db-connect";
import logger from "./src/middleware/logger";
import dotenv from "dotenv";
import routesHandler from "./src/routes";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/error-handler";

dotenv.config();
const app = express();
const port = 3000;

connectDB();

app.use(logger);

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(cookieParser());

routesHandler(app);

app.all("*", (_request: Request, response: Response) => {
  response.status(404).json({ message: "404 Not Found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
