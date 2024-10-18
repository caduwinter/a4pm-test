import Categoria from "../models/Categoria";
import Recipe from "../models/Receita";
import User from "../models/User";

class RecipeRepositoryBDR {
  async createRecipe(recipeData: any): Promise<Recipe> {
    try {
      return await Recipe.create(recipeData);
    } catch (error) {
      console.error(
        "Error creating recipe in repository:",
        (error as Error).message,
      );
      throw error;
    }
  }

  async findById(id: number): Promise<Recipe | null> {
    try {
      return await Recipe.findByPk(id, {
        attributes: { exclude: ["id_usuarios", "id_categorias"] },
        include: [
          {
            model: User,
            attributes: ["id", "nome"],
          },
          {
            model: Categoria,
            as: "Categoria",

            attributes: ["id", "nome"],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching recipe by ID:", (error as Error).message);
      throw error;
    }
  }

  async findAll(): Promise<Recipe[]> {
    try {
      return await Recipe.findAll();
    } catch (error) {
      console.error("Error fetching all recipes:", (error as Error).message);
      throw error;
    }
  }

  async updateRecipe(id: number, recipeData: any): Promise<number[]> {
    try {
      return await Recipe.update(recipeData, { where: { id } });
    } catch (error) {
      console.error("Error updating recipe:", (error as Error).message);
      throw error;
    }
  }

  async deleteRecipe(id: number): Promise<number> {
    try {
      return await Recipe.destroy({ where: { id } });
    } catch (error) {
      console.error("Error deleting recipe:", (error as Error).message);
      throw error;
    }
  }
}

export default new RecipeRepositoryBDR();
