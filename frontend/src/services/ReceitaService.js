import apiService from "./ApiService";

export const createRecipe = (recipeData) =>
  apiService.post("/receitas", recipeData);

export const editRecipe = (id, recipeData) =>
  apiService.put(`/receitas/${id}`, recipeData);

export const getAllRecipes = () => apiService.get("/receitas");

export const getRecipeById = (id) => apiService.get(`/receitas/${id}`);

export const deleteRecipe = (id) => apiService.delete(`/receitas/${id}`);
