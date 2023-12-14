import { Request, Response } from "express";

export interface ILoginDTO {
  username: string;
  password: string;
}

export interface IAuthController<TLoginDTO> {
  login(
    request: Request<unknown, unknown, TLoginDTO>,
    response: Response
  ): Promise<void>;
}
