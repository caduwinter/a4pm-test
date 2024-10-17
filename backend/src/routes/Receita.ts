import express, { Request, Response, Router } from "express";
import RecipeController from "../controllers/ReceitaController";
import mustBeAuthenticated from "../middleware/AuthMiddleware";
import GenericView from "../views/GenericView";
import canEditRecipe from "../middleware/CanEditRecipe";

class RecipeRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      mustBeAuthenticated,
      async (req: Request, res: Response) => {
        const view = new GenericView(req, res);
        const controller = new RecipeController(view);
        await controller.createRecipe();
      },
    );

    this.router.get("/", async (req: Request, res: Response) => {
      const view = new GenericView(req, res);
      const controller = new RecipeController(view);
      await controller.listAllRecipes();
    });

    this.router.get("/:id", async (req: Request, res: Response) => {
      const view = new GenericView(req, res);
      const controller = new RecipeController(view);
      await controller.getRecipe();
    });

    this.router.put(
      "/:id",
      mustBeAuthenticated,
      canEditRecipe,
      async (req: Request, res: Response) => {
        const view = new GenericView(req, res);
        const controller = new RecipeController(view);
        await controller.editRecipe();
      },
    );

    this.router.delete(
      "/:id",
      mustBeAuthenticated,
      canEditRecipe,
      async (req: Request, res: Response) => {
        const view = new GenericView(req, res);
        const controller = new RecipeController(view);
        await controller.deleteRecipe();
      },
    );
  }
}

export default new RecipeRoutes().router;
