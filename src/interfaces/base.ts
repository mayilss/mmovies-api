import { Request, Response } from "express";
import { ObjectId } from "mongoose";

interface IPaginationRequestDTO {
  page: number;
  limit: number;
}

interface IIdQuery {
  id: ObjectId;
}

export interface IBaseController<TAddDTO, TUpdateDTO> {
  add(
    request: Request<unknown, unknown, TAddDTO>,
    response: Response
  ): Promise<void>;
  update(
    request: Request<unknown, unknown, TUpdateDTO>,
    response: Response
  ): Promise<void>;
  remove(
    request: Request<unknown, IIdQuery>,
    response: Response
  ): Promise<void>;
  getList(
    _request: Request<unknown, IPaginationRequestDTO>,
    response: Response
  ): Promise<void>;
  getById(
    request: Request<unknown, IIdQuery>,
    response: Response
  ): Promise<void>;
}
