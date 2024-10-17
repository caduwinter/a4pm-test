import Categoria from "../models/Categoria";

class CategoriaRepositoryBDR {
  async findAll(): Promise<Categoria[]> {
    try {
      const categories = await Categoria.findAll();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", (error as Error).message);
      throw error;
    }
  }
}

export default new CategoriaRepositoryBDR();
