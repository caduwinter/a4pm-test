<template>
  <header class="header">
    <div class="main-page">
      <router-link class="header-logo" to="/">
        <font-awesome-icon icon="home" />
      </router-link>
    </div>
    <div class="header-search">
      <input
        class="search-input"
        v-model="searchQueryGlobal"
        placeholder="Filtrar receitas pelo nome"
        aria-label="Filtrar receitas"
      />
    </div>
    <div class="header-actions">
      <router-link
        v-if="isLoggedIn"
        class="header-button create-recipe-btn"
        to="/receita/add"
      >
        Adicionar
      </router-link>
      <router-link
        v-if="!isLoggedIn"
        class="header-button login-btn"
        to="/login"
      >
        Login
      </router-link>
      <a
        v-else
        class="header-button logout-btn"
        href="#"
        @click.prevent="handleLogout"
      >
        Sair
      </a>
    </div>
  </header>
</template>

<script>
import { useAuth, logoutAuth } from "@/authStore";
import { searchQuery } from "@/eventBus";
import { logoutUser } from "@/services/AuthService.js";

export default {
  name: "HeaderComponent",
  setup() {
    const { isLoggedIn } = useAuth();
    return { isLoggedIn };
  },
  computed: {
    searchQueryGlobal: {
      get() {
        return searchQuery.value;
      },
      set(newQuery) {
        searchQuery.value = newQuery;
      },
    },
  },
  methods: {
    async handleLogout() {
      try {
        await logoutUser();
        logoutAuth();
        this.$router.push("/login");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    },
  },
};
</script>

<style scoped>
.header-logo {
  font-size: 1.7em;
  color: #fff;
}
.header-button {
  color: #fff;
  text-decoration: none;
  background: none;
}
.header-search {
  flex: 1;
}
.search-input {
  border: none;
  border-radius: 8px;
  padding: 0.6rem;
  width: 90%;
  display: block;
  color: white;
  margin: auto;
  background: rgba(255, 255, 255, 0.32);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.search-input:focus-visible {
  border: 1px solid #8671e3;
  outline: none;
}
.search-input::placeholder {
  color: rgba(240, 240, 240, 0.528);
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 0;
  background-color: #5e61cd;
  border-radius: 0 0 16px 16px;
}

.main-page {
  padding: 0 2rem;
  align-content: center;
}

.header-actions {
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  color: #f29090;
  border-bottom: 2px solid #f29090;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.create-recipe-btn:hover,
.login-btn:hover {
  background-color: #fff;
  color: #5e61cd;
}
.logout-btn:hover {
  background-color: #ff9c9c;
  color: #fff;
}

.create-recipe-btn {
  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 400ms;
  border-bottom: 2px solid white;
}

.login-btn {
  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 400ms;
  border-bottom: 2px solid white;
}
@media (max-width: 425px) {
  .main-page,
  .header-button {
    font-size: 14px !important;
  }
}
@media (max-width: 480px) {
  .main-page,
  .header-button {
    font-size: 18px;
  }
  .main-page {
    padding: 0 1rem;
  }

  .logout-btn,
  .create-recipe-btn,
  .login-btn {
    padding: 0.25rem 0.5rem;
    align-content: center;
    text-align: center;
  }
}
</style>
