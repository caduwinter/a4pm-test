import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "teste_receitas_rg_sistemas",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "mysql",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    port: Number(process.env.DB_PORT) || 3306,
    define: {
      freezeTableName: true,
    },
  },
);

export default sequelize;
