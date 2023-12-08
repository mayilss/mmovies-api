import { Express } from "express";
import register from "./register";
import auth from "./auth";
import verifyJWT from "../middleware/verifyJWT";

const routesHandler = (app: Express) => {
  app.use("/register", register);
  app.use("/auth", auth);

  app.use(verifyJWT);
};

export default routesHandler;
