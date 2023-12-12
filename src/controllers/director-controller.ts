import { Request, Response } from "express";
import { IDirector } from "../types";
import DirectorSchema from "../models/director";

const add = async (request: Request, response: Response) => {
  const director: IDirector = request.body;
  const isInvalid = !director.firstname || !director.lastname;
  if (isInvalid) {
    return response
      .status(400)
      .json({ message: "First and last names are required." });
  }
  try {
    const result = await DirectorSchema.create(director);
    response.status(201).json(result);
  } catch (error) {
    response.status(500).json({ message: "Something went wrong." });
  }
};

const getAll = async (request: Request, response: Response) => {
  const directors = await DirectorSchema.find();

  if (!directors) {
    return response.status(404).json({ message: "No directors found." });
  }
  response.json(directors);
};

const getById = async (request: Request, response: Response) => {
  const id = request?.params?.id;
  if (!id) {
    return response.status(400).json({ message: `ID is required` });
  }

  const director = await DirectorSchema.findById(id);
  if (!director) {
    return response.status(404).json({ message: "Director not found." });
  }

  response.json(director);
};

export const DirectorController = {
  getAll,
  add,
  getById,
};
