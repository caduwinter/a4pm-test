import apiService from "./ApiService";

export const registerUser = (nome, login, senha) =>
  apiService.post("/user/register", { nome, login, senha });

export const getUserInfo = () =>
  apiService
    .get("/user")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
