import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

interface CategoriaAttributes {
  id?: number;
  nome: string;
}

type CategoriaCreationAttributes = Optional<CategoriaAttributes, "id">;

class Categoria
  extends Model<CategoriaAttributes, CategoriaCreationAttributes>
  implements CategoriaAttributes
{
  public id!: number;
  public nome!: string;
}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Categoria",
    freezeTableName: true,
    tableName: "categorias",
    timestamps: false,
  },
);

export default Categoria;
