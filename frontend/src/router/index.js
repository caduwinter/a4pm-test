import { createRouter, createWebHistory } from "vue-router";
import HomePageView from "../views/HomePageView.vue";
import AuthView from "../views/AuthView.vue";
import CreateRecipeView from "../views/CreateRecipeView.vue";
import EditRecipeView from "../views/EditRecipeView.vue";
import ShowRecipeView from "../views/ListRecipeView.vue";
import { isAuthenticated } from "../services/AuthService.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePageView,
  },
  {
    path: "/login",
    name: "login",
    component: AuthView,
  },
  {
    path: "/receita/add",
    name: "CreateRecipeView",
    component: CreateRecipeView,
  },
  {
    path: "/receita/edit",
    name: "EditRecipeView",
    component: EditRecipeView,
  },
  {
    path: "/receita",
    name: "ListRecipeView",
    component: ShowRecipeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = await isAuthenticated();

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router;
