import { DataTypes, Sequelize } from "sequelize";
import Categoria from "../models/Categoria";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import { config } from "../config/config";

let sequelize;
const date = new Date().toLocaleString("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
beforeAll(async () => {
  sequelize = new Sequelize(
    `${config.dbHost}://${config.dbUser}:${config.dbPassword}@localhost:${config.dbPort}/${config.dbName}_test`,
  );
  await Categoria.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: "Categoria" },
  );

  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Categoria Model", () => {
  it("deve criar uma nova categoria", async () => {
    const categoria = await Categoria.create({ nome: "TesteCategoria" + date });
    expect(categoria.nome).toBe("TesteCategoria" + date);
  });

  it("não deve permitir categorias com o mesmo nome", async () => {
    await Categoria.create({ nome: "Carnes" });
    await expect(Categoria.create({ nome: "Carnes" })).rejects.toThrow();
  });

  it("deve falhar ao criar uma categoria sem nome", async () => {
    await expect(Categoria.create()).rejects.toThrow();
  });
});
