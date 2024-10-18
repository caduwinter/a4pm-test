<template>
  <div :class="{ home: true, 'home-full-width': !userInfo }">
    <AllRecipes
      :allRecipes="allRecipes"
      :userRecipes="userRecipes"
      @recipe-deleted="handleRecipeDeleted"
    />
  </div>
</template>

<script>
import AllRecipes from "@/components/AllRecipes.vue";
import { getAllRecipes } from "@/services/ReceitaService";
import { getUserInfo } from "@/services/UserService";

export default {
  name: "HomePageView",
  components: {
    AllRecipes,
  },
  data() {
    return {
      allRecipes: [],
      userInfo: null,
    };
  },
  computed: {
    userRecipes() {
      if (!this.allRecipes) return [];
      return this.userInfo
        ? this.allRecipes.filter(
            (recipe) => recipe.id_usuarios === this.userInfo.id,
          )
        : [];
    },
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    handleRecipeDeleted(recipeId) {
      this.allRecipes = this.allRecipes.filter(
        (recipe) => recipe.id !== recipeId,
      );
    },
    async fetchData() {
      try {
        await Promise.all([this.loadAllRecipes(), this.loadUserInfo()]);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    },
    async loadAllRecipes() {
      try {
        const recipeResponse = await getAllRecipes();
        this.allRecipes = recipeResponse.data;
      } catch (error) {
        console.error("Erro ao carregar as receitas:", error);
      }
    },
    async loadUserInfo() {
      try {
        this.userInfo = await getUserInfo();
      } catch (error) {
        console.error("Erro ao encontrar usuário:", error);
      }
    },
  },
};
</script>

<style></style>
