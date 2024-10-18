import { Request, Response } from "express";
import RecipeRepositoryBDR from "../repositories/ReceitaRepositoryBDR";
import GenericView from "../views/GenericView";

class RecipeController {
  view: GenericView;

  constructor(view: GenericView) {
    this.view = view;
  }

  async createRecipe(): Promise<void> {
    try {
      const recipe = await RecipeRepositoryBDR.createRecipe({
        ...this.view.req.body,
      });
      this.view.send(recipe, 200);
    } catch (error: any) {
      const err = { message: "Error adding recipe", error };
      this.view.send(err, 500);
    }
  }

  async listAllRecipes(): Promise<void> {
    try {
      const recipes = await RecipeRepositoryBDR.findAll();
      this.view.send(recipes, 200);
    } catch (error: any) {
      const err = { message: "Error listing recipes", error };
      this.view.send(err, 500);
    }
  }

  async getRecipe(): Promise<void> {
    try {
      const id = parseInt(this.view.req.params.id);
      const recipe = await RecipeRepositoryBDR.findById(id);
      this.view.send(recipe, 200);
    } catch (error: any) {
      const err = { message: "Error retrieving recipe", error };
      this.view.send(err, 500);
    }
  }

  async editRecipe(): Promise<void> {
    try {
      const recipe = await RecipeRepositoryBDR.updateRecipe(
        parseInt(this.view.req.params.id),
        this.view.req.body,
      );
      this.view.send(recipe, 200);
    } catch (error: any) {
      const err = { message: "Error editing recipe", error };
      this.view.send(err, 500);
    }
  }

  async deleteRecipe(): Promise<void> {
    try {
      const id = parseInt(this.view.req.params.id);

      await RecipeRepositoryBDR.deleteRecipe(id);
      this.view.send({}, 200);
    } catch (error: any) {
      const err = { message: "Error deleting recipe", error };
      this.view.send(err, 500);
    }
  }
}

export default RecipeController;
