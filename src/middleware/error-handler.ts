import { Request, Response } from "express";
import { logEvents } from "./logger";

const errorHandler = (err: Error, _req: Request, res: Response) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

export default errorHandler;
