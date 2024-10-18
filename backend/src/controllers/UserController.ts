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

class UserController {
  view: GenericView;

  constructor(view: GenericView) {
    this.view = view;
  }

  async register(): Promise<void> {
    try {
      const { nome, login, senha } = this.view.req.body;

      if (!nome || !login || !senha) {
        this.view.send({ message: "Incomplete data" }, 400);
        return;
      }

      const user = await UserService.registerUser(nome, login, senha);
      const token = UserService.generateToken(user.id);

      this.view.generateCookie("token", token);

      this.view.send({ user }, 201);
    } catch (error) {
      console.error("Error creating user:", (error as Error).message);
      this.view.send({ message: "Error creating user" }, 500);
    }
  }

  async getUser(): Promise<void> {
    try {
      if (!this.view.req.user || typeof this.view.req.user.id !== "number") {
        this.view.send({ message: "Usuário não encontrado" }, 400);
        return;
      }

      const user = await UserService.findUserById(this.view.req.user.id);
      this.view.send(user);
    } catch (error) {
      console.error(
        "Error getting user information:",
        (error as Error).message,
      );
      this.view.send({ message: "Error getting user information" }, 500);
    }
  }
}

export default UserController;
