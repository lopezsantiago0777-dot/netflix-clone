import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { signUpRequest, signInRequest } from '../services/api.js';
import { useCatalogStore } from './catalog.js';

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref(readUser());
  const isAuthenticated = computed(() => !!token.value);

  const saveSession = (data) => {
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const signUp = async (form) => saveSession(await signUpRequest(form));
  const signIn = async (form) => saveSession(await signInRequest(form));

  const signOut = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    useCatalogStore().reset();
  };

  return { token, user, isAuthenticated, signUp, signIn, signOut };
});