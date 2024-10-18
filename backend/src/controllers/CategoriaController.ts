import { Request, Response } from "express";
import CategoryRepositoryBDR from "../repositories/CategoriaRepositoryBDR";
import GenericView from "../views/GenericView";

class CategoryController {
  view: GenericView;

  constructor(view: GenericView) {
    this.view = view;
  }

  async findAll(): Promise<void> {
    try {
      const categories = await CategoryRepositoryBDR.findAll();
      this.view.send(categories);
    } catch (error: any) {
      const err = {
        message: "Error retrieving categories",
        error: error.message,
      };
      this.view.send(err, 500);
    }
  }
}

export default CategoryController;
