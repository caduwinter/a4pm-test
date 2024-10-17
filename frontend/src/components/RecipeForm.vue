<template>
  <section class="recipe-container">
    <header>
      <h2>{{ pageTitle }}</h2>
    </header>

    <form class="recipe-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          type="text"
          v-model="recipeName"
          placeholder="Nome da Receita"
          class="input-field"
          required
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="prepTime"
          placeholder="Tempo de Preparo (min)"
          class="input-field"
          @input="onlyNumbers('prepTime')"
          required
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="servings"
          placeholder="Porções"
          class="input-field"
          @input="onlyNumbers('servings')"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          v-model="ingredientsList"
          placeholder="Ingredientes"
          class="input-field"
          required
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="instructions"
          placeholder="Modo de Preparo"
          class="input-field"
          required
        />
      </div>
      <div class="form-group">
        <select v-model="selectedCategoryId" class="select-field" required>
          <option value="" disabled>Selecione uma Categoria</option>
          <option
            v-for="category in availableCategories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.nome }}
          </option>
        </select>
      </div>

      <button type="submit" class="submit-btn">{{ buttonText }}</button>
    </form>
  </section>
</template>

<script>
import { createRecipe, editRecipe } from "@/services/ReceitaService";
import { getCategories } from "@/services/CategoriaService";

export default {
  name: "RecipeFormComponent",

  props: {
    userId: {
      type: Number,
      required: true,
    },
    recipe: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      selectedCategoryId: "",
      recipeName: "",
      prepTime: "",
      servings: "",
      ingredientsList: "",
      instructions: "",
      availableCategories: [],
    };
  },

  computed: {
    pageTitle() {
      return this.isEdit ? "Atualizar Receita ✏️" : "Criar Nova Receita 🍜";
    },
    buttonText() {
      return this.isEdit ? "Atualizar" : "Criar";
    },
  },

  watch: {
    recipe: {
      immediate: true,
      handler(newRecipe) {
        if (newRecipe) {
          this.fillFormWithRecipeData(newRecipe);
        }
      },
    },
  },

  async mounted() {
    await this.fetchCategories();
    if (this.isEdit && this.recipe) {
      this.fillFormWithRecipeData(this.recipe);
    }
  },

  methods: {
    async fetchCategories() {
      try {
        this.availableCategories = await getCategories();
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    },

    fillFormWithRecipeData(recipe) {
      const {
        Categoria: { id },
        nome,
        tempo_preparo_minutos,
        porcoes,
        ingredientes,
        modo_preparo,
      } = recipe;

      this.selectedCategoryId = id;
      this.recipeName = nome;
      this.prepTime = tempo_preparo_minutos;
      this.servings = porcoes;
      this.ingredientsList = ingredientes;
      this.instructions = modo_preparo;
    },

    onlyNumbers(field) {
      this[field] = this[field].replace(/[^0-9]/g, "");
    },

    async handleSubmit() {
      const recipeDetails = {
        id_categorias: this.selectedCategoryId,
        nome: this.recipeName,
        tempo_preparo_minutos: this.prepTime,
        porcoes: this.servings,
        ingredientes: this.ingredientsList,
        modo_preparo: this.instructions,
        id_usuarios: this.userId,
      };

      try {
        if (this.isEdit) {
          await editRecipe(this.recipe.id, recipeDetails);
        } else {
          await createRecipe(recipeDetails);
        }
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao enviar a receita:", error);
      }
    },
  },
};
</script>

<style scoped>
.recipe-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 2.5rem auto;
  max-width: 420px;
  text-align: center;
  border-radius: 16px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.32);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.recipe-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-title {
  font-weight: 600;
  font-size: 32px;
  color: #5e61cd;
  margin: 0;
}

.form-group * {
  padding: 0.75rem 0.5rem;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  width: 100%;
}
.form-group {
  width: 100%;
}

.submit-btn {
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  padding: 9px;
  background-color: #5e61cd;
  border: 1px solid #5e61cd;
  cursor: pointer;
  transition: all 400ms;
}

.submit-btn:hover {
  background-color: #fff;
  color: #5e61cd;
}
</style>
