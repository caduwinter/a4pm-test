import UserLoginDTO from "../dto/UserLoginDTO";
import User from "../models/User";

class UserRepositoryBDR {
  async createUser(userData: UserLoginDTO): Promise<User> {
    try {
      return await User.create(userData);
    } catch (error) {
      console.error(
        "Error creating user in repository:",
        (error as Error).message,
      );
      throw error;
    }
  }

  async findByLogin(login: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { login } });
    } catch (error) {
      console.error("Error finding user by login:", (error as Error).message);
      throw error;
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error("Error finding user by ID:", (error as Error).message);
      throw error;
    }
  }
}

export default new UserRepositoryBDR();
