<template>
  <section id="auth-form-container" class="auth-container">
    <h3 class="auth-title">{{ isRegisterForm ? "Cadastre-se" : "Login" }}</h3>
    <transition name="fade" mode="out-in">
      <form class="auth-form" key="form" @submit.prevent="submitForm">
        <input
          v-if="isRegisterForm"
          class="input-field"
          v-model="nome"
          placeholder="Nome"
          required
        />
        <input
          class="input-field"
          v-model="login"
          placeholder="Login"
          required
        />
        <input
          class="input-field"
          v-model="senha"
          type="password"
          placeholder="Senha"
          required
        />
        <button class="auth-button" type="submit">
          {{ isRegisterForm ? "Registrar" : "Entrar" }}
        </button>
        <a class="form-toggle-link" href="#" @click.prevent="toggleForm">
          {{ toggleText }}
        </a>
      </form>
    </transition>
  </section>
</template>

<script>
import { registerUser } from "@/services/UserService";
import { loginUser } from "@/services/AuthService";
import { loginAuth } from "@/authStore";

export default {
  name: "AuthForm",
  data() {
    return {
      isRegisterForm: false,
      nome: "",
      login: "",
      senha: "",
    };
  },
  computed: {
    toggleText() {
      return this.isRegisterForm ? "Fazer login" : "Cadastre-se agora!";
    },
  },
  methods: {
    toggleForm() {
      this.isRegisterForm = !this.isRegisterForm;
      this.resetFormFields();
    },
    resetFormFields() {
      if (!this.isRegisterForm) {
        this.nome = "";
      }
    },
    async submitForm() {
      try {
        this.isRegisterForm
          ? await this.registerUser()
          : await this.makeLogin();
      } catch (error) {
        this.handleError(error);
      }
    },
    async makeLogin() {
      const response = await loginUser(this.login, this.senha);
      if (response.status === 200) {
        loginAuth();
        this.$router.push("/");
      }
    },
    async registerUser() {
      const response = await registerUser(this.nome, this.login, this.senha);
      if (response.status === 201) {
        loginAuth();
        this.$router.push("/");
      }
    },
    handleError(error) {
      console.error(error);
      alert(
        this.isRegisterForm ? "Erro ao cadastrar" : "Login ou senha incorretos",
      );
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 2.5rem auto;
  max-width: 420px;
  text-align: center;
  border-radius: 16px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.32);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.auth-title {
  font-weight: 600;
  font-size: 32px;
  color: #5e61cd;
  margin: 0;
}

.input-field {
  padding: 0.75rem 0.5rem;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
}

.auth-button {
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  padding: 9px;
  background-color: #5e61cd;
  border: 1px solid #5e61cd;
  cursor: pointer;
  transition: all 400ms;
}

.auth-button:hover {
  background-color: #fff;
  color: #5e61cd;
}

.form-toggle-link {
  color: #5e61cd;
  text-decoration: underline;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 680px) {
  .auth-container {
    width: calc(100% - 8rem);
  }
}
</style>
