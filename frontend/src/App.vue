<template>
  <div class="app-container">
    <Navbar
      :searchQuery="searchQuery"
      @update:searchQuery="updateSearchQuery"
    />
    <main class="content-wrapper">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { onMounted } from "vue";
import { initializeAuth } from "@/authStore";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  setup() {
    onMounted(async () => {
      await initializeAuth();
    });
  },
  created() {},
  methods: {
    updateSearchQuery(newQuery) {
      this.searchQuery = newQuery;
    },
  },
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
}

* {
  font-family: "Noto Sans", system-ui;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #f0f0f0;
  background: -webkit-linear-gradient(to bottom, #e1deff 20%, #f0f0f0);
  background: linear-gradient(to bottom, #e1deff 20%, #f0f0f0);
}
</style>
