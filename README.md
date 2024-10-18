# Projeto Receitas A4PM

Este projeto utiliza Docker para criar contêineres para o backend e frontend.

## Pré-requisitos

- Docker instalado ([Instruções de instalação](https://docs.docker.com/get-docker/))

## Passos para iniciar o projeto

1. **Configurar variáveis de ambiente**:

   - As variáveis de ambiente no Docker já estão preenchidas com valores padrão. Basta customizá-las conforme suas necessidades para que a aplicação funcione corretamente.

2. **Subir os contêineres**:

   - No terminal, execute:
     ```bash
     docker-compose up --build
     ```

3. **Acessar o projeto**:
   - O frontend estará disponível em: `http://localhost:<porta-frontend>`
   - O backend estará disponível em: `http://localhost:<porta-backend>`

## Atenção

- Certifique-se de que as variáveis de ambiente no arquivo `.env` estejam configuradas corretamente para conectar-se ao banco de dados e outras dependências.
- Se houver problemas de conexão, verifique as portas expostas e se os contêineres estão acessando as mesmas redes.
- Verifique se os scripts possuem as permissões corretas de execução. Por exemplo, para garantir que o script `wait-for-it.sh` seja executável, utilize o seguinte comando:

  ```bash
  chmod +x ./backend/wait-for-it.sh
  ```
