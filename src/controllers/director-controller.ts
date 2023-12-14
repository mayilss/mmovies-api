import { Request, Response } from "express";
import { Helpers } from "../helpers";
import {
  IBaseController,
  IIdQuery,
  IPaginationRequestDTO,
} from "../interfaces/base";
import { IAddDirectorDTO, IUpdateDirectorDTO } from "../interfaces/director";
import DirectorSchema from "../models/director";

class DirectorController
  implements IBaseController<IAddDirectorDTO, IUpdateDirectorDTO>
{
  constructor() {
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  private validateRequestBody(
    body: IAddDirectorDTO | IUpdateDirectorDTO
  ): boolean {
    return Boolean(body?.firstname) && Boolean(body?.lastname);
  }

  async add(
    request: Request<unknown, unknown, IAddDirectorDTO>,
    response: Response
  ): Promise<void> {
    const director = request.body;

    const isValid = this.validateRequestBody(director);
    if (!isValid) {
      response
        .status(400)
        .json({ message: "First and last names are required." });
      return;
    }
    try {
      const result = await DirectorSchema.create(director);
      response.status(201).json(result);
    } catch (error) {
      Helpers.handleServerError(response);
    }
  }

  async update(
    request: Request<unknown, unknown, IUpdateDirectorDTO>,
    response: Response
  ): Promise<void> {
    const { id } = request?.body;
    if (!id) {
      response.status(400).json({ message: "ID is required" });
      return;
    }
    try {
      const director = await DirectorSchema.findById(id);
      if (!director) {
        response.status(404).json({ message: "Director not found." });
        return;
      }

      const isValid = this.validateRequestBody(request.body);
      if (!isValid) {
        response
          .status(400)
          .json({ message: "Firstname and Lastname are required." });
        return;
      }
      const result = await DirectorSchema.findByIdAndUpdate(id, request.body);

      response.status(200).json(result);
    } catch (error) {
      Helpers.handleServerError(response);
    }
  }

  async remove(
    request: Request<unknown, unknown, unknown, IIdQuery>,
    response: Response
  ): Promise<void> {
    const { id } = request?.query;
    if (!id) {
      response.status(400).json({ message: "ID is required." });
      return;
    }
    try {
      const director = await DirectorSchema.findById(id);
      if (!director) {
        response.status(404).json({ message: "Director not found." });
        return;
      }

      const result = await DirectorSchema.findByIdAndDelete(id);
      response.status(200).json(result);
    } catch (error) {
      Helpers.handleServerError(response);
    }
  }

  async getList(
    request: Request<unknown, unknown, unknown, IPaginationRequestDTO>,
    response: Response
  ): Promise<void> {
    try {
      const { page, limit, fullname } = request.query;
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);
      const skip = (pageNumber - 1) * limitNumber;

      let filter: any = {};

      if (fullname) {
        const fuzzyRegex = [...(fullname as string)].join(".*");

        filter.$or = [
          { firstname: { $regex: new RegExp(fuzzyRegex, "i") } },
          { lastname: { $regex: new RegExp(fuzzyRegex, "i") } },
        ];
      }

      const totalCount = await DirectorSchema.countDocuments(filter);
      const directors = await DirectorSchema.find(filter)
        .skip(skip)
        .limit(limitNumber);
      if (!directors) {
        response.status(404).json({ message: "No directors found." });
        return;
      }
      response.json({ totalCount, data: directors });
    } catch (error) {
      Helpers.handleServerError(response);
    }
  }

  async getById(
    request: Request<unknown, unknown, unknown, IIdQuery>,
    response: Response
  ): Promise<void> {
    const { id } = request?.query;
    if (!id) {
      response.status(400).json({ message: `ID is required` });
      return;
    }

    try {
      const director = await DirectorSchema.findById(id);
      if (!director) {
        response.status(404).json({ message: "Director not found." });
        return;
      }
      response.json(director);
    } catch (error) {
      Helpers.handleServerError(response);
    }
  }
}

export default new DirectorController();
