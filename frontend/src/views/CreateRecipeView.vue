<template>
  <div class="CreateRecipe">
    <RecipeForm :isEdit="false" :user-id="userId" />
  </div>
</template>

<script>
import RecipeForm from "@/components/RecipeForm.vue";
import { getUserInfo } from "@/services/UserService";

export default {
  name: "CreateRecipeView",
  components: {
    RecipeForm,
  },
  data() {
    return {
      userId: null,
    };
  },
  async created() {
    try {
      const userInfo = await getUserInfo();
      this.userId = userInfo.id;
    } catch (error) {
      this.$router.push("/");
    }
  },
};
</script>
