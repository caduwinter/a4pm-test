import express, { NextFunction } from "express";
import cors from "cors";
import sequelize from "./config/db";
import userRoutes from "./routes/User";
import authRoutes from "./routes/Auth";
import categoriaRoutes from "./routes/Categoria";
import recipeRoutes from "./routes/Receita";
import cookieParser from "cookie-parser";

import { config } from "./config/config";

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: config.frontendUrl,
      credentials: true,
    }),
  );

  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);

  app.use("/api/categorias", categoriaRoutes);
  app.use("/api/receitas", recipeRoutes);

  return app;
};

const startServer = async () => {
  const app = createServer();

  try {
    await sequelize.sync({ force: false });

    const PORT = config.defaultPort;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
};

startServer();
