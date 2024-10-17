import { ref, watch } from "vue";
import { isAuthenticated } from "@/services/AuthService";

const isLoggedIn = ref(false);

watch(isLoggedIn, (newValue) => {
  localStorage.setItem("isLoggedIn", newValue);
});

export const initializeAuth = async () => {
  isLoggedIn.value = await isAuthenticated();
};

export function useAuth() {
  return {
    isLoggedIn,
  };
}

export function loginAuth() {
  isLoggedIn.value = true;
}

export function logoutAuth() {
  isLoggedIn.value = false;
}
