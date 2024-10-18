import { Request, Response, NextFunction } from "express";
import RecipeRepository from "../repositories/ReceitaRepositoryBDR";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

const canEditRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const recipeId = Number(req.params.id);
  const userIdFromToken = getUserIdFromToken(req);
  try {
    const recipe = await RecipeRepository.findById(recipeId);

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    if (recipe?.User?.id !== userIdFromToken) {
      res.status(403).json({
        message: "Forbidden: You do not have permission to edit this recipe",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Error checking recipe access:", (error as Error).message);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

function getUserIdFromToken(req: Request): number {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
  return decoded.id;
}

export default canEditRecipe;
