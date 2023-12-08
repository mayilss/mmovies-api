import { Express } from "express";
import register from "./register";

const routesHandler = (app: Express) => {
  app.use("/register", register);
};

export default routesHandler;
