import UserSchema from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const registerUser = async (request: Request, response: Response) => {
  const user = request.body;

  const isInvalid = user && Object.values(user).some((value) => value === "");
  if (isInvalid) {
    return response
      .status(400)
      .json({ message: "Please fill the form completely." });
  }

  const duplicate = await UserSchema.findOne({
    username: user.username,
  }).exec();
  if (duplicate) {
    return response
      .status(400)
      .json({ message: "This username already exists." });
  }

  try {
    const hashedPwd = await bcrypt.hash(user.password, 10);
    await UserSchema.create({
      ...user,
      password: hashedPwd,
    });

    response
      .status(201)
      .json({ message: `New user ${user.username} created.` });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong." });
  }
};

export const RegisterController = {
  registerUser,
};
