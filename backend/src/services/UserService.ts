import UserRepositoryBDR from "../repositories/UsuarioRepositoryBDR";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserLoginDTO from "../dto/UserLoginDTO";

class UserService {
  async registerUser(nome: string, login: string, senha: string) {
    const hashedPassword = await bcrypt.hash(senha, 8);
    const userDto = new UserLoginDTO(nome, login, hashedPassword);
    const user = await UserRepositoryBDR.createUser(userDto);

    if (!user) {
      throw new Error("Error creating user");
    }

    return user;
  }

  async loginUser(login: string, senha: string) {
    const user = await UserRepositoryBDR.findByLogin(login);

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new Error("Incorrect login or password");
    }

    return user;
  }

  generateToken(userId: number): string {
    return jwt.sign({ id: userId }, "secret", { expiresIn: "1d" });
  }

  async findUserById(id: number) {
    const user = await UserRepositoryBDR.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default new UserService();
