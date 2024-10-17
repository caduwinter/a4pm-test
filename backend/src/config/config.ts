import * as dotenv from "dotenv";

dotenv.config();
export const config = {
  jwtSecret: process.env.JWT_SECRET || "secret",
  dbHost: process.env.DB_HOST || "mysql",
  dbPort: process.env.DB_PORT || 3306,
  dbName: process.env.DB_NAME || "teste_receitas_rg_sistemas",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
  frontendUrl: process.env.FRONTEND_URL,
  defaultPort: process.env.PORT || 7000,
};
