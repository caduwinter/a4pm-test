import express, { Request, Response, Router } from "express";
import mustBeAuthenticated from "../middleware/AuthMiddleware";
import AuthController from "../controllers/AuthController";
import GenericView from "../views/GenericView";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/login", (req: Request, res: Response) => {
      const view = new GenericView(req, res);
      const controller = new AuthController(view);

      controller.login();
    });
    this.router.post("/logout", (req: Request, res: Response) => {
      const view = new GenericView(req, res);
      const controller = new AuthController(view);

      controller.logout();
    });
    this.router.post(
      "/check-access",
      mustBeAuthenticated,
      (req: Request, res: Response) => {
        const view = new GenericView(req, res);
        view.send({ message: "Authorized" });
      },
    );
  }
}

export default new AuthRoutes().router;
