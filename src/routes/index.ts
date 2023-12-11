import { Express } from "express";
import register from "./register";
import auth from "./auth";
import director from "./director";
import verifyJWT from "../middleware/verify-jwt";

const routesHandler = (app: Express) => {
  app.use("/register", register);
  app.use("/auth", auth);

  app.use(verifyJWT);

  app.use("/director", director);
};

export default routesHandler;
