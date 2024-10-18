export default class UserLoginDTO {
  login: string;
  senha: string;
  nome: string;

  constructor(nome: string, login: string, senha: string) {
    this.login = login;
    this.senha = senha;
    this.nome = nome;
  }
}
