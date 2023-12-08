import UserSchema from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const handleLogin = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const user = await UserSchema.findOne({ username }).exec();

  if (!user) {
    return response.status(404).json("This user does not exist.");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );
    user.refreshToken = refreshToken;
    const result = await user.save();
    response.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    response.json({ accessToken });
  } else {
    response.sendStatus(404);
  }
};

export const AuthController = { handleLogin };
