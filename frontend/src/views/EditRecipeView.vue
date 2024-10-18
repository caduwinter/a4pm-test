<template>
  <div class="container-edit-recipe">
    <router-link to="/" class="back-button">← Voltar</router-link>
    <RecipeForm :isEdit="true" :user-id="userId" :recipe="recipeInfo" />
  </div>
</template>

<script>
import RecipeForm from "@/components/RecipeForm.vue";
import { getUserInfo } from "@/services/UserService";
import { getRecipeById } from "@/services/ReceitaService";

export default {
  name: "EditRecipeView",
  components: {
    RecipeForm,
  },
  data() {
    return {
      userId: null,
      recipeInfo: null,
    };
  },
  async created() {
    await this.initializePage();
  },
  methods: {
    async initializePage() {
      try {
        await this.loadUserData();
        await this.loadRecipe();
      } catch (error) {
        console.error("Erro na inicialização da página:", error);
        this.$router.push("/");
      }
    },
    async loadUserData() {
      try {
        const { id } = await getUserInfo();
        this.userId = id;
      } catch (error) {
        throw new Error("Erro ao obter dados do usuário");
      }
    },
    async loadRecipe() {
      const recipeId = this.$route.query.id;

      if (!recipeId) {
        return this.navigateToHome();
      }

      try {
        const { data: recipe } = await getRecipeById(recipeId);
        if (recipe.User.id !== this.userId) {
          return this.navigateToHome();
        }
        this.recipeInfo = recipe;
      } catch (error) {
        throw new Error("Erro ao buscar receita");
      }
    },
    navigateToHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.container-edit-recipe {
  padding: 20px;
}
</style>
