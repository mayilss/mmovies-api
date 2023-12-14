import UserSchema from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ILoginDTO } from "../interfaces/auth";
import { IAuthController } from "../interfaces/auth";
import { Helpers } from "../helpers";

class AuthController implements IAuthController<ILoginDTO> {
  async login(
    request: Request<unknown, unknown, ILoginDTO>,
    response: Response
  ) {
    const { username, password } = request.body;
    if (!username || !password) {
      response
        .status(400)
        .json({ message: "Username and password are required." });
      return;
    }

    const user = await UserSchema.findOne({ username }).exec();

    if (!user) {
      response.status(401).json("Invalid username or password.");
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      try {
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

        await user.save();

        response.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });
        response.json({ accessToken });
      } catch (error) {
        Helpers.handleServerError(response);
      }
    } else {
      response.status(401).json({ message: "Invalid username or password." });
    }
  }
}

export default new AuthController();
