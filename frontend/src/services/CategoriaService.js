import apiService from "./ApiService";

export const getCategories = () =>
  apiService
    .get("/categorias")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar categorias:", error);
      throw error;
    });
