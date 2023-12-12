import { ObjectId } from "mongoose";

export interface IAddDirectorDTO {
  firstname: string;
  lastname: string;
  imagePath?: string;
  birthyear?: number;
  bio?: string;
  movies: ObjectId[];
}

export interface IUpdateDirectorDTO extends IAddDirectorDTO {
  id: ObjectId;
}
