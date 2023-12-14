import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader =
    request.headers.authorization || request.headers.Authorization;

  if (!authHeader && !authHeader?.startsWith("Bearer ")) {
    response.sendStatus(401);
    return;
  }
  const token = authHeader && (authHeader as string).split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error, decoded) => {
    if (error) {
      response.sendStatus(403);
      return;
    }
    next();
  });
};

export default verifyJWT;
