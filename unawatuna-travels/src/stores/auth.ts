import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { User } from '../types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  const isAuthenticated = computed(() => !!user.value);
  const token = computed(() => user.value?.token);

  function login(userData: User) {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function logout() {
    user.value = null;
    localStorage.removeItem('user');
  }

  return { user, isAuthenticated, token, login, logout };
});
