import express, { Request, Response, Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import GenericView from "../views/GenericView";

class CategoryRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", async (req: Request, res: Response) => {
      const view = new GenericView(req, res);
      const controller = new CategoriaController(view);
      await controller.findAll();
    });
  }
}

export default new CategoryRoutes().router;
