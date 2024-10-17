import { Sequelize } from "sequelize";
import { config } from "./config";

const sequelize = new Sequelize(
  config.dbName || "teste_receitas_rg_sistemas",
  config.dbUser || "root",
  config.dbPassword,
  {
    host: config.dbHost || "mysql",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    port: Number(config.dbPort) || 3306,
    define: {
      freezeTableName: true,
    },
  },
);

export default sequelize;
