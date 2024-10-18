import apiService from "./ApiService";

export const loginUser = (login, senha) =>
  apiService.post("/auth/login", { login, senha });

export const logoutUser = () => apiService.post("/auth/logout");

export const isAuthenticated = () =>
  apiService
    .post("/auth/check-access")
    .then((result) => result.status === 200)
    .catch(() => false);
