import { Request, Response } from "express";
import UserService from "../services/UserService";
import GenericView from "../views/GenericView";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

class AuthController {
  view: GenericView;

  constructor(view: GenericView) {
    this.view = view;
  }

  async login(): Promise<void> {
    try {
      const { login, senha } = this.view.req.body;
      const user = await UserService.loginUser(login, senha);
      const token = UserService.generateToken(user.id);

      this.view.generateCookie("token", token);

      this.view.send({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", (error as Error).message);
      this.view.send({ message: "Incorrect login or password" }, 401);
    }
  }

  async logout(): Promise<void> {
    this.view.clearCookie("token");
    this.view.send({ message: "Successfully logged out" });
  }
}

export default AuthController;
