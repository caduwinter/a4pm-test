<template>
  <div class="recipe-card">
    <h1 class="recipe-title">
      {{ recipe.nome }}
      <em class="text-md"> ({{ recipe.Categoria.nome }}) </em>
    </h1>

    <h4 class="recipe-title-2">
      <div>
        Por:
        <em> {{ recipe.User.nome }} </em>
      </div>
    </h4>
    <div>
      <div class="recipe-detail">
        <strong class="detail-label">Ingredientes</strong> para
        <strong> {{ recipe.porcoes }} </strong> porções em
        <strong> {{ recipe.tempo_preparo_minutos }} </strong> minutos
        <br />
        <span class="ml-3"> → {{ recipe.ingredientes }} </span>
      </div>
    </div>
    <strong>Modo de Preparo: </strong> {{ recipe.modo_preparo }}
    <div class="button-wrapper">
      <button @click="printRecipe" class="p-button">Imprimir</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeInfo",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  created() {},
  methods: {
    printRecipe() {
      window.print();
    },
  },
};
</script>

<style scoped>
.recipe-card {
  border-radius: 16px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.32);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 3px solid #5e61cd;
  max-width: 400px;
  margin: 0 auto;
  overflow-wrap: break-word;
}

.ml-3 {
  margin-left: 1.2em;
}
.text-md {
  font-size: medium;
}
.recipe-title {
  margin: 0;
  font-size: 2rem;
}

.recipe-title-2 {
  margin: 0;
  font-size: 1rem;
}

.button-wrapper {
  text-align: center;
}

.p-button {
  padding: 0.5rem 0;
  margin-top: 15px;
  color: #5e61cd;
  border: 1px solid #5e61cd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 400ms;
  font-size: 16px;
  text-decoration: none;
  width: 120px;
}

.p-button:hover {
  background-color: #5e61cd;
  color: #fff;
}
</style>
