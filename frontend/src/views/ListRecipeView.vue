<template>
  <div class="recipe-view">
    <router-link to="/" class="back-button">← Voltar</router-link>

    <div class="content-wrapper">
      <div v-if="statusMessage" class="status-message">{{ statusMessage }}</div>
      <RecipeInfo v-if="!loading && !error && recipe" :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import { getRecipeById } from "@/services/ReceitaService";
import RecipeInfo from "@/components/RecipeInfo.vue";

export default {
  name: "ListRecipeView",
  components: {
    RecipeInfo,
  },
  data() {
    return {
      recipe: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    statusMessage() {
      if (this.loading) return "Carregando...";
      if (this.error) return this.error;
      return null;
    },
  },
  async mounted() {
    await this.fetchRecipe();
  },
  methods: {
    async fetchRecipe() {
      const recipeId = this.$route.query.id;

      if (!recipeId) {
        this.navigateHome();
        return;
      }

      try {
        const response = await getRecipeById(recipeId);
        this.recipe = response.data;
        if (!this.recipe) this.error = "Esta receita não foi encontrada!";
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    navigateHome() {
      this.$router.push("/");
    },
    handleError(error) {
      this.error = "Erro ao carregar receita.";
      console.error("Erro ao carregar receita:", error);
    },
  },
};
</script>

<style scoped>
.status-message {
  color: black;
  text-align: center;
  font-size: large;
  font-weight: bold;
}
.back-button {
  text-decoration: none;
  color: #7360ee;
  font-weight: bold;
}
.content-wrapper {
  margin-top: 20px;
}
.recipe-view {
  padding: 20px;
}
</style>
