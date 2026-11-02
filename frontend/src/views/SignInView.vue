<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';
import '../assets/auth.css';

const auth = useAuthStore();
const router = useRouter();

const form = reactive({ email: '', password: '' });
const errors = ref([]);
const loading = ref(false);

const validate = () => {
  const list = [];
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) list.push('Ingresá un email válido.');
  if (!form.password) list.push('Ingresá tu contraseña.');
  return list;
};

const submit = async () => {
  errors.value = validate();
  if (errors.value.length) return;

  loading.value = true;
  try {
    await auth.signIn({ email: form.email.trim(), password: form.password });
    router.push({ name: 'home' });
  } catch (e) {
    const data = e.response?.data;
    errors.value = data?.errors || [data?.message || 'No se pudo conectar con el servidor.'];
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth">
    <form class="auth-card" @submit.prevent="submit" novalidate>
      <div class="brand">NETFLIX</div>
      <h1>Iniciar sesión</h1>

      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" autocomplete="email" />

      <label for="password">Contraseña</label>
      <input id="password" v-model="form.password" type="password" autocomplete="current-password" />

      <ul v-if="errors.length" class="errors">
        <li v-for="e in errors" :key="e">{{ e }}</li>
      </ul>

      <button class="submit" :disabled="loading">
        {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
      </button>

      <p class="switch">¿Primera vez? <RouterLink to="/sign-up">Registrate</RouterLink></p>
    </form>
  </div>
</template>