import { Request, Response } from "express";
import DirectorSchema from "../models/director";
import { Helpers } from "../helpers";
import { IBaseController } from "../interfaces/base";
import { IAddDirectorDTO, IUpdateDirectorDTO } from "../interfaces/director";

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
    request: Request<IAddDirectorDTO>,
    response: Response
  ): Promise<void> {
    const director = request.body;

    console.log(this);
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
    request: Request<IUpdateDirectorDTO>,
    response: Response
  ): Promise<void> {
    const id = request?.body?.id;
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

  async remove(request: Request, response: Response): Promise<void> {
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

  async getList(_request: Request, response: Response): Promise<void> {
    try {
      const directors = await DirectorSchema.find();
      if (!directors) {
        response.status(404).json({ message: "No directors found." });
        return;
      }
      response.json(directors);
    } catch (error) {
      Helpers.handleServerError(response);
    }
  }

  async getById(request: Request, response: Response): Promise<void> {
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
