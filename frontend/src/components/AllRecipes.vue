<template>
  <section class="recipes-wrapper">
    <h2 class="recipes-title">Receitas</h2>
    <div class="recipes-search-wrapper">
      <ul class="recipes-list" v-if="filteredRecipes.length">
        <li
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          class="recipe-item"
        >
          <div class="l-wrapper">
            <span class="recipe-name">
              {{ recipe.nome }}
              <div
                class="tooltip-wrapper"
                @mouseover="showTooltip(recipe.id)"
                @mouseleave="hideTooltip"
              >
                <span class="tooltip-button" v-if="isUserRecipe(recipe.id)">
                  🌟
                </span>

                <div v-if="activeTooltip === recipe.id" class="tooltip">
                  Esta receita é sua!
                </div>
              </div>
              <br />

              <small class="recipe-time">
                {{ recipe.porcoes }} porções ({{ recipe.tempo_preparo_minutos }}
                min.)
              </small>
            </span>

            <div class="actions-wrapper">
              <button
                @click="goToRecipe(recipe.id)"
                class="view-recipe-btn"
                aria-label="Ver receita"
              >
                Ver Receita
              </button>
            </div>
          </div>
          <span class="manipulate" v-if="isUserRecipe(recipe.id)">
            <button
              @click="confirmDelete(recipe.id)"
              class="delete-recipe-btn"
              aria-label="Deletar receita"
            >
              ❌
            </button>
          </span>
        </li>
      </ul>
      <p v-else class="no-recipes-message">Nenhuma receita encontrada.</p>
    </div>
  </section>
  <modal-confirm
    v-if="showDeleteModal"
    @close="showDeleteModal = false"
    @confirm="deleteRecipe"
  >
    <template v-slot:title>Confirmação</template>
    <template v-slot:body
      >Esta receita será excluída, deseja continuar?</template
    >
  </modal-confirm>
</template>

<script>
import { searchQuery } from "@/eventBus";
import { deleteRecipe } from "@/services/ReceitaService";
import ModalConfirm from "@/components/ModalConfirm.vue"; // Modal component

export default {
  name: "AllRecipes",
  components: {
    ModalConfirm,
  },
  props: {
    allRecipes: {
      type: Array,
      required: true,
    },
    userRecipes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localRecipes: [...this.allRecipes],
      activeTooltip: null,
      showDeleteModal: false,
      recipeIdToDelete: null,
    };
  },
  computed: {
    filteredRecipes() {
      const query = searchQuery.value.toLowerCase();
      return this.allRecipes.filter((recipe) =>
        recipe.nome.toLowerCase().includes(query),
      );
    },
  },
  methods: {
    showTooltip(recipeId) {
      this.activeTooltip = recipeId;
    },
    hideTooltip() {
      this.activeTooltip = null;
    },
    goToRecipe(recipeId) {
      this.$router.push(`/receita?id=${recipeId}`);
    },
    isUserRecipe(recipeId) {
      return this.userRecipes.some((userRecipe) => userRecipe.id === recipeId);
    },
    confirmDelete(recipeId) {
      this.recipeIdToDelete = recipeId;
      this.showDeleteModal = true;
    },
    async deleteRecipe() {
      try {
        await deleteRecipe(this.recipeIdToDelete);
        this.localRecipes = this.allRecipes.filter(
          (recipe) => recipe.id !== this.recipeIdToDelete,
        );
        this.$emit("recipe-deleted", this.recipeIdToDelete);
        this.showDeleteModal = false;
      } catch (error) {
        console.error("Erro ao deletar a receita:", error);
      }
    },
  },
};
</script>
<style scoped>
.recipes-wrapper {
  text-align: center;
}
.no-recipes-message {
  color: #999;
  font-style: italic;
}
.recipes-search-wrapper {
  width: 100%;
  text-align: center;
}
.star-icon {
  margin-left: 5px;
  color: gold;
}
.recipes-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
.recipe-name {
  font-size: 1.6em;
  font-weight: bold;
}
.recipe-time {
  font-size: 0.6em;
  font-style: italic;
}
.recipe-item {
  display: flex;
  max-width: 420px;
  width: 100%;
}
.l-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px;
  width: 100%;
  line-height: 1.2em;
}
.actions-wrapper {
  display: flex;
  gap: 0.5em;
  justify-content: center;
  align-items: center;
}
.view-recipe-btn {
  color: #fff;
  font-weight: 600;
  padding: 8px;
  background-color: #5e61cd;
  border: 1px solid #5e61cd;
  cursor: pointer;
  transition: all 400ms;
  border-radius: 8px;
  margin-top: 10px;
}
.edit-recipe-btn,
.delete-recipe-btn {
  color: #fff;
  font-weight: 600;
  padding: 8px;
  background-color: #5e61cd;
  border: 1px solid #5e61cd;
  cursor: pointer;
  transition: all 400ms;
  border-radius: 8px;
}
.manipulate {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
}
.edit-recipe-btn {
  background-color: #c6cd5e;
  border: 1px solid #c6cd5e;
}
.delete-recipe-btn {
  background-color: #ff705d;
  border: 1px solid #b25549;
}
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  bottom: 100%; /* Tooltip aparece acima do elemento */
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 6px 12px;
  background-color: #9296ff;
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 14px;
  z-index: 1000;
  opacity: 0.9;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%; /* Posição da seta */
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #9296ff transparent transparent transparent;
}
</style>
