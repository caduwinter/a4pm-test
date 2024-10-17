import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Categoria from "./Categoria";

interface ReceitaAttributes {
  id?: number;
  id_usuarios: number;
  id_categorias?: number;
  nome?: string;
  tempo_preparo_minutos?: number;
  porcoes?: number;
  modo_preparo: string;
  ingredientes?: string;
  criado_em?: Date;
  alterado_em?: Date;
}

interface ReceitaCreationAttributes extends Optional<ReceitaAttributes, "id"> {}

class Receita
  extends Model<ReceitaAttributes, ReceitaCreationAttributes>
  implements ReceitaAttributes
{
  public id!: number;
  public id_usuarios!: number;
  public id_categorias?: number;
  public nome?: string;
  public tempo_preparo_minutos?: number;
  public porcoes?: number;
  public modo_preparo!: string;
  public ingredientes?: string;
  public criado_em!: Date;
  public alterado_em!: Date;
}

Receita.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuarios: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    id_categorias: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Categoria,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    tempo_preparo_minutos: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    porcoes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    modo_preparo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredientes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    alterado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "receitas",
    timestamps: false,
    freezeTableName: true,
  },
);

Receita.belongsTo(User, { foreignKey: "id_usuarios" });
Receita.belongsTo(Categoria, { foreignKey: "id_categorias", as: "Categoria" });

export default Receita;
