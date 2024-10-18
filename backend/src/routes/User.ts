import express, { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import GenericView from "../views/GenericView";
import mustBeAuthenticated from "../middleware/AuthMiddleware";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/register", async (req: Request, res: Response) => {
      const view = new GenericView(req, res);
      const controller = new UserController(view);
      await controller.register();
    });

    this.router.get(
      "/",
      mustBeAuthenticated,
      async (req: Request, res: Response) => {
        const view = new GenericView(req, res);
        const controller = new UserController(view);
        await controller.getUser();
      },
    );
  }
}

export default new UserRoutes().router;
