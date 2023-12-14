import { Request, Response } from "express";
import { ObjectId } from "mongoose";

export interface IPaginationRequestDTO {
  page: string;
  limit: string;
  fullname?: string;
}

export interface IIdQuery {
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
    request: Request<unknown, unknown, unknown, IIdQuery>,
    response: Response
  ): Promise<void>;
  getList(
    _request: Request<unknown, unknown, unknown, IPaginationRequestDTO>,
    response: Response
  ): Promise<void>;
  getById(
    request: Request<unknown, unknown, unknown, IIdQuery>,
    response: Response
  ): Promise<void>;
}
